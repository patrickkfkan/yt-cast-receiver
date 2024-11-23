import EventEmitter from 'events';
import { AUTOPLAY_MODES } from '../Constants.js';
import { type AutoplayMode } from '../Player.js';
import type Logger from '../utils/Logger.js';
import { type ValueOf } from '../utils/Type.js';
import type Client from './Client.js';
import type Message from './Message.js';
import type PlaylistRequestHandler from './PlaylistRequestHandler.js';
import type Video from './Video.js';

export const PLAYLIST_EVENT_TYPES = {
  VIDEO_SELECTED: 'videoSelected',
  VIDEO_ADDED: 'videoAdded',
  VIDEO_REMOVED: 'videoRemoved',
  PLAYLIST_SET: 'playlistSet',
  PLAYLIST_ADDED: 'playlistAdded',
  PLAYLIST_CLEARED: 'playlistCleared',
  PLAYLIST_UPDATED: 'playlistUpdated'
} as const;

export interface PlaylistState {
  id: string | null;
  videoIds: string[];
  previous: Video | null;
  current: Video | null;
  next: Video | null;
  autoplay: Video | null;
}

export type PlaylistEventType = ValueOf<typeof PLAYLIST_EVENT_TYPES>;

export interface PlaylistEvent {
  type: PlaylistEventType;
  videoId?: string;
  videoIds?: string[];
  user?: {
    name: string,
    thumbnail: string
  };
}

/**
 * Representation of the player queue.
 */
export default class Playlist extends EventEmitter {

  #id: string | null;
  #videoIds: string[];
  #current: Video | null;
  #previous: Video | null;
  #next: Video | null;
  #autoplayMode: AutoplayMode;
  #logger: Logger;
  #requestHandler: PlaylistRequestHandler;
  #previousNextAbortController: AbortController | null;

  /** @internal */
  constructor() {
    super();
    this.#id = null;
    this.#videoIds = [];
    this.#current = null;
    this.#previous = null;
    this.#autoplayMode = AUTOPLAY_MODES.UNSUPPORTED;
    this.#previousNextAbortController = null;
  }

  /** @internal */
  setLogger(logger: Logger) {
    this.#logger = logger;
  }

  /** @internal */
  setRequestHandler(value: PlaylistRequestHandler) {
    this.#requestHandler = value;
  }

  /** @internal */
  async setAutoplayMode(value: AutoplayMode) {
    const oldMode = this.#autoplayMode;
    this.#autoplayMode = value;
    if (oldMode !== value) {
      await this.#refreshPreviousNext();
      this.emit('autoplayModeChange', oldMode, value);
    }
  }

  /**
   * @internal
   *
   * Updates the playlist with payload of 'setPlaylist' or 'updatePlaylist' message.
   * @param data - 'setPlaylist' or 'updatePlaylist' `Message` object.
   */
  async updateByMessage(message: Message, client: Client) {
    if (message.name !== 'setPlaylist' && message.name !== 'updatePlaylist') {
      return;
    }

    const data = message.payload;

    if (!data.listId) {
      this.#id = null;
      this.#current = null;
      this.#next = null;
      this.#previous = null;
      this.#videoIds = [];
      this.emit('playlistCleared', { type: 'playlistCleared' });
      return;
    }

    this.#id = data.listId;
    this.#videoIds = data.videoIds ? data.videoIds.split(',') : [];

    if (message.name === 'setPlaylist') {
      if (data.currentIndex && data.videoId) {
        const context: any = {
          playlistId: data.listId,
          index: parseInt(data.currentIndex, 10)
        };
        if (data.ctt) {
          context.ctt = data.ctt;
        }
        if (data.params) {
          context.params = data.params;
        }
        this.#current = {
          id: data.videoId,
          client,
          context
        };
      }
      else {
        this.#current = null;
      }
    }
    else if (this.#current) { // 'updatePlaylist'
      const index = this.#videoIds.findIndex((v) => v === this.#current?.id);
      if (index >= 0) {
        if (!this.#current.context) {
          this.#current.context = {};
        }
        this.#current.context.playlistId = data.listId;
        this.#current.context.index = index;

        if (data.params) {
          this.#current.context.params = data.params;
        }
        else {
          delete this.#current.context.params;
        }
      }
      else {
        this.#current = null;
      }
    }

    await this.#refreshPreviousNext();

    let event: PlaylistEvent | null = null;
    if (data.eventDetails) {
      try {
        const eventDetails = JSON.parse(data.eventDetails);
        const eventType = eventDetails.eventType as keyof typeof PLAYLIST_EVENT_TYPES;

        let emitEventType: PlaylistEventType | null;
        switch (eventType) {
          case 'PLAYLIST_ADDED':
            emitEventType = 'playlistAdded';
            break;
          case 'PLAYLIST_CLEARED':
            emitEventType = 'playlistCleared';
            break;
          case 'PLAYLIST_SET':
            emitEventType = 'playlistSet';
            break;
          case 'VIDEO_ADDED':
            emitEventType = 'videoAdded';
            break;
          case 'VIDEO_REMOVED':
            emitEventType = 'videoRemoved';
            break;
          case 'VIDEO_SELECTED':
            emitEventType = 'videoSelected';
            break;
          default:
            emitEventType = null;
        }
        if (emitEventType) {
          event = {
            type: emitEventType
          };
          if (eventDetails.user) {
            event.user = {
              name: eventDetails.user,
              thumbnail: eventDetails.userAvatarUri
            };
          }
          if (eventDetails.videoId) {
            event.videoId = eventDetails.videoId;
          }
          if (eventDetails.videoIds) {
            event.videoIds = eventDetails.videoIds;
          }
        }
      }
      catch (error) {
        this.#logger.error('[yt-cast-receiver] Failed to parse playlist eventDetails:', data.eventDetails, error);
        event = null;
      }
    }

