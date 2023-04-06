import Logger from '../utils/Logger';

/**
 * @see {@link AutoplayLoader}
 */
export interface AutoplayLoaderContext {
  /** The Id of the {@link Playlist} representing the player queue. */
  playlistId: string | null,

  /** The Ids of the videos currently in the player queue. */
  currentVideoIds: string[],

  /** Token for accessing private videos. */
  clientCredentialsTransferToken: string | null
}

/**
 * Fetches and returns the autoplay (aka 'Up Next') video for a given video.
 */
interface AutoplayLoader {
  /**
   * Fetches the autoplay video for the specified video.
   * @param videoId - The Id of the target video.
   * @param context - Additional info that might be useful.
   * @param logger - `Logger` implementation for logging messages.
   * @returns Promise that resolves to the Id of the autoplay video, or `null` if none obtained.
   */
  getAutoplayVideoId(videoId: string, context: AutoplayLoaderContext, logger: Logger): Promise<string | null>;
}

export default AutoplayLoader;
