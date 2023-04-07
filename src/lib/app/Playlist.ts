export type AutoplayInfo = {
  /** The Id of the autoplay video. */
  videoId: string,

  /** The Id of the video for which autoplay video was obtained. */
  forVideoId: string
} | null;

/**
 * Representation of the player queue, which appears on sender apps that support
 * the `queue` capability (basically the YouTube mobile app).
 *
 * The naming choice of 'Playlist' is for consistency with YouTube's API.
 * You may think of the queue as a form of playlist.
 *
 * Treat all playlist properties as read-only.
 */
export default class Playlist {

  #id: string | null; // PlaylistId
  #ctt: string | null; // ClientCredentialsTransferToken
  #videoIds: string[];
  #currentIndex: number;
  #autoplay: AutoplayInfo;

  /** @internal */
  constructor() {
    this.#id = null;
    this.#ctt = null;
    this.#videoIds = [];
    this.#currentIndex = -1;
    this.#autoplay = null;
  }

  /**
   * @internal
   *
   * Sets the playlist data.
   * @param data - Payload of incoming `setPlaylist` message.
   */
  set(data: any) {
    const currentVideoId = this.current;
    this.#id = data?.listId || null;
    this.#ctt = data?.ctt || null;
    this.#videoIds = data?.['videoIds']?.split(',') || [];
    if (data.currentIndex) {
      this.#currentIndex = parseInt(data.currentIndex, 10);
    }
    else {
      this.#currentIndex = currentVideoId ? this.#videoIds.indexOf(currentVideoId) : -1;
    }
  }

  /**
   * @internal
   *
   * Updates the playlist data.
   * @param data - Payload of incoming `updatePlaylist` message.
   */
  update(data: any) {
    const currentVideoId = this.current;
    if (data.listId) {
      this.#id = data.listId;
    }
    const videoIds = data.videoIds;
    if (!videoIds) {
      this.#videoIds = [];
      this.#currentIndex = -1;
      return;
    }
    this.#videoIds = videoIds.split(',');
    if (data.currentIndex) {
      this.#currentIndex = parseInt(data.currentIndex, 10);
    }
    else {
      this.#currentIndex = currentVideoId ? this.#videoIds.indexOf(currentVideoId) : -1;
    }
  }

  /**
   * @internal
   *
   * Sets the autoplay video.
   * @param data - {@link AutoplayInfo}.
   */
  setAutoplay(data: AutoplayInfo) {
    this.#autoplay = data;
  }

  #setCurrentIndex(index: number) {
    this.#currentIndex = this.#videoIds[index] ? index : -1;
  }

  /**
   * @internal
   *
   * Moves the autoplay video to the end of the playlist.
   * @returns The Id of the autoplay video, or `false` if there is none.
   */
  setAutoplayAsCurrent(): string | false {
    const autoplayVideoId = this.autoplay?.videoId;
    if (autoplayVideoId) {
      this.push(autoplayVideoId);
      this.#setCurrentIndex(this.length - 1);
      this.#autoplay = null;
      return autoplayVideoId;
    }
    return false;
  }

  /**
   * @internal
   *
   * Adds a video to the end of the playlist.
   * @param videoId The Id of the video to add to end of the playlist.
   */
  push(videoId: string) {
    this.#videoIds.push(videoId);
  }

  /**
   * @internal
   *
   * Moves current index to the next position and returns video at new index.
   * @returns Id of next video, or `null` if none.
   */
  next(): string | null {
    this.#setCurrentIndex(this.currentIndex + 1);
    return this.current;
  }

  /**
   * @internal
   *
   * Moves current index to the previous position and returns video at new index.
   * @returns Id of previous video, or `null` if none.
   */
  previous(): string | null {
    this.#setCurrentIndex(this.currentIndex - 1);
    return this.current;
  }

  /**
   * Id of the playlist.
   */
  get id(): string | null {
    return this.#id;
  }

  /**
   * Client credentials transfer token.
   */
  get ctt(): string | null {
    return this.#ctt;
  }

  /**
   * The Id of the video at current index, or `null` if none.
   */
  get current(): string | null {
    return this.#videoIds[this.currentIndex] || null;
  }

  /**
   * The Ids of the videos in the playlist.
   */
  get videoIds(): string[] {
    return this.#videoIds;
  }

  /**
   * Position of the currently selected video; -1 if none selected or playlist is empty.
   */
  get currentIndex(): number {
    return this.#currentIndex;
  }

  /**
   * The number of videos in the playlist.
   */
  get length(): number {
    return this.#videoIds.length;
  }

  /**
   * Whether current index points to the last video in the playlist.
   */
  get isLast(): boolean {
    return this.currentIndex === this.length - 1;
  }

  /**
   * Whether there is video after current index.
   */
  get hasNext(): boolean {
    return this.currentIndex < this.length - 1;
  }

  /**
   * Whether there is video before current index.
   */
  get hasPrevious(): boolean {
    return this.currentIndex > 0;
  }

  /**
   * Autoplay info.
   */
  get autoplay(): AutoplayInfo {
    return this.#autoplay;
  }
}
