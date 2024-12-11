import EventEmitter from 'events';
import { v4 as uuidv4 } from 'uuid';
import AsyncTaskQueue, { type Task } from '../utils/AsyncTaskQueue.js';
import BindParams from './BindParams.js';
import Message from './Message.js';
import RPCConnection from './RPCConnection.js';
import PairingCodeRequestService from './PairingCodeRequestService.js';
import { BadResponseError, ConnectionError, DataError, IncompleteAPIDataError, SessionError } from '../utils/Errors.js';
import type Logger from '../utils/Logger.js';
import { CLIENTS, STATUSES, URLS } from '../Constants.js';
import { type ValueOf } from '../utils/Type.js';
import type Client from './Client.js';
import type DataStore from '../utils/DataStore.js';

/**
 * @internal
 *
 * Data obtained from YouTube specific to a {@link Screen}.
 */
export interface LoungeToken {
  expiration: number; // Date in milliseconds
  loungeToken: string;
  loungeTokenLifespanMs: number;
  refreshIntervalInMillis: number;
  screenId: string; // Passed back in `get_lounge_token_batch` response
}

/**
 * @internal
 *
 * Identifying info for a {@link YouTubeCastReceiver} instance.
*/
export interface Screen {
  /** Screen Id obtained from YouTube */
  id?: string;

  /** Screen name */
  name: string;

  /** Screen app */
  app: string;
}

/** @internal */
export interface SessionOptions {
  client: Client;
  screenName: string;
  screenApp: string;
  brand: string;
  model: string;
  dataStore: DataStore | null;
  logger: Logger;
}

export interface MDXContext {
  deviceId?: string;
  screenId?: string;
}

type SessionStatus = ValueOf<typeof STATUSES> | 'refreshing';

/**
 * @internal
 *
 * The `Session` class encapsulates the process of setting up the environment for casting:
 *
 * ```
 * const session = new Session(options);
 *
 * // Casting not yet possible
 *
 * await session.begin();
 *
 * // Casting now possible.
 * ```
 *
 * To receive incoming messages, add `messages` event listener:
 * ```
 * session.on('messages', (messages: Message[]) => { // handle messages... });
 * ```
 *
 * To send a message:
 * ```
 * session.sendMessage(message: Message | Message[]);
 * ```
 *
 * To disable casting:
 * ```
 * await session.end();
 * ```
 */
export default class Session extends EventEmitter {

