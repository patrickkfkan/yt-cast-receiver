import removeNewline from 'newline-remove';
import { AUTOPLAY_MODES, PLAYER_STATUSES } from '../Constants.js';
import { type AutoplayMode, type PlayerNavInfo, type PlayerState, type Volume } from '../Player.js';

/**
 * @internal
 *
 * A `Message` object represents a message received from a sender through an {@link RPCConnection}, or
 * one that needs to be sent from the receiver.
 */
export class Message {
  /**
   * Action identifier.
   *
   * Every incoming message contains an `AID` value. A message that is sent in response
   * to an incoming message shall have its `AID` value set to match that of the latter.
   * Otherwise, it shall be set to `null`.
   *
   * `AID` values may be overridden before a message is actually sent. This is because
   * an `AID` attached to a send request must not be smaller than that of a previous request
   * (see {@link BindParams}). Nevertheless, matching `AID` values would allow us to
   * debug more easily if something doesn't work as expected.
   */
  AID: number | null;

  /**
   * The `name` property indicates what the message is about. It may indicate that an
   * action is to be taken or an event has occurred.
   */
  name: string;

  /**
   * Additional data bundled with the message.
   */
  payload: any;

  constructor(AID: number | null, name: string, payload?: any) {
    this.AID = AID;
    this.name = name;
    this.payload = payload || {};
  }

  /**
   * Parses `data` and returns an array of `Message` objects.
   * @param data - Unprocessed text received from a sender through an {@link RPCConnection}.
   * @returns An array of `Message` objects, or an empty array if no messages parsed.
   */
  static parseIncoming(data: string): Message[] {
    const regex = /\[(\d+),\["(.+?)"(?:,(.*?))?\]\]/g;

    // https://regex101.com/codegen?language=javascript
    let m;
    const parsed = [];
    while ((m = regex.exec(removeNewline(data))) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      const cmd = {
        AID: parseInt(m[1], 10),
        name: m[2],
        payload: null
      };
      if (m[3] !== undefined) {
        const payload = JSON.parse(`[${m[3]}]`);
        if (Array.isArray(payload) && payload.length === 1) {
          cmd.payload = payload[0];
        }
        else {
          cmd.payload = payload;
        }
      }
      parsed.push(new Message(cmd.AID, cmd.name, cmd.payload));
    }

    return parsed;
  }
}

 
export namespace Message {

  /**
   * @internal
   *
   * Convenience class for constructing an outgoing 'nowPlaying' `Message` object.
   * Notifies senders what video is now playing as well as its current state.
   */
  export class NowPlaying extends Message {
    constructor(AID: number | null, playerState: PlayerState | null) {
      const payload = {} as any;
      if (playerState?.queue.current) {
        payload.currentTime = playerState.position;
        payload.duration = playerState.duration;
        payload.cpn = playerState.cpn;
        payload.loadedTime = 0;
        payload.videoId = playerState.queue.current.id;
        payload.state = playerState.status;
        payload.seekableStartTime = 0;
        payload.seekableEndTime = playerState.duration;

        const context = playerState.queue.current.context;
        if (context?.playlistId) {
          payload.listId = context.playlistId;
        }
        if (context?.index !== undefined) {
          payload.currentIndex = context.index;
        }
        if (context?.ctt) {
          payload.ctt = context.ctt;
        }
        if (context?.params) {
          payload.params = context.params;
        }
      }
      if (playerState?.status === PLAYER_STATUSES.PLAYING ||
        playerState?.status === PLAYER_STATUSES.PAUSED ||
        playerState?.status === PLAYER_STATUSES.LOADING) {
        payload.loadedTime = playerState.duration;
      }

      super(AID, 'nowPlaying', payload);
    }
  }

  /**
   * @internal
   *
   * Convenience class for constructing an outgoing 'onStateChange' `Message` object.
   * Notifies senders of current player state.
   */
  export class OnStateChange extends Message {
    constructor(AID: number| null, playerState: PlayerState) {
      const payload = {
        state: playerState.status,
        currentTime: playerState.position,
        duration: playerState.duration,
        loadedTime: 0,
        seekableStartTime: 0,
        seekableEndTime: playerState.duration,
        cpn: playerState.cpn
      };
      if (playerState?.status === PLAYER_STATUSES.PLAYING ||
        playerState?.status === PLAYER_STATUSES.PAUSED ||
        playerState?.status === PLAYER_STATUSES.LOADING) {
        payload.loadedTime = playerState.duration;
      }
      super(AID, 'onStateChange', payload);
    }
  }

  /**
   * @internal
   *
   * Convenience class for constructing an outgoing 'onVolumeChanged' `Message` object.
   * Notifies senders of current volume level.
   */
  export class OnVolumeChanged extends Message {
    constructor(AID: number | null, volume: Volume) {
      const payload = {
        volume: volume.level,
        muted: volume.muted
      };
      super(AID, 'onVolumeChanged', payload);
    }
  }

  /**
   * @internal
   *
   * Convenience class for constructing an outgoing 'onAutoplayModeChanged' `Message` object.
   * Notifies senders whether to enable, disable or hide the Autoplay button.
   */
  export class OnAutoplayModeChanged extends Message {
    constructor(AID: number | null, info: AutoplayMode | PlayerNavInfo | null) {
      const autoplayMode = info === null ? AUTOPLAY_MODES.UNSUPPORTED : typeof info === 'string' ? info : info.autoplayMode;
      const payload = {
        autoplayMode
      };
      super(AID, 'onAutoplayModeChanged', payload);
    }
  }

  /**
   * @internal
   *
   * Convenience class for constructing an outgoing 'onHasPreviousNextChanged' `Message` object.
   * Notifies senders whether previous / next video is available.
   */
  export class OnHasPreviousNextChanged extends Message {
    constructor(AID: number | null, playerNavInfo: PlayerNavInfo | null) {
      const payload = {
        hasPrevious: !!playerNavInfo?.hasPrevious,
        hasNext: !!playerNavInfo?.hasNext
      };
      super(AID, 'onHasPreviousNextChanged', payload);
    }
  }

  /**
   * @internal
   *
   * Convenience class for constructing an outgoing 'autoplayUpNext' `Message` object.
   * Notifies senders what video is set for autoplay.
   */
  export class AutoplayUpNext extends Message {
    constructor(AID: number | null, videoId: string | null) {
      const payload = videoId ? { videoId } : null;
      super(AID, 'autoplayUpNext', payload);
    }
  }

  /**
   * @internal
   *
   * Convenience class for constructing an outgoing 'loungeScreenDisconnected' `Message` object.
   * Notifies senders that their Cast session with the receiver has ended.
   */
  export class LoungeScreenDisconnected extends Message {
    constructor() {
      super(null, 'loungeScreenDisconnected', {});
    }
  }
}

export default Message;
