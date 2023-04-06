import EventEmitter from 'events';
import fetch from 'node-fetch';
import LineByLineReader from 'line-by-line';
import AbortController from 'abort-controller';
import { Readable } from 'stream';
import Message from './Message.js';
import BindParams from './BindParams.js';
import { AbortError, BadResponseError, ConnectionError } from '../utils/Errors.js';
import Logger from '../utils/Logger.js';
import { URLS } from '../Constants.js';

const MAX_RETRIES = 3;

/**
 * @internal
 *
 * Connects to YouTube 'bind' URL and listens for messages.
 * Incoming messages are parsed into {@link Message} objects and returned through events.
 *
 * When the underlying connection is ended by remote, which is inevitable under normal circumstance,
 * the `RPCConnection` instance will automatically reconnect.
 */
export default class RPCConnection extends EventEmitter {

  #bindParams: BindParams;
  #logger: Logger;
  #status: 'connecting' | 'connected' | 'reconnecting' | 'disconnecting' | 'disconnected';
  #abortController: AbortController | null;
  #reader: LineByLineReader | null;

  constructor(options: { bindParams: BindParams, logger: Logger }) {
    super();
    this.#bindParams = options.bindParams;
    this.#logger = options.logger;
    this.#status = 'disconnected';
    this.#abortController = null;
    this.#reader = null;
  }

  async connect() {
    if (this.#status === 'disconnected') {
      return this.#doConnect();
    }
  }

  async #doConnect(isReconnect = false, retry = 0): Promise<void> {
    this.#status = isReconnect ? 'reconnecting' : 'connecting';
    const url = `${URLS.BIND}?${this.#bindParams.toQueryString('rpc')}`;
    this.#logger.debug(`[YouTubeCastReceiver] Connecting to RPC URL: ${url}`);

    this.#abortController = new AbortController();
    let response;
    try {
      response = await fetch(url, { signal: this.#abortController.signal });
    }
    catch (error: any) {
      if (error.name === 'AbortError') {
        this.#logger.debug('[YouTubeCastReceiver] RPC connection request aborted.');
        this.#status = 'disconnected';
        throw new AbortError('RPC connection request aborted', url);
      }

      this.#logger.error('[YouTubeCastReceiver] RPC connection error:', error);
      retry++;
      if (retry <= MAX_RETRIES) {
        this.#logger.error(`[YouTubeCastReceiver] Retrying ${retry} / ${MAX_RETRIES}`);
        return this.#doConnect(isReconnect, retry);
      }

      this.#status = 'disconnected';
      this.#logger.error('[YouTubeCastReceiver] Max retries reached. Giving up...');
      throw new ConnectionError('RPC connection error', url, error);
    }
    finally {
      this.#abortController = null;
    }

    if (response.ok) {
      this.#logger.debug('[YouTubeCastReceiver] RPC connection established.');
      this.#status = 'connected';

      const readable = new Readable().wrap(response.body);
      this.#reader = new LineByLineReader(readable, {
        encoding: 'utf8',
        skipEmptyLines: true
      });

      this.#reader.on('line', async (line) => {
        if (this.#status === 'connected') {
          const messages = Message.parseIncoming(line);
          if (messages.length > 0) {
            this.emit('messages', messages);
          }
        }
      });

      this.#reader.on('error', (error) => {
        this.#logger.error('[YouTubeCastReceiver] RPC connection reader error:', error);
        // Force disconnect
        readable.destroy();
      });

      this.#reader.on('end', this.#handleDisconnect.bind(this));
      response.body.on('end', this.#handleDisconnect.bind(this));

      return;
    }

    this.#status = 'disconnected';
    throw new BadResponseError('RPC connection request returned bad response', url, response);
  }

  async #handleDisconnect() {
    if (this.#status === 'disconnected') {
      // Already handled
      return;
    }

    const prevStatus = this.#status;
    this.#status = 'disconnected';

    if (this.#reader) {
      this.#reader.removeAllListeners();
      this.#reader = null;
    }

    if (prevStatus === 'connected') {
      // Disconnected by remote end or reader error - reconnect.
      this.#logger.debug('[YouTubeCastReceiver] RPC connection disconnected. Reconnecting...');
      try {
        await this.#doConnect(true);
      }
      catch (error) {
        this.emit('terminate', error);
      }
    }
    else {
      this.#logger.debug('[YouTubeCastReceiver] RPC connection closed.');
    }
  }

  close() {
    if (this.#status === 'connected' || this.#status === 'connecting' || this.#status === 'reconnecting') {
      this.#logger.debug('[YouTubeCastReceiver] Closing RPC connection...');
      this.#status = 'disconnecting';
      if (this.#abortController) {
        this.#abortController.abort();
      }
      if (this.#reader) {
        this.#reader.close();
      }
    }
  }

  /**
   * @event
   * Emitted when an irrecoverable error has occurred and the connection is forced to terminate.
   * @param listener.error - the error that triggered the event.
   */
  on(event: 'terminate', listener: (error: Error) => void): this;
  /**
   * @event
   * Emitted when messages received.
   * @param listener.messages: Array of `Message` objects.
   */
  on(event: 'messages', listener: (messages: Message[]) => void): this;
  on(event: string | symbol, listener: (...args: any[]) => void): this {
    super.on(event, listener);
    return this;
  }
}
