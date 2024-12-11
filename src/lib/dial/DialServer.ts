import express from 'express';
import http from 'http';
import dial from '@patrickkfkan/peer-dial';
import type YouTubeApp from '../app/YouTubeApp.js';
import type Logger from '../utils/Logger.js';
import { DialServerError } from '../utils/Errors.js';
import { CONF_DEFAULTS, STATUSES } from '../Constants.js';
import { type ValueOf } from '../utils/Type.js';

export interface DialOptions {
  port?: number;
  corsAllowOrigins?: boolean;
  prefix?: string;
  friendlyName: string;
  /**
   * @default CONF_DEFAULTS.BRAND
   */
  manufacturer?: string;
  /**
   * @default CONF_DEFAULTS.MODEL
   */
  modelName?: string;
  bindToInterfaces?: string[];
  bindToAddresses?: string[];
  logger: Logger;
}

/**
 * One of the values in {@link STATUSES}.
 */
type DialServerStatus = ValueOf<typeof STATUSES>;

function createDelegate(apps: Record<string, dial.App>, logger: Logger): dial.Delegate {
  return {
    getApp: (appName: string): dial.App => {
      return apps[appName];
    },

    /**
     * Called when a sender connects through DIAL. At this point, YouTubeApp is already running.
     * `launchData` contains the pairing code, which YouTubeApp uses for pairing with the sender.
     * @param appName - `YouTube` - anything else will throw an error.
     * @param launchData - Contains the pairing code which YouTubeApp uses to pair with sender.
     * @param callback - Function to provide `pid` back to the DIAL server.
     */
    launchApp: (appName: string, launchData: string, callback: (data: string) => void): void => {
      if (apps[appName]) {
        (apps[appName].launch(launchData) as unknown as Promise<string>).then((pid: string) => {
          callback(pid);
        })
          .catch((error: unknown) => {
            logger.error('[yt-cast-receiver] DIAL server failed to launch app:', error);
            callback('');
          });
      }
      else {
        throw new DialServerError(`Unknown app name: ${appName}`);
      }
    },

    /**
     * This should never get called because `YouTubeApp.allowStop` is `false`. We stop YouTubeApp
     * manually in `YouTubeCastReceiver.stop()`.
     */
     
    stopApp: (_appName: string, _pid: string, _callback: (data: boolean) => void): void => {
      // Do nothing
    }
  };
}

/**
 * Broadcasts receiver device on the network so that YouTube sender apps can initiate
 * Cast sessions through the DIAL protocol.
 */
export default class DialServer {

  #dialOptions: Record<string, any> & dial.ServerOptions;
  #expressServer: http.Server;
  #dialServer: dial.Server;
  #logger: Logger;
  #status: DialServerStatus;

  constructor(app: YouTubeApp, options: DialOptions) {
    this.#logger = options.logger;

    const expressApp = express();
    this.#dialOptions = {
      expressApp,
      port: options.port || 3000,
      corsAllowOrigins: options.corsAllowOrigins || false,
      prefix: options.prefix || '/ytcr',
      friendlyName: options.friendlyName,
      manufacturer: options.manufacturer || CONF_DEFAULTS.BRAND,
      modelName: options.modelName || CONF_DEFAULTS.MODEL,
      delegate: createDelegate({'YouTube': app}, this.#logger),
      bindToInterfaces: options.bindToInterfaces,
      bindToAddresses: options.bindToAddresses
    };
    this.#dialServer = new dial.Server(this.#dialOptions);
    this.#expressServer = http.createServer(expressApp);
    this.#status = STATUSES.STOPPED;
  }

  start(): Promise<void> {
    if (this.#status !== STATUSES.STOPPED) {
      this.#logger.warn('[yt-cast-receiver] start() called but DIAL server not in STOPPED state.');
      return Promise.resolve();
    }
    this.#status = STATUSES.STARTING;
    this.#logger.debug('[yt-cast-receiver] Starting DIAL server...');
    return new Promise((resolve, reject) => {
      try {
        this.#expressServer.listen(this.#dialOptions.port, () => {
          this.#dialServer.start();
          this.#status = STATUSES.RUNNING;
          this.#logger.info(`[yt-cast-receiver] DIAL server listening on port ${this.#dialOptions.port}`);
          resolve();
        }).on('error', (error) => {
          this.#status = STATUSES.STOPPED;
          reject(new DialServerError('Failed to start DIAL server', error));
        });
      }
      catch (error) {
        this.#status = STATUSES.STOPPED;
        reject(new DialServerError('Failed to start DIAL server', error));
      }
    });
  }

  stop(): Promise<void> {
    if (this.#status !== STATUSES.RUNNING) {
      this.#logger.warn('[yt-cast-receiver] stop() called but DIAL server not in RUNNING state.');
      return Promise.resolve();
    }
    this.#status = STATUSES.STOPPING;
    this.#logger.debug('[yt-cast-receiver] Stopping DIAL server...');
    return new Promise((resolve, reject) => {
      try {
        this.#dialServer.stop();
        this.#expressServer.close();
        this.#status = STATUSES.STOPPED;
        resolve();
      }
      catch (error) {
        this.#status = STATUSES.RUNNING;
        reject(new DialServerError('Failed to stop DIAL server', error));
      }
    });
  }

  get status(): DialServerStatus {
    return this.#status;
  }
}
