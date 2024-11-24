import EventEmitter from 'events';
import LineByLineReader from 'line-by-line';
import { Readable } from 'stream';
import Message from './Message.js';
import type BindParams from './BindParams.js';
import { AbortError, BadResponseError, ConnectionError } from '../utils/Errors.js';
import type Logger from '../utils/Logger.js';
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
    this.#logger.debug(`[yt-cast-receiver] Connecting to RPC URL: ${url}`);

    this.#abortController = new AbortController();
    let response;
    try {
      response = await fetch(url, { signal: this.#abortController.signal });
    }
    catch (error: any) {
      if (error.name === 'AbortError') {
        this.#logger.debug('[yt-cast-receiver] RPC connection request aborted.');
        this.#status = 'disconnected';
        throw new AbortError('RPC connection request aborted', url);
      }

      this.#logger.error('[yt-cast-receiver] RPC connection error:', error);
      retry++;
      if (retry <= MAX_RETRIES) {
        this.#logger.error(`[yt-cast-receiver] Retrying ${retry} / ${MAX_RETRIES}`);
        return await this.#doConnect(isReconnect, retry);
      }

      this.#status = 'disconnected';
      this.#logger.error('[yt-cast-receiver] Max retries reached. Giving up...');
      throw new ConnectionError('RPC connection error', url, error);
    }
    finally {
      this.#abortController = null;
    }

    if (response.ok && response.body) {
      this.#logger.debug('[yt-cast-receiver] RPC connection established.');
      this.#status = 'connected';

      const readable = Readable.fromWeb(response.body as any);
      this.#reader = new LineByLineReader(readable, {
        encoding: 'utf8',
        skipEmptyLines: true
      });

      this.#reader.on('line', (line) => {
        if (this.#status === 'connected') {
          const messages = Message.parseIncoming(line);
          if (messages.length > 0) {
            this.emit('messages', messages);
          }
        }
      });

      this.#reader.on('error', (error) => {
        this.#logger.error('[yt-cast-receiver] RPC connection reader error:', error);
        // Force disconnect
        readable.destroy();
        this.#handleDisconnect();
      });

      this.#reader.on('end', this.#handleDisconnect.bind(this));
      readable.on('end', this.#handleDisconnect.bind(this));

      return;
    }

    this.#status = 'disconnected';
    throw new BadResponseError('RPC connection request returned bad response', url, response);
  }

  #handleDisconnect() {
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
      this.#logger.debug('[yt-cast-receiver] RPC connection disconnected. Reconnecting...');
      void (async () => {
        try {
          await this.#doConnect(true);
        }
        catch (error) {
          this.emit('terminate', error);
        }
      })();
    }
    else {
      this.#logger.debug('[yt-cast-receiver] RPC connection closed.');
    }
  }

  close() {
    if (this.#status === 'connected' || this.#status === 'connecting' || this.#status === 'reconnecting') {
      this.#logger.debug('[yt-cast-receiver] Closing RPC connection...');
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
