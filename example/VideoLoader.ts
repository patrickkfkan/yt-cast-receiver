import Innertube, * as InnertubeLib from 'youtubei.js';
import { Video } from '../dist/mjs';

interface BasicInfo {
  type: 'song' | 'video';
  title: string;
  channel?: string;
  artist?: string;
  album?: string;
}

export interface VideoInfo extends BasicInfo {
  duration: number;
}

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

  async getInfo(video: Video): Promise<VideoInfo | null> {
    if (!this.#innertube) {
      await this.#init();
    }
    if (!this.#innertube) {
      throw Error('VideoLoader not initialized');
    }

    // Prepare request payload
    const payload = {
      videoId: video.id,
      enableMdxAutoplay: true,
      isMdxPlayback: true
    } as any;
    if (video.context?.playlistId) {
      payload.playlistId = video.context.playlistId;
    }
    if (video.context?.params) {
      payload.params = video.context.params;
    }
    if (video.context?.index !== undefined) {
      payload.index = video.context.index;
    }

    // Modify innertube session context to indicate we are requesting data for a 'TV' client.
    this.#innertube.session.context.client.clientName = 'TVHTML5';
    this.#innertube.session.context.client.clientVersion = '7.20230405.08.01';
    this.#innertube.session.context.client.userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36; SMART-TV; Tizen 4.0,gzip(gfe)';

    // Remember to include `ctt` param if available - this is required particularly for private videos.
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

    // There are two endpoints we need to fetch data from:
    // 1. '/next': for metadata (title, channel for video, artist / album for music...)
    // 2. '/player': for streaming data

    const nextResponse = await this.#innertube.actions.execute('/next', payload) as any;

    let basicInfo: BasicInfo | null = null;

    // We cannot use innertube to parse `nextResponse`, because it doesn't
    // Have `SingleColumnWatchNextResults` parser class. We would have to do it ourselves.

    const singleColumnContents = nextResponse.data?.contents?.singleColumnWatchNextResults?.
      results?.results?.contents?.[0]?.itemSectionRenderer?.contents?.[0];

    const videoMetadata = singleColumnContents?.videoMetadataRenderer;
    const songMetadata = singleColumnContents?.musicWatchMetadataRenderer;

    if (videoMetadata) {
      basicInfo = {
        type: 'video',
        title: new InnertubeLib.Misc.Text(videoMetadata.title).toString(),
        channel: new InnertubeLib.Misc.Text(videoMetadata.owner?.videoOwnerRenderer?.title).toString()
      };
    }
    else if (songMetadata) {
      basicInfo = {
        type: 'song',
        title: new InnertubeLib.Misc.Text(songMetadata.title).toString(),
        artist: new InnertubeLib.Misc.Text(songMetadata.byline).toString(),
        album: new InnertubeLib.Misc.Text(songMetadata.albumName).toString()
      };
    }

    if (basicInfo) {
      // Fetch response from '/player' endpoint.
      const playerResponse = await this.#innertube.actions.execute('/player', payload) as any;

      // Wrap it in innertube VideoInfo. Why? Because it offers many useful methods like `chooseFormat()`.
      const innertubeVideoInfo = new InnertubeLib.YT.VideoInfo([ playerResponse ], this.#innertube.actions, InnertubeLib.Utils.generateRandomString(16));

      /**
       * Although not applicable to our FakePlayer, in an actual player implementation you would
       * also return the actual stream for playback. You can do that with VideoInfo.chooseFormat() or toDash().
       */

      const result = {
        ...basicInfo,
        duration: innertubeVideoInfo.basic_info.duration || 0
      } as VideoInfo;

      return result;
    }

    return null;
  }
}
