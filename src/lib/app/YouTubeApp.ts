import EventEmitter from 'events';
import * as dial from '@patrickkfkan/peer-dial';
import queryString from 'query-string';
import { v4 as uuidv4 } from 'uuid';
import Player, { AutoplayMode, PlayerState, Volume } from '../Player.js';
import Message from './Message.js';
import Session from './Session.js';
import PairingCodeRequestService from './PairingCodeRequestService.js';
import Sender from './Sender.js';
import { AppError, SenderConnectionError, IncompleteAPIDataError } from '../utils/Errors.js';
import Logger from '../utils/Logger.js';
import { AUTOPLAY_MODES, STATUSES, CONF_DEFAULTS, PLAYER_STATUSES, CLIENTS, MUTE_POLICIES } from '../Constants.js';
import { ValueOf } from '../utils/Type.js';
import PlaylistRequestHandler from './PlaylistRequestHandler.js';
import DefaultPlaylistRequestHandler from './DefaultPlaylistRequestHandler.js';
import { ClientKey } from './Client.js';
import DataStore from '../utils/DataStore.js';

export interface AppOptions {

  screenName: string;
  /**
   * @default CONF_DEFAULTS.SCREEN_APP
   */
  screenApp?: string;
  /**
   * @default CONF_DEFAULTS.BRAND
   */
  brand?: string;
  /**
   * @default CONF_DEFAULTS.MODEL
   */
  model?: string;
  /**
   * @default true
   */
  enableAutoplayOnConnect?: boolean;
  /**
   * @default MUTE_POLICIES.AUTO
   */
  mutePolicy?: ValueOf<typeof MUTE_POLICIES>;
  /**
   * @default `DefaultPlaylistRequestHandler` instance
   */
  playlistRequestHandler?: PlaylistRequestHandler;

  dataStore: DataStore | null;

  logger: Logger;
}

type AppStatus = ValueOf<typeof STATUSES>;

/**
 * @internal
 *
 * A `YouTubeApp` instance readies the cast environment, handles incoming messages
 * (responding to them as necessary), posts status updates, manages player state, etc..
 */
export default class YouTubeApp extends EventEmitter implements dial.App {
  name: string;
  state: AppStatus;
  allowStop: boolean;
  pid: string;

  #sessions: Record<ClientKey, Session>;
  #activeSession: Session | null;
  #connectedSenders: Sender[];
  #dataStore: DataStore | null;
  #logger: Logger;
  #player: Player;
  #autoplayModeOnConnect: typeof AUTOPLAY_MODES.ENABLED | typeof AUTOPLAY_MODES.DISABLED;
  #mutePolicy: AppOptions['mutePolicy'];
  #autoplayModeBeforeUnsupportedOverride: typeof AUTOPLAY_MODES.ENABLED | typeof AUTOPLAY_MODES.DISABLED | null;
  #playerStateListener: any;

  // Temporary record of user info associated with a sender, grouped by client type and sender Id.
  // See handling of `loungeStatus` message in `#handleIncomingMessage()`.
  #userBySenderTmpInfo: Record<ClientKey, Record<Sender['id'], Sender['user']>>;

  constructor(player: Player, options: AppOptions) {
    super();

    this.name = 'YouTube Cast Receiver App';
    this.state = STATUSES.STOPPED;
    this.allowStop = false;

    this.#connectedSenders = [];
    this.#userBySenderTmpInfo = {
      YT: {},
      YTMUSIC: {}
    };
    this.#dataStore = options.dataStore || null;
    this.#logger = options.logger;

    const commonSessionOptions = {
      screenName: options.screenName,
      screenApp: options.screenApp || CONF_DEFAULTS.SCREEN_APP,
      brand: options.brand || CONF_DEFAULTS.BRAND,
      model: options.model || CONF_DEFAULTS.MODEL,
      dataStore: this.#dataStore,
      logger: this.#logger
    } as any;

