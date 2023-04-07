import EventEmitter from 'events';
import { v4 as uuidv4 } from 'uuid';
import { AUTOPLAY_MODES, PLAYER_STATUSES } from './Constants.js';
import Playlist from './app/Playlist.js';
import Logger from './utils/Logger.js';
import { ValueOf } from './utils/Type.js';

/**
 * One of the values in {@link AUTOPLAY_MODES}.
 */
export type AutoplayMode = ValueOf<typeof AUTOPLAY_MODES>;

/**
 * One of the values in {@link PLAYER_STATUSES}.
 */
export type PlayerStatus = ValueOf<typeof PLAYER_STATUSES>;

export interface PlayerState {
  status: PlayerStatus;
  playlist: {
    id: string | null;
    ctt: string | null;
    videoIds: string[];
    current: string | null;
    currentIndex: number;
  },
  position: number,
  duration: number
  volume: number,
  cpn: string,
}

export interface PlayerNavInfo {
  /** Boolean indicating whether there is previous video in player queue */
  hasPrevious: boolean;

  /** Boolean indicating whether there is next video in player queue */
  hasNext: boolean;

  autoplayMode: AutoplayMode;
}

export interface PlayerContext {
  playlistId: string | null,
  clientCredentialsTransferToken: string | null,
  cpn: string
}

/**
 * `Player` abstract class that leaves playback functionality to implementors.
 */
export default abstract class Player extends EventEmitter {
  #status: PlayerStatus;
  #playlist: Playlist;
  #autoplayMode: AutoplayMode;
  #cpn: string;
  #logger: Logger;
  #previousState: PlayerState | null;

  /**
   * Implementations shall play the target video from the specified position.
   * @param videoId - Id of the target video.
   * @param context - Additional info that might be useful.
   * @param position - The position, in seconds, from which to start playback.
   * @returns Promise that resolves to `true` on successful playback; `false` otherwise.
   */
  protected abstract doPlay(videoId: string, context: PlayerContext, position: number): Promise<boolean>;

  /**
   * Implementations shall pause current playback.
   * @returns Promise that resolves to `true` when playback was paused; `false` otherwise.
   */
  protected abstract doPause(): Promise<boolean>;

  /**
   * Implementations shall resume paused playback.
   * @returns Promise that resolves to `true` when playback was resumed; `false` otherwise.
   */
  protected abstract doResume(): Promise<boolean>;

  /**
   * Implementations shall stop current playback.
   * @returns Promise that resolves to `true` when playback was stopped; `false` otherwise.
   */
  protected abstract doStop(): Promise<boolean>;

  /**
   * Implementations shall seek to the specified position.
   * @param position The position, in seconds, to seek to.
   * @returns Promise that resolves to `true` if seek operation was successful; `false` otherwise.
   */
  protected abstract doSeek(position: number): Promise<boolean>;

  /**
   * Implementations shall set the volume to the specified level.
   * @param volume The volume level to set (0 - 100).
   * @returns Promise that resolves to `true` when volume was set; `false` otherwise.
   */
  protected abstract doSetVolume(volume: number): Promise<boolean>;

  /**
   * Implementations shall return the current volume level.
   * @returns Promise that resolves to the value of the current volume level (0 - 100).
   */
  protected abstract doGetVolume(): Promise<number>;

  /**
   * Implementations shall return the current playback position.
   * @returns Promise that resolves to the current playback position (in seconds).
   */
  protected abstract doGetPosition(): Promise<number>;

  /**
   * Implementations shall return the duration of the current video.
   * @returns Promise that resolves to the duration of the current video (in seconds).
   */
  protected abstract doGetDuration(): Promise<number>;

  constructor() {
    super();
    this.#status = PLAYER_STATUSES.IDLE;
    this.#playlist = new Playlist();
    this.#autoplayMode = AUTOPLAY_MODES.UNSUPPORTED;
    this.#cpn = uuidv4().replace(/-/g, '').substring(0, 16);
    this.#previousState = null;
  }

  setLogger(logger: Logger) {
    this.#logger = logger;
  }

  /**
   * Notifies senders that player is in 'loading' state, then calls `doPlay()`;
   * if returned Promise resolves to `true`, notifies senders that playback has started.
   * @param videoId - Id of the target video.
   * @param position - The position (in seconds) from which to start playback.
   * @param AID - Internal use; do not specify.
   * @returns Promise that resolves to the resolved result of `doPlay()`.
   */
  async play(videoId: string, position?: number, AID?: number | null): Promise<boolean> {
    this.#logger.info(`[YouTubeCastReceiver] Player.play(): ${videoId} @ ${position}s`);
    await this.#setStatusAndEmit(PLAYER_STATUSES.LOADING, AID);
    const result = await this.doPlay(videoId, this.context, position || 0);
    if (result) {
      await this.#setStatusAndEmit(PLAYER_STATUSES.PLAYING, AID);
    }
    return result;
  }

