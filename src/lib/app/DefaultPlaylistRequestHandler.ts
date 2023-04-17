import Innertube, * as InnertubeLib from 'youtubei.js';
import Playlist from './Playlist.js';
import PlaylistRequestHandler, { PlaylistPreviousNextVideos } from './PlaylistRequestHandler.js';
import Video from './Video.js';

type InnertubeEndpoint = InnertubeLib.YTNodes.NavigationEndpoint;

/**
 * Default implementation of the `PlaylistRequestHandler` abstract class.
 * Uses [YouTube.js](https://github.com/LuanRT/YouTube.js) for fetching data
 * from YouTube.
 */
export default class DefaultPlaylistRequestHandler extends PlaylistRequestHandler {

  #innertube: Innertube | null;

  constructor() {
    super();
    this.#innertube = null;
  }

  async #init() {
    if (!this.#innertube) {
      this.#innertube = await Innertube.create();
      this.#innertube.session.context.client.clientName = 'TVHTML5';
      this.#innertube.session.context.client.clientVersion = '7.20230405.08.01';
      this.#innertube.session.context.client.userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36; SMART-TV; Tizen 4.0,gzip(gfe)';
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getPreviousNextVideos(target: Video, playlist: Playlist): Promise<PlaylistPreviousNextVideos> {
    if (!this.#innertube) {
      await this.#init();
    }
    if (!this.#innertube) {
      throw Error('DefaultPlaylistRequestHandler not initialized');
    }
    this.logger.debug(`[yt-cast-receiver] DefaultPlaylistRequestHandler.getPreviousNextVideos: ${target.id}`);

    try {
      const endpoint = this.#createInnertubeEndpoint(target);
      this.#configureInnertubeContext(target);
      const nextResponse = await this.#innertube.actions.execute('/next', endpoint.payload) as any;

      const autoplaySet = nextResponse.data?.contents?.singleColumnWatchNextResults?.autoplay?.autoplay
        ?.sets?.[0];
      const previousRendererEndpoint = autoplaySet?.previousVideoRenderer?.autoplayEndpointRenderer?.endpoint;
      const nextRendererEndpoint = autoplaySet?.nextVideoRenderer?.autoplayEndpointRenderer?.endpoint;
      const autoplayRendererEndpoint = autoplaySet?.autoplayVideoRenderer?.mdxAutoplayVideoRenderer?.navigationEndpoint;

      const parsedEndpoints = {
        previous: previousRendererEndpoint ? new InnertubeLib.YTNodes.NavigationEndpoint(previousRendererEndpoint) : null,
        next: nextRendererEndpoint ? new InnertubeLib.YTNodes.NavigationEndpoint(nextRendererEndpoint) : null
      };
      if (!parsedEndpoints.next && autoplayRendererEndpoint) {
        parsedEndpoints.next = new InnertubeLib.YTNodes.NavigationEndpoint(autoplayRendererEndpoint);
      }

      this.logger.debug(`[yt-cast-receiver] Previous / Next endpoints for video Id: ${target.id}`, parsedEndpoints);

      const result = {
        previous: parsedEndpoints.previous ? this.#videoFromInnertubeEndpoint(parsedEndpoints.previous) : null,
        next: parsedEndpoints.next ? this.#videoFromInnertubeEndpoint(parsedEndpoints.next) : null
      };

      this.logger.debug(`[yt-cast-receiver] Previous / Next videos for video Id: ${target.id}`, result);

      return result;
    }
    catch (error) {
      this.logger.error(`[ytcr] Failed to get autoplay video for video Id: ${target.id}`, error);
      return { previous: null, next: null };
    }
  }

  #createInnertubeEndpoint(video: Video): InnertubeEndpoint {
    if (!this.#innertube) {
      throw Error('DefaultPlaylistRequestHandler not initialized.');
    }

    const endpoint = new InnertubeLib.YTNodes.NavigationEndpoint({});
    endpoint.payload = {
      videoId: video.id,
      enableMdxAutoplay: true,
      isMdxPlayback: true
    };
    if (video.context?.playlistId) {
      endpoint.payload.playlistId = video.context.playlistId;
    }
    if (video.context?.params) {
      endpoint.payload.params = video.context.params;
    }
    if (video.context?.index !== undefined) {
      endpoint.payload.playlistIndex = video.context.index;
    }

    return endpoint;
  }

  #configureInnertubeContext(video: Video) {
    if (!this.#innertube) {
      throw Error('DefaultPlaylistRequestHandler not initialized.');
    }

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
  }

  #videoFromInnertubeEndpoint(endpoint: InnertubeEndpoint): Video | null {
    if (!endpoint.payload?.videoId) {
      return null;
    }

    const result = {
      id: endpoint.payload.videoId
    } as any;

    const context = {} as any;
    if (endpoint.payload.index !== undefined) {
      context.index = endpoint.payload.index;
    }
    if (endpoint.payload.playlistId) {
      context.playlistId = endpoint.payload.playlistId;
    }
    if (endpoint.payload.params) {
      context.params = endpoint.payload.params;
    }
    if (endpoint.payload.watchEndpointSupportedAuthorizationTokenConfig?.videoAuthorizationToken?.credentialTransferTokens?.[0]?.token) {
      context.ctt = endpoint.payload.watchEndpointSupportedAuthorizationTokenConfig?.videoAuthorizationToken?.credentialTransferTokens?.[0]?.token;
    }
    if (Object.keys(context).length > 0) {
      result.context = context;
    }

    return result;
  }

  // Overrides
  reset(): void {
    this.#innertube = null;
  }
}