  #client: Client;
  #screen: Screen;
  #bindParams: BindParams;
  #rpcConnection: RPCConnection;
  #ofs: number;
  #dataStore: DataStore | null;
  #logger: Logger;
  #taskQueue: AsyncTaskQueue;
  #deferredMessages: Record<string, {
    task: SendMessageTask,
    timeout: NodeJS.Timeout
  }>;
  #loungeTokenRefreshTimer: NodeJS.Timeout | null;
  #pairingCodeRequestService: PairingCodeRequestService;
  #status: SessionStatus;

  constructor(options: SessionOptions) {
    super();
    this.#client = options.client || CLIENTS.YT;
    this.#screen = {
      name: options.screenName,
      app: options.screenApp
    };
    this.#bindParams = new BindParams({
      theme: this.#client.theme,
      deviceId: uuidv4(),
      screenName: this.#screen.name,
      screenApp: this.#screen.app,
      brand: options.brand,
      model: options.model
    });
    this.#dataStore = options.dataStore;
    this.#logger = options.logger;
    this.#taskQueue = new AsyncTaskQueue();
    this.#deferredMessages = {};
    this.#loungeTokenRefreshTimer = null;
    this.#pairingCodeRequestService = new PairingCodeRequestService(this.#screen, this.#bindParams);
    this.#status = STATUSES.STOPPED;
  }

  async begin(): Promise<void> {
    const isRefreshing = this.#status === 'refreshing';
    if (this.#status !== STATUSES.STOPPED && !isRefreshing) {
      return;
    }

    if (!isRefreshing) {
      this.#status = STATUSES.STARTING;
    }

    // Use stored MDX context if session is not refreshing or restarting (screenId: undefined).
    const mdxContextStorageKey = `mdxContext.${this.#client.theme}`;
    let isScreenIdFromDataStore = false;
    if (!isRefreshing && !this.#screen.id && this.#dataStore) {
      const storedMdxContext = await this.#dataStore.get<MDXContext>(mdxContextStorageKey);
      this.#logger.debug(`[yt-cast-receiver] (${this.#client.name}) Configuring session with stored MDX context:`, storedMdxContext);
      if (storedMdxContext) {
        this.#bindParams.updateWithMdxContext(storedMdxContext);
      }
      if (storedMdxContext?.screenId) {
        this.#screen.id = storedMdxContext.screenId;
        isScreenIdFromDataStore = true;
      }
    }

    // 1. Generate screenId and complete `Screen` info.
    //    - Do not generate if already available, e.g. if refreshing session.
    // 2. With `Screen`, obtain `LoungeToken`.
    // 3. With `Screen` and `LoungeToken`, obtain session-specific params.
    // 4. Finally, with all the above info, create `RPCConnection` to receive remote messages.

    let error;
    try {
      this.#ofs = 0;
      if (!this.#screen.id) {
        this.#screen.id = await this.#generateScreenId();
      }

      let loungeToken;
      try {
        loungeToken = await this.#getLoungeToken();
      }
      catch (error) {
        if (!isScreenIdFromDataStore) {
          throw error;
        }
        // Maybe error was caused by using screenId from DataStore.
        // We generate a fresh screenId and try refetching lounge token.
        this.#logger.error(`[yt-cast-receiver] (${this.#client.name}) Failed to obtain lounge token with screen Id from stored MDX context (${this.#screen.id}):`,
          error, 'Going to generate fresh screen Id and try again...');
        this.#screen.id = await this.#generateScreenId();
        loungeToken = await this.#getLoungeToken();
      }

      this.#bindParams.updateWithLoungeToken(loungeToken);

      // Refresh `LoungeToken` upon its expiry
      this.#clearLoungeTokenRefreshTimer();
      this.#loungeTokenRefreshTimer = setTimeout(() => {
        void (async () => {
          try {
            await this.#refreshLoungeToken();
          }
          catch (error) {
            // Session must end if `LoungeToken` can't be obtained
            this.end(error).catch((error: unknown) => this.#logger.error('[yt-cast-receiver] Caught error ending session:', error));
          }
        })();
      }, loungeToken.refreshIntervalInMillis || 1123200000); // Fallback to 13 days

      const initSessionMessages = await this.#getInitSessionMessages();
      for (const cmd of initSessionMessages) {
        if (cmd.name === 'c' || cmd.name === 'S') {
          this.#bindParams.updateWithMessage(cmd);
        }
        else if (cmd.name === 'loungeStatus') {
          this.#handleMessage([ cmd ]);
        }
      }
      // Test if we can start posting state / rpc
      try {
        this.#bindParams.toQueryString('rpc');
      }
      catch (error) {
        if (error instanceof IncompleteAPIDataError) {
          throw new IncompleteAPIDataError(`(${this.#client.name}) Query string test failed`, (error).info?.missing as string[]);
        }
        throw error;
      }
    }
    catch (err) {
      error = new SessionError(`(${this.#client.name}) Failed to establish session`, err);
    }

    if (!error) {

      this.#rpcConnection = new RPCConnection({
        bindParams: this.#bindParams,
        logger: this.#logger
      });

      this.#rpcConnection.on('messages', this.#handleMessage.bind(this));
      this.#rpcConnection.on('terminate', (error) => {
        this.#logger.error(`[yt-cast-receiver] (${this.#client.name}) RPC connection terminated due to error:`, error);
        this.#refreshLoungeToken().catch((error: unknown) => this.#logger.error('[yt-cast-receiver] Caught error refreshing lounge token:', error));
      });

      try {
        await this.#rpcConnection.connect();
        this.#logger.debug(`[yt-cast-receiver] (${this.#client.name}) Session established.`);

        if (!isRefreshing) {
          this.#status = STATUSES.RUNNING;
        }
      }
      catch (err) {
        error = new SessionError(`(${this.#client.name}) Failed to establish session`, err);
      }
    }

    if (error) {
      // Refreshing happens internally, so we need to emit the error instead of
      // Throwing it (i.e. don't pass it to `end()`).
      if (isRefreshing) {
        this.end(error).catch((error: unknown) => this.#logger.error('[yt-cast-receiver] Caught error ending session:', error));;
      }
      else {
        try {
          this.end().catch((error: unknown) => this.#logger.error('[yt-cast-receiver] Caught error ending session:', error));;
        }
        catch (_error: unknown) {
          // Do nothing - we're quitting anyway.
        }

        throw error;
      }
    }
    else if (this.#dataStore) {
      // Session started successfully - store MDX context.
      const mdxContext = this.#mdxContext;
      this.#logger.debug(`[yt-cast-receiver] (${this.#client.name}) Saving MDX context to data store:`, mdxContext);
      this.#dataStore.set<MDXContext>(mdxContextStorageKey, mdxContext)
        .catch((error: unknown) => this.#logger.error('[yt-cast-receiver] Caught error saving MDX context:', error));;
    }
  }

  async end(error?: any) {
    if (this.#status === STATUSES.STOPPED || this.#status === STATUSES.STOPPING) {
      return;
    }

    this.#status = STATUSES.STOPPING;

    try {
      this.#pairingCodeRequestService.stop();
      if (this.#rpcConnection) {
        this.#rpcConnection.removeAllListeners();
        this.#rpcConnection.close();
      }
      this.#taskQueue.clear();
      this.#clearDeferredMessages();
      try {
        await this.sendMessage(new Message.LoungeScreenDisconnected());
        this.#taskQueue.start()  // In case stopped elsewhere (e.g. `#refreshLoungeToken()`)
          .catch((error: unknown) => this.#logger.error('[yt-cast-receiver] Caught error starting task queue:', error));
      }
      catch (_error: unknown) {
        // `sendMessage()` should work when status is 'running'.
        // But otherwise there is no guarantee that current state is valid to allow
        // Message to be sent successfully.
      }
    }
    catch (err) {
      if (!error) {
        throw new SessionError(`(${this.#client.name}) Error while ending session`, err);
      }
    }
    finally {
      this.#bindParams.reset();
      this.#status = STATUSES.STOPPED;
    }
    if (error) {
      this.emit('terminate', error);
    }
  }

  async #refreshLoungeToken() {
    this.#status = 'refreshing';
    this.#logger.debug(`[yt-cast-receiver] (${this.#client.name}) Refreshing lounge token...`);

    this.#clearLoungeTokenRefreshTimer();

    const oldRPC = this.#rpcConnection;

    this.#taskQueue.setAutoStart(false);
    this.#taskQueue.stop();

    const pairingCodeRequestServiceStatus = this.#pairingCodeRequestService.status;
    this.#pairingCodeRequestService.stop();

    this.#bindParams.reset();

    try {
      await this.begin();
    }
    catch (error) {
      throw new SessionError(`(${this.#client.name}) Error while refreshing lounge token`, error);
    }
    finally {
      this.#logger.debug(`[yt-cast-receiver] (${this.#client.name}) Closing old RPC connection...`);
      oldRPC.removeAllListeners();
      oldRPC.close();
    }

    if (pairingCodeRequestServiceStatus === STATUSES.RUNNING) {
      this.#pairingCodeRequestService.start();
    }

    // Nullify AIDs of pending Messages, because AID restarts from 0 after refresh.
    Object.values(this.#deferredMessages).forEach((dc) => {
      const sc = Array.isArray(dc.task.message) ? dc.task.message : [ dc.task.message ];
      sc.forEach((c) => c.AID = null);
    });
    this.#taskQueue.forEach((task) => {
      if (task instanceof SendMessageTask) {
        const sc = Array.isArray(task.message) ? task.message : [ task.message ];
        sc.forEach((c) => c.AID = null);
      }
    });

    this.#taskQueue.setAutoStart(true);
    this.#status = STATUSES.RUNNING;
  }

  #clearDeferredMessages() {
    Object.values(this.#deferredMessages).forEach((c) => {
      clearTimeout(c.timeout);
      c.task.cancel();
    });
    this.#deferredMessages = {};
  }

  #clearLoungeTokenRefreshTimer() {
    if (this.#loungeTokenRefreshTimer) {
      clearTimeout(this.#loungeTokenRefreshTimer);
      this.#loungeTokenRefreshTimer = null;
    }
  }

  async restart() {
    this.#logger.debug(`[yt-cast-receiver] (${this.#client.name}) Restarting session...`);
    const pairingCodeRequestServiceStatus = this.#pairingCodeRequestService.status;
    try {
      await this.end();
      await this.begin();
      if (pairingCodeRequestServiceStatus === STATUSES.RUNNING) {
        this.#pairingCodeRequestService.start();
      }
    }
    catch (error) {
      throw new SessionError(`(${this.#client.name}) Error while restarting session`, error);
    }
  }

  async #generateScreenId(): Promise<string> {
    const url = URLS.GENERATE_SCREEN_ID;

    let response;
    try {
      response = await fetch(url);
    }
    catch (error) {
      throw new ConnectionError(`(${this.#client.name}) Connection error in generating screen Id`, url, error);
    }
    try {
      const screenId = await response.text();
      this.#logger.debug(`[yt-cast-receiver] (${this.#client.name}) Obtained screen ID: ${screenId}`);
      return screenId;
    }
    catch (error) {
      throw new DataError(`(${this.#client.name}) Screen Id data error`, error);
    }
  }

  async #getLoungeToken(): Promise<LoungeToken> {
    if (!this.#screen.id) {
      throw new IncompleteAPIDataError(`(${this.#client.name}) Missing data required to get lounge token`, [ 'screenId' ]);
    }

    const url = URLS.GET_LOUNGE_TOKEN_BATCH;
    const params = new URLSearchParams({
      'screen_ids': this.#screen.id
    });
    let response;
    try {
      response = await fetch(URLS.GET_LOUNGE_TOKEN_BATCH, {
        method: 'POST',
        body: params
      });
    }
    catch (error) {
      throw new ConnectionError(`(${this.#client.name}) Connection error in getting lounge token`, url, error);
    }
    try {
      const token = (await response.json())?.screens?.[0] as LoungeToken;
      this.#logger.debug(`[yt-cast-receiver] (${this.#client.name}) Obtained lounge token:`, token);
      return token;
    }
    catch (error) {
      throw new DataError(`(${this.#client.name}) Lounge token data error`, error);
    }
  }

  async #getInitSessionMessages(): Promise<Message[]> {
    const url = `${URLS.BIND}?${this.#bindParams.toQueryString('initSession')}`;
    let response;
    try {
      response = await fetch(url, {
        method: 'POST',
        body: new URLSearchParams({ count: '0' })
      });
    }
    catch (error) {
      throw new ConnectionError(`(${this.#client.name}) Connection error in fetching session data`, url, error);
    }
    try {
      const body = await response.text();
      const messages = Message.parseIncoming(body);
      this.#logger.debug(`[yt-cast-receiver] (${this.#client.name}) Received messages for establishing session:`, messages);
      return messages;
    }
    catch (error) {
      throw new DataError(`(${this.#client.name}) Session data error`, error);
    }
  }

  async registerPairingCode(code: string) {
    this.#logger.debug(`[yt-cast-receiver] (${this.#client.name}) Registering pairing code: ${code}`);

    if (!this.#screen.id) {
      throw new IncompleteAPIDataError(`(${this.#client.name}) Missing data required to register pairing code`, [ 'screenId' ]);
    }

    const params = new URLSearchParams({
      'access_type': 'permanent',
      'app': this.#screen.app,
      'pairing_code': code,
      'screen_id': this.#screen.id,
      'screen_name': this.#screen.name,
      'device_id': this.#bindParams.id
    });

    const url = URLS.REGISTER_PAIRING_CODE;
    let response;
    try {
      response = await fetch(url, {
        method: 'POST',
        body: params
      });
    }
    catch (error) {
      throw new ConnectionError(`(${this.#client.name}) Connection error in registering pairing code`, url, error);
    }

    if (response.ok) {
      this.#logger.debug(`[yt-cast-receiver] (${this.#client.name}) Pairing code registered.`);
      return;
    }

    throw new BadResponseError(`(${this.#client.name}) Failed to register pairing code`, url, response);
  }

  /**
   * Sends `messages`. If `defer: {key, interval}` is specified, only send after `defer.interval` (in milliseconds) has lapsed.
   *
   * @param messages - `Message` object or array of `Message` objects.
   * @param defer - Specify `{key, interval}` to defer sending, or `false` to send as soon as possible.
   * @param defer.key - If there is already a deferred message with the same `key`, it will be canceled and replaced with the current one.
   * @param defer.interval - The interval in milliseconds to lapse before sending.
   * @returns A Promise that resolves to `true` when the message has been sent, or `false` if it is cancelled prior to dispatch.
   */
  sendMessage(messages: Message | Message[], defer: { key: string, interval: number } | false = false): Promise<boolean> {
    // Use `AsyncTaskQueue` for sending messages. This ensures that messages will be sent in order.
    if (defer) {
      return new Promise((resolve, reject) => {
        const {key, interval} = defer;

        const existing = this.#deferredMessages[key];
        if (existing) {
          clearTimeout(existing.timeout);
          delete this.#deferredMessages[key];
          existing.task.cancel();
        }

        const timeout = setTimeout(() => {
          try {
            const task = this.#deferredMessages[key].task;
            delete this.#deferredMessages[key];
            this.#taskQueue.push(task);
          }
          catch (error: unknown) {
            reject(error instanceof Error ? error : Error(String(error)));
          }
        }, interval);

        this.#deferredMessages[key] = {
          task: this.#createSendMessageTask(messages, resolve, reject),
          timeout
        };
      });
    }

    return new Promise((resolve, reject) => {
      this.#taskQueue.push(this.#createSendMessageTask(messages, resolve, reject));
    });
  }

  #createSendMessageTask(sc: Message | Message[], resolve: (v: boolean) => void, reject: (e: any) => void) {
    return new SendMessageTask({
      message: sc,
      run: this.#doSendMessage.bind(this, sc, resolve, reject),
      cancel: () => {
        resolve(false);
      },
      onError: (task: Task, error: any) => {
        const smTask = task as SendMessageTask;
        this.#logger.error(`[yt-cast-receiver] (${this.client.name}) Error occurred in SendMessageTask:`, smTask.message, error);
        // Retry task after refreshToken, but if it fails again then we would have to end session.
        smTask.onError = (task: Task, error: any) => {
          this.end(error).catch((error: unknown) => this.#logger.error('[yt-cast-receiver] Caught error ending session:', error));
        };
        this.#taskQueue.unshift(smTask);
        this.#logger.debug(`[yt-cast-receiver] (${this.#client.name}) Retry task after refreshing lounge token...`);
        try {
          this.#refreshLoungeToken().catch((error: unknown) => this.#logger.error('[yt-cast-receiver] Caught error refreshing lounge token:', error));
        }
        catch (err) {
          this.end(err).catch((error: unknown) => this.#logger.error('[yt-cast-receiver] Caught error ending session:', error));
        }
      }
    });
  }

  async #doSendMessage(sc: Message | Message[], resolve: (v: boolean) => void, reject: (e: any) => void) {
    const AID = Array.isArray(sc) ? sc[0]?.AID : sc.AID;
    const url = `${URLS.BIND}?${this.#bindParams.toQueryString('sendMessage', AID)}`;
    const postData = this.#getSendMessagePayload(sc);
    const debugMsgNameStr = Array.isArray(sc) ? `messages '${sc.map((c) => c.name).join(' + ')}'` : `message '${sc.name}'`;

    this.#logger.debug(`[yt-cast-receiver] ${AID ? `(AID: ${AID}) ` : ''}(${this.#client.name}) Sending ${debugMsgNameStr} with payload:`, postData);
    let response;
    try {
      response = await fetch(url, {
        method: 'POST',
        body: new URLSearchParams(postData)
      });
      this.#logger.debug(`[yt-cast-receiver] ${AID ? `(AID: ${AID}) ` : ''}(${this.#client.name}) Response received for sent ${debugMsgNameStr}. Status: ${response.status}`);
    }
    catch (error) {
      reject(new ConnectionError(`(${this.#client.name}) Connection error in sending ${debugMsgNameStr}${AID ? ` (AID: ${AID})` : ''}`, url, error));
      return;
    }

    if (response.ok) {
      resolve(true);
    }

    reject(new BadResponseError(`(${this.#client.name}) Bad response received for ${debugMsgNameStr}${AID ? ` (AID: ${AID})` : ''}`, url, response));
  }

  #getSendMessagePayload(sc: Message | Message[]): any {
    const states = Array.isArray(sc) ? sc : [ sc ];

    const postData = {
      'count': states.length,
      'ofs': `${this.#ofs}`
    } as any;

    states.forEach((state, index) => {
      const keyPrefix = `req${index}_`;
      postData[`${keyPrefix}_sc`] = state.name;
      for (const [ key, value ] of Object.entries(state.payload)) {
        postData[keyPrefix + key] = value;
      }
    });

    this.#ofs += states.length;

    return postData;
  }

  #handleMessage(messages: Message[]) {
    this.#bindParams.updateWithMessage(messages);
    this.emit('messages', messages, this);
  }

  get pairingCodeRequestService(): PairingCodeRequestService {
    return this.#pairingCodeRequestService;
  }

  get client(): Client {
    return this.#client;
  }

  get #mdxContext(): MDXContext {
    return {
      deviceId: this.#bindParams.id,
      screenId: this.#screen.id
    };
  }

  /**
   * @event
   * Emitted when incoming messages arrive.
   * @param listener.messages - An array of `Message` objects.
   */
  on(event: 'messages', listener: (messages: Message[], session: Session) => void): this;
  /**
   * @event
   * Emitted when session terminated due to irrecoverable error.
   * @param listener.error - the error that triggered the event.
   */
  on(event: 'terminate', listener: (error: Error) => void): this;
  on(event: string | symbol, listener: (...args: any[]) => void): this {
    super.on(event, listener);
    return this;
  }
}

/**
 * @internal
 *
 * An {@link AsyncTaskQueue} {@link Task} that sends a {@link Message}.
 */
export class SendMessageTask implements Task {

  message;
  #run;
  #cancel;
  #onError;

  constructor(data: {
    message: Message | Message[],
    run: (...args: any) => Promise<void>,
    cancel: () => void,
    onError: (task: Task, error: any) => any
  }) {
    this.message = data.message;
    this.#run = data.run;
    this.#cancel = data.cancel;
    this.#onError = data.onError;
  }

  async run() {
    await this.#run();
  }

  cancel(): void {
    this.#cancel();
  }

  onError(task: Task, error: any): any {
    this.#onError(task, error);
  }
}