    this.#sessions = {
      YT: new Session({ client: CLIENTS.YT, ...commonSessionOptions }),
      YTMUSIC: new Session({ client: CLIENTS.YTMUSIC, ...commonSessionOptions })
    };
    this.#activeSession = null;

    this.#player = player;
    this.#player.setLogger(options.logger);
    this.#player.queue.setLogger(options.logger);
    this.#player.queue.setRequestHandler(options.playlistRequestHandler || new DefaultPlaylistRequestHandler());
    this.#player.queue.requestHandler.setLogger(options.logger);
    this.#playerStateListener = this.#handlePlayerStateEvent.bind(this);
    this.enableAutoplayOnConnect(options.enableAutoplayOnConnect !== undefined ? options.enableAutoplayOnConnect : true);
    this.#mutePolicy = options.mutePolicy !== undefined ? options.mutePolicy : MUTE_POLICIES.AUTO;
    this.#autoplayModeBeforeUnsupportedOverride = null;
  }

  async start(): Promise<void> {
    if (this.state !== STATUSES.STOPPED) {
      return;
    }

    if (this.#dataStore) {
      const storedPid = await this.#dataStore.get<string>('app.pid');
      if (storedPid) {
        this.#logger.debug(`[yt-cast-receiver] Setting app pid to stored value: ${storedPid}`);
        this.pid = storedPid;
      }
      else {
        this.pid = uuidv4();
        this.#logger.debug(`[yt-cast-receiver] Saving generated app pid: ${this.pid}`);
        await this.#dataStore.set('app.pid', this.pid);
      }
    }

    this.#logger.debug('[yt-cast-receiver] Starting YouTubeApp...');
    this.state = STATUSES.STARTING;
    this.#player.on('state', this.#playerStateListener);

    const clientKeys = Object.keys(CLIENTS) as ClientKey[];
    try {
      const startPromises = clientKeys.map((key) => {
        const session = this.#sessions[key];
        session.on('messages', this.#handleIncomingMessage.bind(this));
        session.on('terminate', (error) => {
          // Session terminated. So should YouTubeApp.
          this.stop(error);
        });
        return session.begin();
      });

      await Promise.all(startPromises);
    }
    catch (error) {
      this.#player.removeListener('state', this.#playerStateListener);
      clientKeys.forEach(async (key) => {
        const session = this.#sessions[key];
        session.removeAllListeners();
        try {
          await session.end();
        }
        catch (err) {
          // Do nothing
        }
      });

      this.state = STATUSES.STOPPED;
      throw new AppError('Failed to start YouTubeApp', error);
    }

    this.state = STATUSES.RUNNING;
  }

  // Implements
  async launch(data: string): Promise<string> {
    const launchData = queryString.parse(data);
    this.#logger.debug('[yt-cast-receiver] YouTubeApp received DIAL launch request. Launch data:', launchData);
    const { pairingCode: pairingCodeData, theme: themeData } = launchData;
    const pairingCode = Array.isArray(pairingCodeData) ? pairingCodeData[0] : pairingCodeData;
    const theme = (Array.isArray(themeData) ? themeData[0] : themeData);
    const session = Object.values(this.#sessions).find((s) => s.client.theme === theme);
    if (pairingCode && session) {
      await this.#checkAndSwitchActiveSession(session);
      this.#logger.info('[yt-cast-receiver] Connecting sender through DIAL...');
      await this.#activeSession?.registerPairingCode(pairingCode);
      return this.pid;
    }

    if (!pairingCode) {
      throw new AppError('Failed to launch YouTubeApp',
        new IncompleteAPIDataError('Invalid launch data', [ 'pairingCode' ]));
    }

    throw new AppError('Failed to launch YouTubeApp',
      new IncompleteAPIDataError(`Invalid launch data. Unknown theme: ${theme}`));
  }

  async #checkAndSwitchActiveSession(targetSession: Session) {
    if (this.#activeSession?.client === targetSession.client) {
      return;
    }

    if (!this.#activeSession) {
      this.#activeSession = targetSession;
    }
    // Restart active session (thereby disconnecting current senders) if it is different from target session.
    // We cannot have multiple connections from different clients.
    else {
      this.#logger.debug(`[yt-cast-receiver] Target session is for ${targetSession.client.name} clients, whereas active session is for ${this.#activeSession.client.name} clients.`);
      this.#logger.debug('[yt-cast-receiver] Switching over to target session, while disconnecting senders (if any) from old session.');
      await this.#player.reset();
      this.#connectedSenders = [];
      const oldSession = this.#activeSession;
      this.#connectedSenders.forEach((c) => {
        this.emit('senderDisconnect', c);
      });
      this.#activeSession = targetSession;
      oldSession.sendMessage(new Message.LoungeScreenDisconnected());
    }
    this.#logger.debug(`[yt-cast-receiver] Active session switched to '${targetSession.client.name}'.`);
  }

  async #setAutoplayMode(AID: number | null, value: AutoplayMode) {
    if (!this.#activeSession) {
      return;
    }
    const stateBefore = this.#player.queue.getState();
    await this.#player.queue.setAutoplayMode(value);
    const stateAfter = this.#player.queue.getState();
    const sendMessages = [
      new Message.OnAutoplayModeChanged(AID, value)
    ];

    if (stateBefore.autoplay?.id !== stateAfter.autoplay?.id) {
      sendMessages.push(new Message.AutoplayUpNext(AID, stateAfter.autoplay?.id || null));
    }
    this.#activeSession.sendMessage(sendMessages);
  }

  async #setAutoplayModeBySenderCapabilities(AID: number | null) {
    if (this.#connectedSenders.length === 0) {
      return;
    }

    this.#logger.debug('[yt-cast-receiver] Setting autoplay mode by sender(s) capabilities.');
    let autoplayMode: AutoplayMode;
    if (!this.#connectedSenders.every((c) => c.supportsAutoplay())) {
      this.#logger.debug('[yt-cast-receiver] (Some) sender(s) do not support autoplay. Autoplay support disabled.');

      if (this.#player.autoplayMode !== AUTOPLAY_MODES.UNSUPPORTED) {
        this.#autoplayModeBeforeUnsupportedOverride = this.#player.autoplayMode;
      }
      autoplayMode = AUTOPLAY_MODES.UNSUPPORTED;
    }
    else {
      this.#logger.debug('[yt-cast-receiver] (All) sender(s) support autoplay.');
      if (this.#player.autoplayMode !== AUTOPLAY_MODES.UNSUPPORTED) {
        this.#logger.debug(`[yt-cast-receiver] Keeping current autoplay mode: ${this.#player.autoplayMode}`);
        autoplayMode = this.#player.autoplayMode;
      }
      else {
        autoplayMode = this.#autoplayModeBeforeUnsupportedOverride || this.#autoplayModeOnConnect;
        this.#logger.debug(`[yt-cast-receiver] Setting autoplay mode: ${autoplayMode}`);
      }
      this.#autoplayModeBeforeUnsupportedOverride = null;
    }

    return this.#setAutoplayMode(AID, autoplayMode);
  }

  async #enforceMutePolicy(AID: number | null) {
    if (this.#connectedSenders.length === 0) {
      return;
    }

    this.#logger.debug('[yt-cast-receiver] Configuring player based on mute policy...');
    const logTrue = 'player will set volume level to 0 on mute';
    const logFalse = 'player will preserve volume level on mute';

    let zeroVolumeLevelOnMute;
    switch (this.#mutePolicy) {
      case MUTE_POLICIES.ZERO_VOLUME_LEVEL:
        this.#logger.debug(`[yt-cast-receiver] Mute policy is 'ZERO_VOLUME_LEVEL': ${logTrue}.`);
        zeroVolumeLevelOnMute = true;
        break;
      case MUTE_POLICIES.PRESERVE_VOLUME_LEVEL:
        this.#logger.debug(`[yt-cast-receiver] Mute policy is 'PRESERVE_VOLUME_LEVEL': ${logFalse}.`);
        zeroVolumeLevelOnMute = false;
        break;
      default: // MUTE_POLICIES.AUTO
        this.#logger.debug('[yt-cast-receiver] Mute policy is \'AUTO\': checking whether sender(s) support mute...');
        if (!this.#connectedSenders.every((c) => c.supportsMute())) {
          this.#logger.debug(`[yt-cast-receiver] (Some) sender(s) do not support mute: ${logTrue}.`);
          zeroVolumeLevelOnMute = true;
        }
        else {
          this.#logger.debug(`[yt-cast-receiver] (All) sender(s) support mute: ${logFalse}.`);
          zeroVolumeLevelOnMute = false;
        }
    }
    await this.#player.setZeroVolumeLevelOnMute(zeroVolumeLevelOnMute, AID);
  }

  enableAutoplayOnConnect(value = false) {
    this.#autoplayModeOnConnect = value ? AUTOPLAY_MODES.ENABLED : AUTOPLAY_MODES.DISABLED;
  }

  async #handleIncomingMessage(message: Message | Message[], session: Session): Promise<void> {
    if (Array.isArray(message)) {
      for (const c of message) {
        await this.#handleIncomingMessage(c as Message, session);
      }
      return;
    }

    const { AID, name, payload } = message as Message;
    const isSessionActive = session === this.#activeSession;
    const client = session.client;

    this.#logger.debug('-----------------------------------');
    this.#logger.debug(`[yt-cast-receiver] (AID: ${AID}) (${client.name}) Incoming message: '${name}'`);

    const sendMessages = [];

    switch (name) {
      case 'remoteConnected':
        let newSender: Sender;
        try {
          newSender = Sender.parse(payload);
          await this.#checkAndSwitchActiveSession(session);
        }
        catch (err) {
          const error = new SenderConnectionError('Failed to register connected sender', err, 'connect');
          this.#logger.error(`[yt-cast-receiver] (${client.name}) Failed to handle 'remoteConnected' message:`, error);
          this.emit('error', error);
          break;
        }

        if (!this.#connectedSenders.find((c) => c.id === newSender.id)) {
          // Retrieve user info from previous handling of `loungeStatus` msg.
          const user = this.#userBySenderTmpInfo[session.client.key][newSender.id];
          if (user) {
            newSender.user = user;
            delete this.#userBySenderTmpInfo[session.client.key][newSender.id];
          }
          this.#logger.info(`[yt-cast-receiver] (${client.name}) Sender connected: ${newSender.name} (user: ${newSender.user?.name})`);
          this.#logger.debug(`[yt-cast-receiver] (${client.name}) Connected sender info:`, newSender);

          this.#connectedSenders.push(newSender);
          await this.#setAutoplayModeBySenderCapabilities(AID);
          await this.#enforceMutePolicy(AID);

          const playerState = await this.#player.getState();
          sendMessages.push(
            new Message.NowPlaying(AID, playerState),
            new Message.OnStateChange(AID, playerState)
          );

          this.emit('senderConnect', newSender);
        }
        else {
          this.#logger.debug(`[yt-cast-receiver] (${client.name}) Sender already connected.`);
        }
        break;

      case 'remoteDisconnected':
        if (!isSessionActive) return;

        let disconnectedSender: Sender;
        try {
          disconnectedSender = Sender.parse(payload);
        }
        catch (err) {
          const error = new SenderConnectionError('Failed to unregister disconnected sender', err, 'disconnect');
          this.#logger.error(`[yt-cast-receiver] (${client.name}) Failed to handle 'remoteDisconnected' message:`, error);
          this.emit('error', error);
          break;
        }
        const disconnectedSenderIndex = this.#connectedSenders.findIndex((c) => c.id === disconnectedSender.id);
        if (disconnectedSenderIndex < 0) {
          this.#logger.warn(`[yt-cast-receiver] (${client.name}) Anomaly detected while unregistering disconnected sender: unable to find target among connected senders. Target:`,
            disconnectedSender, ' Connected senders:', this.#connectedSenders);
          break;
        }
        this.#connectedSenders.splice(disconnectedSenderIndex, 1);

        if (this.#connectedSenders.length === 0) {
          await this.#player.reset();
        }
        else if (this.#player.autoplayMode === AUTOPLAY_MODES.UNSUPPORTED) {
          await this.#setAutoplayModeBySenderCapabilities(AID);
        }

        if (this.#connectedSenders.length > 0) {
          await this.#enforceMutePolicy(AID);
        }

        this.#logger.info(`[yt-cast-receiver] (${client.name}) Sender disconnected: ${disconnectedSender.name}`);
        this.#logger.debug(`[yt-cast-receiver] (${client.name}) Disconnected sender info:`, disconnectedSender);
        this.emit('senderDisconnect', disconnectedSender);
        break;

      case 'getNowPlaying':
        sendMessages.push(new Message.NowPlaying(AID, isSessionActive ? await this.#player.getState() : null));
        break;

      case 'loungeStatus':
        let loungeDevices;
        try {
          loungeDevices = JSON.parse(payload.devices);
        }
        catch (error) {
          this.#logger.error(`[yt-cast-receiver] (${client.name}) Failed to parse 'devices' property of 'loungeStatus' message payload:`, error);
          loungeDevices = [];
        }
        const loungeStatusSenders: Sender[] = loungeDevices
          .filter((dev: any) => dev.type === 'REMOTE_CONTROL')
          .reduce((senders: Sender[], data: any) => {
            try {
              const sender = Sender.parse(data);
              senders.push(sender);
              return senders;
            }
            catch (err) {
              this.#logger.error(`[yt-cast-receiver] (${client.name}) Failed to parse sender data in 'loungeStatus' message:`, err);
              return senders;
            }
          }, []);
        if (this.state === STATUSES.STARTING) {
          if (loungeStatusSenders.length > 0) {
            this.#connectedSenders = loungeStatusSenders;
            this.#logger.debug(`[yt-cast-receiver] (${client.name}) Updated connected senders info with 'loungeStatus' message:`, this.#connectedSenders);
            this.#activeSession = session;
            this.#logger.debug(`[yt-cast-receiver] Active session switched to '${client.name}'.`);
            await this.#setAutoplayModeBySenderCapabilities(AID);
            await this.#enforceMutePolicy(AID);
            sendMessages.push(
              new Message.OnHasPreviousNextChanged(AID, this.#player.getNavInfo()),
              new Message.NowPlaying(AID, null)
            );
          }
        }
        else {
          const playerNavInfo = isSessionActive ? this.#player.getNavInfo() : null;
          sendMessages.push(
            new Message.OnHasPreviousNextChanged(AID, playerNavInfo),
            new Message.OnAutoplayModeChanged(AID, playerNavInfo)
          );
          // When there are senders not currently in `connectedSenders`, we would expect forthcoming `remoteConnected` msgs for them.
          // These msgs, however, will not contain user info. We therefore save this info and use it to set the `user`
          // Field of new Sender objects when we subsequently handle the `remoteConnected` msgs.
          const maybeNewSenders = loungeStatusSenders.filter((s1) => !this.#connectedSenders.find((s2) => s1.id === s2.id));
          this.#userBySenderTmpInfo[session.client.key] = {};
          maybeNewSenders.forEach((s) => {
            if (s.user) {
              this.#userBySenderTmpInfo[session.client.key][s.id] = {...s.user};
            }
          });
        }
        break;

      case 'setPlaylist':
      case 'updatePlaylist':
        if (!isSessionActive) return;

        this.#logger.debug(`[yt-cast-receiver] '${message.name}' message payload:`, payload);

        // Dismiss autoplay first in anticipation of change in autoplay video (when last video in queue
        // Is different from the one in message payload).
        const queueVideoIds = this.#player.queue.videoIds;
        const msgPayloadLastVideoId = message.payload?.videoIds?.split(',').pop();
        let autoplayDismissed = false;
        if (queueVideoIds[queueVideoIds.length - 1] !== msgPayloadLastVideoId) {
          session.sendMessage(new Message.AutoplayUpNext(AID, null));
          autoplayDismissed = true;
        }

        const stateBeforeSet = this.#player.queue.getState();
        if (autoplayDismissed) {
          stateBeforeSet.autoplay = null;
        }
        const navBeforeSet = this.#player.getNavInfo();
        await this.#player.queue.updateByMessage(message, client);
        const stateAfterSet = this.#player.queue.getState();
        const navAfterSet = this.#player.getNavInfo();
        if (stateBeforeSet.autoplay?.id !== stateAfterSet.autoplay?.id) {
          sendMessages.push(new Message.AutoplayUpNext(AID, stateAfterSet.autoplay?.id || null));
        }
        if (message.name === 'setPlaylist' && (stateBeforeSet.current?.id !== stateAfterSet.current?.id ||
          stateBeforeSet.current?.context?.index !== stateAfterSet.current?.context?.index)) {
          if (this.#player.status !== PLAYER_STATUSES.STOPPED) {
            await this.#player.stop(AID);
          }
          const currentVideo = stateAfterSet.current;
          if (currentVideo) {
            await this.#player.play(currentVideo, parseInt(payload.currentTime, 10) || 0, AID);
          }
        }
        else if (message.name === 'updatePlaylist' && !stateAfterSet.current) {
          await this.#player.stop(AID);
        }
        else {
          sendMessages.push(new Message.NowPlaying(AID, await this.#player.getState()));
          if (navBeforeSet.hasNext !== navAfterSet.hasNext || navBeforeSet.hasPrevious !== navAfterSet.hasPrevious) {
            sendMessages.push(new Message.OnHasPreviousNextChanged(AID, navAfterSet));
          }
        }
        break;

      case 'next':
        if (!isSessionActive) return;
        await this.#player.next(AID);
        break;

      case 'previous':
        if (!isSessionActive) return;
        await this.#player.previous(AID);
        break;

      case 'pause':
        if (!isSessionActive) return;
        await this.#player.pause(AID);
        break;

      case 'stopVideo':
        if (!isSessionActive) return;
        await this.#player.stop(AID);
        break;

      case 'seekTo':
        if (!isSessionActive) return;
        await this.#player.seek(parseInt(payload.newTime, 10));
        break;

      case 'getVolume':
        const volume = await this.#player.getVolume();
        sendMessages.push(new Message.OnVolumeChanged(AID, volume));
        break;

      case 'setVolume':
        if (!isSessionActive) return;

        let mutedBool = false;
        if (typeof payload.muted === 'string') {
          mutedBool = payload.muted.toLowerCase().trim() === 'true';
        }
        else if (typeof payload.muted === 'boolean') {
          mutedBool = payload.muted;
        }
        const newVolume = {
          level: parseInt(payload.volume, 10),
          muted: mutedBool
        } as Volume;
        const currentVolume = await this.#player.getVolume();
        if (newVolume.level !== currentVolume.level || newVolume.muted !== currentVolume.muted) {
          await this.#player.setVolume(newVolume, AID);
        }
        break;

      case 'play':
        if (!isSessionActive) return;
        await this.#player.resume(AID);
        break;

      case 'setAutoplayMode':
        if (!isSessionActive) return;
        await this.#setAutoplayMode(AID, payload.autoplayMode);
        break;

      default:
        this.#logger.debug(`[yt-cast-receiver] (AID: ${AID}) (${client.name}) Not handled: '${name}'`);
    }

    if (sendMessages.length > 0) {
      session.sendMessage(sendMessages);
    }
  }

  async stop(error?: Error) {
    if (this.state !== STATUSES.RUNNING && !error) {
      return;
    }

    this.#logger.debug('[yt-cast-receiver] Stopping YouTubeApp...');

    this.state = STATUSES.STOPPING;

    const senders = [ ...this.#connectedSenders ];
    this.#connectedSenders.splice(0);

    this.#player.removeListener('state', this.#playerStateListener);
    await this.#player.reset();

    const stopPromises = Object.values(this.#sessions).map((session) => {
      session.removeAllListeners();
      return session.end();
    });
    try {
      await Promise.all(stopPromises);
    }
    catch (err) {
      this.#logger.warn('[yt-cast-receiver] Ignoring error while stopping YouTubeApp:', error);
    }

    this.state = STATUSES.STOPPED;

    senders.forEach((c) => {
      this.emit('senderDisconnect', c);
    });

    if (error) {
      this.emit('terminate', error);
    }
  }

  #handlePlayerStateEvent(payload: { AID: number, current: PlayerState, previous: PlayerState }) {
    if (!this.#activeSession) {
      return;
    }

    const { AID, current, previous } = payload;

    if (this.#connectedSenders.length === 0) {
      this.#logger.debug('[yt-cast-receiver] Ignoring player state event because there is no connected sender.');
      return;
    }

    this.#logger.debug('[yt-cast-receiver] Player state changed from:', previous);
    this.#logger.debug('To:', current);

    let statusChanged = true, positionChanged = true,
      volumeChanged = true, nowPlayingChanged = true,
      autoplayChanged = true;
    if (previous) {
      statusChanged = previous.status !== current.status;
      positionChanged = previous.position !== current.position;
      volumeChanged = previous.volume.level !== current.volume.level || previous.volume.muted !== current.volume.muted;
      nowPlayingChanged = previous.queue.current?.id !== current.queue.current?.id ||
        previous.queue.id !== current.queue.id ||
        previous.queue.current?.context?.index !== current.queue.current?.context?.index;
      autoplayChanged = previous.queue.autoplay?.id !== current.queue.autoplay?.id;
    }

    const messages = [];
    if (statusChanged || positionChanged) {
      messages.push(new Message.OnStateChange(AID, current));
    }
    if (nowPlayingChanged || (statusChanged && (!previous || previous.status !== PLAYER_STATUSES.PLAYING))) {
      messages.push(
        new Message.NowPlaying(AID, current),
        new Message.OnHasPreviousNextChanged(AID, this.#player.getNavInfo())
      );
    }
    if (volumeChanged) {
      messages.push(new Message.OnVolumeChanged(AID, current.volume));
    }
    if (autoplayChanged) {
      messages.push(new Message.AutoplayUpNext(AID, current.queue.autoplay?.id || null));
    }

    if (messages.length > 0) {
      if (messages.every((c) => c instanceof Message.OnVolumeChanged && c.AID !== null)) {
        // We could be responding to a series of 'setVolume' messages. To reduce
        // Lag on sender side, we only send the latest 'onVolumeChanged' message after
        // A short interval of no further such messages.
        this.#activeSession.sendMessage(messages, { key: 'onVolumeChanged', interval: 200 });
      }
      else {
        this.#activeSession.sendMessage(messages);
      }
    }
  }

  getPairingCodeRequestService(): PairingCodeRequestService {
    return this.#sessions['YT'].pairingCodeRequestService;
  }

  get connectedSenders(): Sender[] {
    return [ ...this.#connectedSenders ];
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