    if (!event) {
      const emitEventType = message.name === 'setPlaylist' ? 'playlistSet' : 'playlistUpdated';
      event = {
        type: emitEventType,
        videoIds: this.#videoIds
      };
    }

    this.emit(event.type, event);
  }

  #abortRefreshPreviousNext() {
    if (this.#previousNextAbortController) {
      this.#previousNextAbortController.abort();
      this.#previousNextAbortController = null;
    }
  }

  async #refreshPreviousNext() {
    this.#abortRefreshPreviousNext();
    this.#previous = null;
    this.#next = null;
    const currentIndex = this.#current?.context?.index !== undefined ? this.#current.context.index : -1;
    if (currentIndex >= 0) {
      let nav = null;
      if (this.#current) {
        this.#previousNextAbortController = new AbortController();
        try {
          nav = await this.#requestHandler.getPreviousNextVideosAbortable(this.#current, this, this.#previousNextAbortController.signal);
        }
        catch (error: any) {
          if (error.name === 'AbortError') {
            return;
          }
          throw error;
        }
        finally {
          this.#previousNextAbortController = null;
        }
      }
      this.#previous = nav?.previous || null;
      if (!this.isLast || this.#autoplayMode === AUTOPLAY_MODES.ENABLED) {
        this.#next = nav?.next || null;
      }
    }
  }

  /** @internal */
  reset() {
    this.#id = null;
    this.#videoIds = [];
    this.#current = null;
    this.#previous = null;
    this.#autoplayMode = AUTOPLAY_MODES.UNSUPPORTED;
    this.#requestHandler.reset();
  }

  /**
   * Id of the playlist.
   */
  get id(): string | null {
    return this.#id;
  }

  /**
   * The Ids of the videos in the playlist.
   */
  get videoIds(): string[] {
    return this.#videoIds;
  }

  /**
   * The number of videos in the playlist.
   */
  get length(): number {
    return this.#videoIds.length;
  }

  /** @internal */
  async previous(): Promise<Video | null> {
    if (!this.#previous) {
      return null;
    }
    this.#current = this.#previous;
    await this.#refreshPreviousNext();
    return this.#current;
  }

  /** @internal */
  async next(): Promise<Video | null> {
    if (!this.hasNext) {
      return null;
    }
    this.#current = this.#next;
    await this.#refreshPreviousNext();
    return this.#current;
  }

  getState(): PlaylistState {
    return {
      id: this.id,
      videoIds: this.videoIds,
      previous: this.#previous,
      current: this.current,
      next: this.hasNext ? this.#next : null,
      autoplay: this.autoplay
    };
  }

  /** @internal */
  setAsCurrent(video: Video) {
    if (this.#current?.id === video.id) {
      return;
    }
    if (this.autoplay?.id === video.id) {
      this.#next = null;
    }
    this.#current = video;
  }

  get autoplay(): Video | null {
    if (this.isLast) {
      return this.#next;
    }
    return null;
  }

  get current(): Video | null {
    return this.#current;
  }

  get autoplayMode(): AutoplayMode {
    return this.#autoplayMode;
  }

  get isLast(): boolean {
    const currentIndex = this.#current?.context?.index !== undefined ? this.#current.context.index : -1;
    return currentIndex < 0 || currentIndex === this.length - 1;
  }

  get hasPrevious(): boolean {
    return !!this.#previous;
  }

  get hasNext(): boolean {
    if (!this.#next || this.isLast) {
      return false;
    }
    return true;
  }

  get isUpdating(): boolean {
    return !!this.#previousNextAbortController;
  }

  /**
   * @internal
   */
  get requestHandler(): PlaylistRequestHandler {
    return this.#requestHandler;
  }

  on(event: 'autoplayModeChange', listener: (previous: AutoplayMode, current: AutoplayMode) => void): this;
  on(event: 'playlistUpdated', listener: (event: Omit<PlaylistEvent, 'videoId' | 'user'>) => void): this;
  on(event: 'playlistCleared', listener: (event: Omit<PlaylistEvent, 'videoId' | 'videoIds'>) => void): this;
  on(event: 'videoSelected' | 'videoAdded' | 'videoRemoved', listener: (event: Omit<PlaylistEvent, 'videoIds'>) => void): this;
  on(event: 'playlistAdded' | 'playlistSet', listener: (event: Omit<PlaylistEvent, 'videoId'>) => void): this;
  on(event: string | symbol, listener: (...args: any[]) => void): this {
    super.on(event, listener);
    return this;
  }
}
