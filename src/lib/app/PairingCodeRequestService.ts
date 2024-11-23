import EventEmitter from 'events';
import type BindParams from './BindParams.js';
import { type Screen } from './Session.js';
import { ConnectionError, DataError } from '../utils/Errors.js';
import { STATUSES, URLS } from '../Constants.js';

const REFRESH_INTERVAL = 300000; // 5 minutes
const REFRESH_INTERVAL_SHORT = 30000; // 30 seconds - when API not ready

/**
 * Fetches pairing code for manual pairing (aka 'Link with TV code').
 * A pairing code is refreshed every 5 minutes. Results are returned through
 * the `response` event.
 *
 * ### Usage
 *
 * ```
 * const service = receiver.getPairingCodeRequestService();
 *
 * service.on('request', () => {...});  // Event when request is being made
 * service.on('response', (code) => {...}); // Event when code is obtained
 * service.on('error', (error) => {...}); // Event when error occurs
 *
 * service.start();
 * ...
 *
 * service.stop();
 * ```
 *
 * Note that the service stops on `error` event.
 */
export default class PairingCodeRequestService extends EventEmitter {

  #screen: Screen;
  #bindParams: BindParams;
  #status: typeof STATUSES.RUNNING | typeof STATUSES.STOPPED;
  #refreshTimer: NodeJS.Timeout | null;

  /**
   * @internal
   */
  constructor(screen: Screen, bindParams: BindParams) {
    super();
    this.#bindParams = bindParams;
    this.#screen = screen;
    this.#refreshTimer = null;
    this.#status = STATUSES.STOPPED;
  }

  /**
   * Starts the service.
   */
  start() {
    if (this.#status === STATUSES.RUNNING) {
      return;
    }

    this.#status = STATUSES.RUNNING;
    void this.#getCodeAndEmit();
  }

  /**
   * Stops the service.
   */
  stop() {
    if (this.#status === STATUSES.STOPPED) {
      return;
    }

    this.#clearRefreshTimer();
    this.#status = STATUSES.STOPPED;
  }

  #clearRefreshTimer() {
    if (this.#refreshTimer) {
      clearTimeout(this.#refreshTimer);
      this.#refreshTimer = null;
    }
  }

  #startRefreshTimer(interval = REFRESH_INTERVAL) {
    this.#clearRefreshTimer();
    this.#refreshTimer = setTimeout(() => {
      void this.#getCodeAndEmit();
    }, interval);
  }

  async #getCodeAndEmit() {
    this.#clearRefreshTimer();

    if (!this.#bindParams.loungeIdToken || !this.#screen.id) {
      // API not ready
      this.#startRefreshTimer(REFRESH_INTERVAL_SHORT);
      return;
    }

    const params = new URLSearchParams({
      'access_type': 'permanent',
      'app': this.#screen.app,
      'lounge_token': this.#bindParams.loungeIdToken,
      'screen_id': this.#screen.id,
      'screen_name': this.#screen.name,
      'device_id': this.#bindParams.id
    });

    const url = URLS.GET_PAIRING_CODE;
    let response;
    let error;
    try {
      this.emit('request');
      response = await fetch(url, {
        method: 'POST',
        body: params
      });
    }
    catch (err) {
      error = new ConnectionError('Connection error in fetching pairing code', url, err);
      response = null;
    }
    if (response) {
      try {
        const code = await response.text();
        this.emit('response', code);
        this.#startRefreshTimer();
      }
      catch (err) {
        error = new DataError('Pairing code data error', err);
      }
    }
    if (error) {
      this.stop();
      this.emit('error', error);
    }
  }

  /**
   * @event
   * Emitted when service is requesting pairing code.
   */
  on(event: 'request', listener: () => void): this;
  /**
   * @event
   * Emitted when service has obtained pairing code.
   * @param listener.code - The pairing code.
   */
  on(event: 'response', listener: (code: string) => void): this;
  /**
   * @event
   * Emitted when service encountered error. The service stops on this event.
   * @param listener.error - The `Error` that triggered the event.
   */
  on(event: 'error', listener: (error: Error) => void): this;
  on(event: string | symbol, listener: (...args: any[]) => void): this {
    super.on(event, listener);
    return this;
  }

  /** Service status */
  get status(): typeof STATUSES.RUNNING | typeof STATUSES.STOPPED {
    return this.#status;
  }
}
