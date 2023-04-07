import EventEmitter from 'events';
import Player from './Player.js';
import YouTubeApp, { AppOptions } from './app/YouTubeApp.js';
import DialServer, { DialOptions } from './dial/DialServer.js';
import Logger, { LogLevel } from './utils/Logger.js';
import DefaultLogger from './utils/DefaultLogger.js';
import AutoplayLoader from './app/AutoplayLoader.js';
import { STATUSES } from './Constants.js';
import PairingCodeRequestService from './app/PairingCodeRequestService.js';
import Sender from './app/Sender.js';
import { ValueOf } from './utils/Type.js';

/**
 * Options consumed by constructor of `YouTubeCastReceiver` class.
 */
export type YouTubeCastReceiverOptions = {
  /** DIAL server options. */
  dial?: Omit<DialOptions, 'logger' | 'manufacturer' | 'modelName'>,

  /** YouTube app options. */
  app?: Omit<AppOptions, 'logger' | 'brand' | 'model'>,

  brand?: string,
  model?: string,
  logLevel?: LogLevel,
  logger?: Logger
};

/**
 * One of the values in {@link STATUSES}.
 */
export type YouTubeCastReceiverStatus = ValueOf<typeof STATUSES>;

/**
 * Main class of `yt-cast-receiver` library.
 *
 * To create a `YouTubeCastReceiver` instance, you need to provide at least a
 * {@link Player} implementation.
 */
export default class YouTubeCastReceiver extends EventEmitter {

  #app: YouTubeApp;
  #server: DialServer;
  #logger: Logger;
  #status: YouTubeCastReceiverStatus;

  constructor(player: Player, options: YouTubeCastReceiverOptions = {}) {
    super();

    this.#logger = options.logger || new DefaultLogger();
    this.#logger.setLevel(options.logLevel || 'info');

    const appOptions: AppOptions = {
      ...options.app || {},
      brand: options.brand,
      model: options.model,
      logger: this.#logger
    };

    const dialOptions: DialOptions = {
      ...options.dial || {},
      manufacturer: options.brand,
      modelName: options.model,
      logger: this.#logger
    };

    this.#app = new YouTubeApp(player, appOptions);
    this.#server = new DialServer(this.#app, dialOptions);

    this.#app.on('senderConnect', (sender) => {
      this.emit('senderConnect', sender);
    });

    this.#app.on('senderDisconnect', (sender) => {
      this.emit('senderDisconnect', sender);
    });

    this.#app.on('error', (error) => {
      this.emit('error', error);
    });

    this.#app.on('terminate', async (error) => {
      try {
        await this.stop();
      }
      catch (error) {
        // Do nothing - we're quitting anyway
      }
      this.#logger.error('[YouTubeCastReceiver] Receiver terminated due to error:', error);
      this.emit('terminate', error);
    });

    this.#status = STATUSES.STOPPED;
  }

  async start() {
    if (this.status !== STATUSES.STOPPED) {
      this.#logger.warn('[YouTubeCastReceiver] start() called but receiver not in STOPPED state.');
      return;
    }

    this.#status = STATUSES.STARTING;
    try {
      await this.#app.start();
      await this.#server.start();
    }
    catch (error) {
      this.#logger.error('[YouTubeCastReceiver] Failed to start receiver:', error);
      try {
        if (this.#app.state === STATUSES.RUNNING) {
          await this.#app.stop();
        }
        if (this.#server.status === STATUSES.RUNNING) {
          await this.#server.stop();
        }
      }
      catch (err) {
        // Do nothing
      }
      this.#status = STATUSES.STOPPED;
      throw error;
    }

    this.#status = STATUSES.RUNNING;
  }

  async stop() {
    if (this.status !== STATUSES.RUNNING) {
      this.#logger.warn('[YouTubeCastReceiver] stop() called but receiver not in RUNNING state.');
      return;
    }

    this.#status = STATUSES.STOPPING;
    try {
      await this.#app.stop();
      await this.#server.stop();
    }
    catch (error) {
      this.#status = STATUSES.RUNNING;
      this.#logger.error('[YouTubeCastReceiver] Failed to stop receiver:', error);
      throw error;
    }
    this.#status = STATUSES.STOPPED;
  }

  enableAutoplayOnConnect(value: boolean) {
    this.#app.enableAutoplayOnConnect(value);
  }

  setAutoplayLoader(loader: AutoplayLoader | null) {
    this.#app.setAutoplayLoader(loader);
  }

  setLogLevel(value: LogLevel) {
    this.#logger.setLevel(value);
  }

  getPairingCodeRequestService(): PairingCodeRequestService {
    return this.#app.getPairingCodeRequestService();
  }

  getConnectedSenders(): Sender[] {
    return this.#app.connectedSenders;
  }

  get status(): YouTubeCastReceiverStatus {
    return this.#status;
  }

  get logger(): Logger {
    return this.#logger;
  }

  /**
   * @event
   * Emitted when the `YouTubeApp` instance has terminated due to irrecoverable error.
   * @param listener.error - The error that triggered the event.
   */
  on(event: 'terminate', listener: (error: Error) => void): this;
  /**
   * @event
   * Emitted when an error has occurred.
   * @param listener.error - The error that triggered the event.
   */
  on(event: 'error', listener: (error: Error) => void): this;
  /**
   * @event
   * Emitted when a sender has connected.
   * @param listener.sender - The connected sender.
   */
  on(event: 'senderDisconnect', listener: (sender: Sender) => void): this;
  /**
   * @event
   * Emitted when a sender has disconnected.
   * @param listener.sender - The disconnected sender.
   */
  on(event: 'senderConnect', listener: (sender: Sender) => void): this;
  on(event: string | symbol, listener: (...args: any[]) => void): this {
    super.on(event, listener);
    return this;
  }
}