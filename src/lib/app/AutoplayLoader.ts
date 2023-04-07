import Player from '../Player.js';
import Logger from '../utils/Logger.js';

/**
 * Fetches and returns the autoplay (aka 'Up Next') video for a given video.
 */
interface AutoplayLoader {
  /**
   * Fetches the autoplay video for the specified video.
   * @param videoId - The Id of the target video.
   * @param player - The `Player` implementation associated with this request.
   * @param logger - `Logger` implementation for logging messages.
   * @returns Promise that resolves to the Id of the autoplay video, or `null` if none obtained.
   */
  getAutoplayVideoId(videoId: string, player: Player, logger: Logger): Promise<string | null>;
}

export default AutoplayLoader;
