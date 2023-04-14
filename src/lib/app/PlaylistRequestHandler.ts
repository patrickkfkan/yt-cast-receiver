import Logger from '../utils/Logger.js';
import Playlist from './Playlist.js';
import Video from './Video.js';

/**
 * Handles requests made by a `Playlist` instance.
 */
abstract class PlaylistRequestHandler {

  #logger: Logger;

  setLogger(logger: Logger) {
    this.#logger = logger;
  }

  /**
   * Given `target` video that resides in `playlist`, implementations shall fetch
   * the previous and next videos in the list.
   *
   * If `target` is already the last video in the list, then fetch the autoplay video
   * in lieu of next video. You may optionally check first whether autoplay is enabled
   * with `playlist.autoplayMode`, and return `null` for next video if it is not.
   * The object returned by this method shall have the following properties:
   * - `previous`: object representing the previous video in the list, or `null` if there is none.
   * - `next`: object representing the next video in the list or autoplay video, as the case may be, or `null` if there is none.
   * Instead of `null`, you may simply omit `previous` or `next` from the returned result. But if provided, they
   * must satisfy the {@link Video} interface constraint.
   * @param target - Target video for which the previous and next videos are obtained.
   * @param playlist - The `Playlist` instance making the request.
   * @returns (Object)
   */
  abstract getPreviousNextVideos(target: Video, playlist: Playlist): Promise<{ previous?: Video | null, next?: Video | null }>;

  /**
   * Resets the handler to its initial state. By default, this method does nothing.
   * Implementations shall override this method if need be.
   */
  reset() {
    // Do nothing
  }

  get logger(): Logger {
    return this.#logger;
  }
}

export default PlaylistRequestHandler;
