import Innertube, * as InnertubeLib from 'youtubei.js';
import { CLIENTS } from '../Constants.js';
import type Client from './Client.js';
import type Playlist from './Playlist.js';
import PlaylistRequestHandler, { type PlaylistPreviousNextVideos } from './PlaylistRequestHandler.js';
import type Video from './Video.js';

type InnertubeEndpoint = InnertubeLib.YTNodes.NavigationEndpoint;

const TV_CLIENT_INFO = {
  clientName: 'TVHTML5',
  clientVersion: '7.20230405.08.01',
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36; SMART-TV; Tizen 4.0,gzip(gfe)'
};

const MUSIC_CLIENT_INFO = {
  clientName: InnertubeLib.Constants.CLIENTS.YTMUSIC.NAME,
  clientVersion: InnertubeLib.Constants.CLIENTS.YTMUSIC.VERSION
};

/**
 * Default implementation of the `PlaylistRequestHandler` abstract class.
 * Uses [YouTube.js](https://github.com/LuanRT/YouTube.js) for fetching data
 * from YouTube.
 */
export default class DefaultPlaylistRequestHandler extends PlaylistRequestHandler {

  #innertube: Innertube | null;
  #innertubeInitialClient: InnertubeLib.Context['client'];
  #innertubeTVClient: InnertubeLib.Context['client'];
  #innertubeMusicClient: InnertubeLib.Context['client'];

  constructor() {
    super();
    this.#innertube = null;
  }

