import { AUTOPLAY_MODES } from '../Constants.js';
import { AutoplayMode } from '../Player.js';
import Client from './Client.js';
import Message from './Message.js';
import PlaylistRequestHandler from './PlaylistRequestHandler.js';
import Video from './Video.js';

export interface PlaylistState {
  id: string | null;
  videoIds: string[];
  current: Video | null;
  autoplay: Video | null;
}

/**
 * Representation of the player queue.
 */
export default class Playlist {

  #id: string | null;
  #videoIds: string[];
  #current: Video | null;
  #previous: Video | null;
  #next: Video | null;
  #autoplayMode: AutoplayMode;
  #requestHandler: PlaylistRequestHandler;

  /** @internal */
  constructor() {
    this.#id = null;
    this.#videoIds = [];
    this.#current = null;
    this.#previous = null;
    this.#autoplayMode = AUTOPLAY_MODES.UNSUPPORTED;
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
      }
      else {
        this.#current = null;
      }
    }

    await this.#refreshPreviousNext();
  }

  async #refreshPreviousNext() {
    this.#previous = null;
    this.#next = null;
    const currentIndex = this.#current?.context?.index !== undefined ? this.#current.context.index : -1;
    if (currentIndex >= 0) {
      const nav = this.#current ? await this.#requestHandler.getPreviousNextVideos(this.#current, this) : null;
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
      current: this.current,
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

  /**
   * @internal
   */
  get requestHandler(): PlaylistRequestHandler {
    return this.#requestHandler;
  }
}