  /**
   * Calls `doPause()`; if returned Promise resolves to `true`, notifies connected senders that playback has paused.
   * @param AID - Internal use; do not specify.
   * @returns Promise that resolves to the resolved result of `doPause()`, or `false` if no playback is in progress.
   */
  async pause(AID?: number | null): Promise<boolean> {
    this.#logger.info('[YouTubeCastReceiver] Player.pause()');
    if (this.status === PLAYER_STATUSES.PLAYING) {
      const result = await this.doPause();
      if (result) {
        await this.#setStatusAndEmit(PLAYER_STATUSES.PAUSED, AID);
      }
      return result;
    }
    return false;
  }

  /**
   * Calls `doResume()`; if returned Promise resolves to `true`, notifies connected senders that playback has resumed.
   * @param AID - Internal use; do not specify.
   * @returns Promise that resolves to the resolved result of `doResume()`, or `false` if player is not in paused state.
   */
  async resume(AID?: number | null): Promise<boolean> {
    this.#logger.info('[YouTubeCastReceiver] Player.resume()');
    if (this.status === PLAYER_STATUSES.PLAYING) {
      return false;
    }
    else if (this.status === PLAYER_STATUSES.PAUSED) {
      const result = await this.doResume();
      if (result) {
        await this.#setStatusAndEmit(PLAYER_STATUSES.PLAYING, AID);
      }
      return result;
    }
    else if (this.#playlist.current) {
      return this.play(this.#playlist.current);
    }

    return false;
  }

  /**
   * Calls `doStop()`; if returned Promise resolves to `true`, notifies connected senders that playback has stopped.
   * @param AID - Internal use; do not specify.
   * @returns A Promise that resolves to `true` when playback is stopped; `false` otherwise.
   */
  async stop(AID?: number | null): Promise<boolean> {
    this.#logger.info('[YouTubeCastReceiver] Player.stop()');
    if (this.status !== PLAYER_STATUSES.STOPPED) {
      const result = await this.doStop();
      if (result) {
        await this.#setStatusAndEmit(PLAYER_STATUSES.STOPPED, AID);
      }
      return result;
    }

    return false;
  }

  /**
   * Calls `doSeek()`; if returned Promise resolves to `true`, notifies connected senders of new seek position.
   * @param position - The position, in seconds, to seek to.
   * @param AID - Internal use; do not specify.
   * @returns Promise that resolves to the resolved result of `doSeek()`.
   */
  async seek(position: number, AID?: number | null): Promise<boolean> {
    this.#logger.info(`[YouTubeCastReceiver] Player.seek(): ${position}s`);
    const previousState = await this.getState();
    const result = await this.doSeek(position);
    if (result) {
      if (this.status === PLAYER_STATUSES.PAUSED) {
        this.#previousState = previousState;
        return this.resume(AID);
      }
      const currentState = await this.getState();
      this.emit('state', { current: currentState, previous: previousState, AID });
    }
    return result;
  }

  /**
   * Plays the next video in the player queue. If already reached end of queue,
   * play autoplay video if available. Notifies senders on successful playback.
   * @param AID - Internal use; do not specify.
   * @returns Promise that resolves to `true` on playback of the next video; `false` otherwise.
   */
  async next(AID?: number | null): Promise<boolean> {
    this.#logger.info('[YouTubeCastReceiver] Player.next()');
    const nextVideoId = this.#playlist.next();
    if (!nextVideoId) {
      this.#logger.info('[YouTubeCastReceiver] No next video in playlist.');
      if (this.#autoplayMode === AUTOPLAY_MODES.ENABLED) {
        const autoplayVideoId = this.#playlist.setAutoplayAsCurrent();
        if (autoplayVideoId) {
          this.#logger.debug('[YouTubeCastReceiver] Moved autoplay video to playlist.');
          this.#logger.info(`[YouTubeCastReceiver] Play autoplay video: ${autoplayVideoId}.`);
          return this.play(autoplayVideoId, 0, AID);
        }
        this.#logger.info('[YouTubeCastReceiver] No autoplay video available.');
      }
      else {
        this.#logger.info('[YouTubeCastReceiver] No autoplay video - autoplay is disabled.');
      }
      await this.stop(AID);
      return false;
    }

    return this.play(nextVideoId);
  }

  /**
   * Plays the previous video in the player queue. Notifies senders on successful playback.
   * @param AID - Internal use; do not specify.
   * @returns Promise that resolves to `true` on playback of the previous video; `false` otherwise.
   */
  async previous(AID?: number | null): Promise<boolean> {
    this.#logger.info('[YouTubeCastReceiver] Player.previous()');
    const previousVideoId = this.#playlist.previous();
    if (!previousVideoId) {
      this.#logger.info('[YouTubeCastReceiver] No previous video in playlist.');
      await this.stop(AID);
      return false;
    }

    return await this.play(previousVideoId, 0, AID);
  }

  /**
   * Calls `doSetVolume()`; if returned Promise resolves to `true`, notifies connected senders of new volume level.
   * @param volume - Volume level to set (0-100).
   * @param AID - Internal use; do not specify.
   * @returns Promise that resolves to the resolved result of `doSetVolume()`.
   */
  async setVolume(volume: number, AID?: number | null): Promise<boolean> {
    this.#logger.info(`[YouTubeCastReceiver] Player.setVolume(): ${volume}`);
    const previousState = await this.getState();
    const result = await this.doSetVolume(volume);
    if (result) {
      const currentState = await this.getState();
      this.emit('state', { current: currentState, previous: previousState, AID });
    }
    return result;
  }

  /**
   * Resets the player to Idle state.
   * @param AID - Internal use; do not specify.
   */
  async reset(AID?: number | null) {
    this.#logger.info('[YouTubeCastReceiver] Player.reset()');
    this.#playlist = new Playlist();
    await this.stop(AID);
    this.#previousState = null;
    this.#setStatusAndEmit(PLAYER_STATUSES.IDLE, AID);
  }

  /**
   * Calls `doGetVolume()`.
   * @returns Promise that resolves to the resolved result of `doGetVolume()` (0-100).
   */
  async getVolume(): Promise<number> {
    const v = await this.doGetVolume();
    return v < 0 ? 0 : v > 100 ? 100 : v;
  }

  /**
   * Calls `doGetPosition()`.
   * @returns Promise returned by `doGetPosition()`.
   */
  getPosition(): Promise<number> {
    return this.doGetPosition();
  }

  /**
   * Calls `doGetDuration()`
   * @returns Promise returned by `doGetDuration()`.
   */
  getDuration(): Promise<number> {
    return this.doGetDuration();
  }

  get logger(): Logger {
    return this.#logger;
  }

  get status(): PlayerStatus {
    return this.#status;
  }

  get autoplayMode(): AutoplayMode {
    return this.#autoplayMode;
  }

  get cpn(): string {
    return this.#cpn;
  }

  get playlist(): Playlist {
    return this.#playlist;
  }

  get context(): PlayerContext {
    return {
      playlistId: this.#playlist.id,
      clientCredentialsTransferToken: this.#playlist.ctt,
      cpn: this.cpn
    };
  }

  /**
   * @internal
   */
  setAutoplayMode(value: AutoplayMode) {
    this.#autoplayMode = value;
  }

  getNavInfo(): PlayerNavInfo {
    return {
      hasPrevious: this.#playlist.hasPrevious,
      hasNext: this.#playlist.hasNext,
      autoplayMode: this.#autoplayMode
    };
  }

  async getState(): Promise<PlayerState> {
    return {
      status: this.status,
      playlist: {
        id: this.#playlist.id,
        ctt: this.#playlist.ctt,
        videoIds: this.#playlist.videoIds,
        current: this.#playlist.current,
        currentIndex: this.#playlist.currentIndex
      },
      position: await this.getPosition(),
      duration: await this.getDuration(),
      volume: await this.getVolume(),
      cpn: this.#cpn
    };
  }

  /**
   * Updates the player status to `status` and emits a `state` event to indicate a change in player state.
   * @param status - Current player status; `undefined` for no change in player status.
   * @param AID
   */
  async #setStatusAndEmit(status?: PlayerStatus, AID?: number | null) {
    const previous = this.#previousState;
    if (status) {
      this.#status = status;
    }
    const current = this.#previousState = await this.getState();
    this.emit('state', { AID, current, previous });
  }

  /**
   * Signals that there has been a change in player state that is not captured elsewhere
   * in the `Player` implementation. This method will update the `Player` instance's
   * internal state and, if necessary, notifies senders of the new player state.
   * @param newStatus - The new player status; `undefined` for no change in player status.
   */
  async notifyExternalStateChange(newStatus?: PlayerStatus) {
    return this.#setStatusAndEmit(newStatus);
  }

  // Preserve parent signature as subclasses may choose to emit their own events.
  on(event: string | symbol, listener: (...args: any[]) => void): this;
  /**
   * @event
   * Emitted when there has been a change in player state.
   * @param listener.data: `current` - Current player state; `previous` - Previous player state.
   */
  on(event: 'state', listener: (data: { AID: string, current: PlayerState, previous: PlayerState | null }) => void): this;
  on(event: string | symbol, listener: (...args: any[]) => void): this {
    super.on(event, listener);
    return this;
  }
}