  async #init() {
    if (!this.#innertube) {
      this.#innertube = await Innertube.create();
      this.#innertubeInitialClient = { ...this.#innertube.session.context.client };
      this.#innertubeTVClient = {
        ...this.#innertube.session.context.client,
        ...TV_CLIENT_INFO
      };
      this.#innertubeMusicClient = {
        ...this.#innertube.session.context.client,
        ...MUSIC_CLIENT_INFO
      };
    }
  }

  async getPreviousNextVideos(target: Video, playlist: Playlist): Promise<PlaylistPreviousNextVideos> {
    if (!this.#innertube) {
      await this.#init();
    }
    if (!this.#innertube) {
      throw Error('DefaultPlaylistRequestHandler not initialized');
    }
    this.logger.debug('[yt-cast-receiver] DefaultPlaylistRequestHandler.getPreviousNextVideos:', target);

    /**
     * Mark target as watched to reduce its chance of being returned as autoplay video in future results.
     *
     * Note:
     * By experiment, it takes a bit of time for markWatched() to take effect. For example, let's say video2 is
     * the autoplay result for video1. If, after calling markWatched() for video1, you immediately request
     * next video for video2, there is still a good chance that video1 will be returned as autoplay. But if you
     * do it 10 seconds after markWatched(), then the chance will be greatly reduced. This behavior can be observed
     * even on YouTube website.
     */
    await this.markWatched(target);

    try {
      // We are sending requests as TV client, so need to specify `noClient: true` to remove `client` property from endpoint
      // (really only applies when client is YouTube Music).
      const endpoint = this.#createInnertubeEndpoint(target, true);
      this.#configureInnertubeContext(target, 'tv');
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
      let nextIsAutoplay = false;
      if (!parsedEndpoints.next && autoplayRendererEndpoint) {
        parsedEndpoints.next = new InnertubeLib.YTNodes.NavigationEndpoint(autoplayRendererEndpoint);
        nextIsAutoplay = true;
      }

      this.logger.debug(`[yt-cast-receiver] Previous / Next endpoints for video Id: ${target.id}`, parsedEndpoints);

      const result = {
        previous: parsedEndpoints.previous ? this.#videoFromInnertubeEndpoint(parsedEndpoints.previous, target.client) : null,
        next: parsedEndpoints.next ? this.#videoFromInnertubeEndpoint(parsedEndpoints.next, target.client) : null
      };

      this.logger.debug(`[yt-cast-receiver] Previous / Next videos for video Id: ${target.id}`, result);

      if (nextIsAutoplay && result.next?.id && playlist.videoIds.includes(result.next.id)) {
        this.logger.warn(`[yt-cast-receiver] Autoplay video ${result.next.id} already exists in playlist.`);
      }

      return result;
    }
    catch (error) {
      this.logger.error(`[yt-cast-receiver] Failed to get autoplay video for video Id: ${target.id}`, error);
      return { previous: null, next: null };
    }
  }

  #createInnertubeEndpoint(video: Video, noClient = false): InnertubeEndpoint {
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
    if (video.client === CLIENTS.YTMUSIC && !noClient) {
      endpoint.payload.client = 'YTMUSIC';
    }

    return endpoint;
  }

  #configureInnertubeContext(video: Video, type: 'tv' | 'music' | 'initial') {
    if (!this.#innertube) {
      throw Error('DefaultPlaylistRequestHandler not initialized.');
    }

    switch (type) {
      case 'tv':
        this.#innertube.session.context.client = this.#innertubeTVClient;
        break;
      case 'music':
        this.#innertube.session.context.client = this.#innertubeMusicClient;
        break;
      default:
        this.#innertube.session.context.client = this.#innertubeInitialClient;
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

  #videoFromInnertubeEndpoint(endpoint: InnertubeEndpoint, client: Client): Video | null {
    if (!endpoint.payload?.videoId) {
      return null;
    }

    const result: Video = {
      id: endpoint.payload.videoId,
      client
    };

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

  async markWatched(video: Video, run: 1 | 2 = 1): Promise<void> {
    if (!this.#innertube) {
      throw Error('DefaultPlaylistRequestHandler not initialized.');
    }

    /**
     * MarkWatched() involves 2 runs: once with playlist info intact, and once without.
     * However, 2nd run will be skipped if video is private because without playlist info, player response won't contain the
     * Playback tracking URL needed to mark video as watched. Presumably, this is because a private video cannot exist in public space.
     */

    this.logger.debug(`[yt-cast-receiver] Marking video ${video.id} as watched ${run === 1 ? '(1st run)' : '(2nd run - without playlist info)'}...`);

    const isMusic = video.client === CLIENTS.YTMUSIC;
    this.#configureInnertubeContext(video, isMusic ? 'music' : 'initial');

    const endpoint = this.#createInnertubeEndpoint(run === 1 ? video : {...video, context: undefined});
    const payload = endpoint.payload;

    try {
      const playerResponse = await this.#innertube.actions.execute('/player', payload) as any;
      const playbackUrl = playerResponse.data?.playbackTracking?.videostatsPlaybackUrl?.baseUrl;
      if (playbackUrl) {
        let referrer = `https://www.youtube.com/tv#/watch?v=${video.id}`;
        if (video.context?.playlistId) {
          referrer += `&list=${video.context.playlistId}`;
        }
        const clientInfo = isMusic ? MUSIC_CLIENT_INFO : TV_CLIENT_INFO;
        const params = {
          cpn: InnertubeLib.Utils.generateRandomString(16),
          fmt: 251,
          rtn: 0,
          rt: 0,
          c: clientInfo.clientName,
          cver: clientInfo.clientVersion,
          ctheme: isMusic ? 'MUSIC' : 'CLASSIC',
          cplayer: 'UNIPLAYER',
          ctrl: 'mdx-pair',
          referrer
        } as any;
        if (video.context?.ctt) {
          params.ctt = video.context.ctt;
          params.cttype = 'vvt';
        }
        await this.#innertube.session.actions.stats(playbackUrl, {
          client_name: clientInfo.clientName,
          client_version: clientInfo.clientVersion
        }, params);

        if (run === 2) {
          return;
        }

        if (playerResponse.data?.videoDetails?.isPrivate) {
          this.logger.debug('[yt-cast-receiver] DefaultPlaylistRequestHandler skipping 2nd run of markWatched(): video is private and cannot be mark as watched without playlist info.');
          return;
        }

        return await this.markWatched(video, 2);
      }

      throw Error('No playback tracking URL found');

    }
    catch (error) {
      this.logger.warn(`[yt-cast-receiver] DefaultPlaylistRequestHandler failed to mark video ${video.id} as watched:`, error);
    }
  }

  // Overrides
  reset(): void {
    this.#innertube = null;
  }
}
