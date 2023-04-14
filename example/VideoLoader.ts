import Innertube, * as InnertubeLib from 'youtubei.js';
import { Video } from '../dist/mjs';

/**
 * Uses [YouTube.js](https://github.com/LuanRT/YouTube.js) for fetching video info.
 */
export default class VideoLoader {

  #innertube: Innertube | null;

  constructor() {
    this.#innertube = null;
  }

  async #init() {
    if (!this.#innertube) {
      this.#innertube = await Innertube.create();
    }
  }

  async getInfo(video: Video) {
    if (!this.#innertube) {
      await this.#init();
    }
    if (!this.#innertube) {
      throw Error('VideoLoader not initialized');
    }

    // Prepare endpoint for innertube.getInfo()
    const endpoint = new InnertubeLib.YTNodes.NavigationEndpoint({});
    endpoint.payload = {
      videoId: video.id,
    };
    if (video.context?.playlistId) {
      endpoint.payload.playlistId = video.context.playlistId;
    }
    if (video.context?.params) {
      endpoint.payload.params = video.context.params;
    }
    if (video.context?.index !== undefined) {
      endpoint.payload.index = video.context.index;
    }
    // Modify innertube's session context to include `ctt` param
    if (video.context?.ctt) {
      this.#innertube.session.context.user = {
        enableSafetyMode: false,
        lockedSafetyMode: false,
        credentialTransferTokens: [
          {
            'scope': 'VIDEO',
            'token': video.context?.ctt
          }
        ]
      } as any;
    }
    else {
      delete (this.#innertube.session.context.user as any)?.credentialTransferTokens;
    }

    // Call inntertube.getInfo()
    const info = await this.#innertube.getInfo(endpoint);
    return {
      title: info.basic_info.title || '',
      duration: info.basic_info.duration || 0
    };
  }

}