import ytmpl, { MixPlaylist, MixPlaylistItem } from 'yt-mix-playlist';
import ytdl from 'ytdl-core';
import Logger from '../utils/Logger.js';
import AutoplayLoader, { AutoplayLoaderContext } from './AutoplayLoader.js';

/**
 * Default {@link AutoplayLoader} implementation that fetches an autoplay video from:
 * - Mixes; or
 * - Related videos, if mixes are not found for the target video.
 */
export default class DefaultAutoplayLoader implements AutoplayLoader {

  #mixPlaylist: MixPlaylist | null;
  #logger: Logger;

  async getAutoplayVideoId(videoId: string, context: AutoplayLoaderContext, logger: Logger): Promise<string | null> {
    this.#logger = logger;
    this.#logger.info(`[YouTubeCastReceiver] Obtaining autoplay video from Mix playlist for video Id: ${videoId}...`);
    let upNextVideoId = await this.getFromMixPlaylist(videoId, context.currentVideoIds);
    if (!upNextVideoId) {
      this.#logger.info(`[YouTubeCastReceiver] Obtaining autoplay video from Related Videos for video Id: ${videoId}...`);
      upNextVideoId = await this.getFromRelatedVideos(videoId, context.currentVideoIds);
    }
    return upNextVideoId;
  }

  async getFromMixPlaylist(videoId: string, currentVideoIds: string[]): Promise<string | null> {
    // Retain existing mix playlist if current selection matches specified videoId.
    // Otherwise, reinitialize the playlist.
    let retain = false;
    if (this.#mixPlaylist) {
      const selected = this.#mixPlaylist.getSelected();
      retain = (selected.id === videoId);
    }

    if (!retain) {
      this.#mixPlaylist = await this.fetchMixPlaylist(videoId);
    }

    let noAutoplayReason = 'no reason given';
    if (this.#mixPlaylist) {
      let itemsAfterSelected = this.#mixPlaylist.getItemsAfterSelected();
      let upNextVideo: MixPlaylistItem | null = itemsAfterSelected[0];

      if (!upNextVideo) {
        noAutoplayReason = 'reached end of list';
      }
      else {
        let index = 0;
        let playlistRefreshCount = 0;
        const maxPlaylistRefreshes = 5;

        while (upNextVideo && currentVideoIds.indexOf(upNextVideo.id) >= 0) {
          index++;
          if (index > itemsAfterSelected.length - 1) {
            let hasMore = false;
            if (playlistRefreshCount < maxPlaylistRefreshes) {
              playlistRefreshCount++;
              this.#mixPlaylist = this.#mixPlaylist ? await this.#mixPlaylist.selectLast() : null;
              if (this.#mixPlaylist) {
                itemsAfterSelected = this.#mixPlaylist.getItemsAfterSelected();
                if (!itemsAfterSelected) {
                  noAutoplayReason = 'reached end of list';
                }
                else {
                  index = 0;
                  hasMore = true;
                }
              }
              else {
                noAutoplayReason = 'no further Mixes available';
              }
            }
            else {
              noAutoplayReason = 'reached max refreshes';
            }
            if (!hasMore) {
              upNextVideo = null;
              break;
            }
          }
          upNextVideo = itemsAfterSelected[index];
        }
      }

      if (upNextVideo) {
        this.#logger.info(`[YouTubeCastReceiver] Autoplay video from Mix playlist: ${upNextVideo.id} - ${upNextVideo.title}`);

        // Obtain updated mix playlist before returning result
        this.#mixPlaylist = this.#mixPlaylist ? await this.#mixPlaylist.select(upNextVideo.id) : null;

        return upNextVideo.id;
      }
    }
    else {
      noAutoplayReason = 'no Mix playlist found';
    }

    this.#logger.info('[YouTubeCastReceiver] Failed to obtain autoplay video from Mix playlist:', `${noAutoplayReason}.`);
    this.#mixPlaylist = null;
    return null;
  }

  async fetchMixPlaylist(videoId: string): Promise<MixPlaylist | null> {
    this.#logger.debug(`[YouTubeCastReceiver] Fetching Mix playlist for video Id: ${videoId}`);
    try {
      return await ytmpl(videoId);
    }
    catch (error) {
      this.#logger.error(`[YouTubeCastReceiver] Error fetching Mix playlist for video Id ${videoId}:`, error);
      return null;
    }
  }

  async getFromRelatedVideos(videoId: string, currentVideoIds: string[]): Promise<string | null> {
    let videoInfo, result;
    let noAutoplayReason = 'no reason given';
    try {
      videoInfo = await ytdl.getInfo(videoId);
    }
    catch (error) {
      this.#logger.error(`[YouTubeCastReceiver] Error fetching info for video Id ${videoId}:`, error);
      noAutoplayReason = 'failed to fetch video info';
      videoInfo = null;
    }

    if (videoInfo) {
      const relatedVideos = videoInfo.related_videos;
      if (Array.isArray(relatedVideos)) {
        for (let i = 0; i < relatedVideos.length; i++) {
          const rv = relatedVideos[i];
          if (rv?.id && currentVideoIds.indexOf(rv.id) < 0) {
            result = rv.id;
            break;
          }
          else if (rv && i === relatedVideos.length - 1) {
            noAutoplayReason = 'all related videos already exist in playlist';
          }
        }
      }
      else {
        noAutoplayReason = 'no related videos found';
      }
    }
    if (!result) {
      this.#logger.info('[YouTubeCastReceiver] Failed to obtain autoplay video from Related Videos:', `${noAutoplayReason}.`);
    }
    else {
      this.#logger.info(`[YouTubeCastReceiver] Autoplay video from Related Videos: ${result}`);
    }

    return result || null;
  }
}
