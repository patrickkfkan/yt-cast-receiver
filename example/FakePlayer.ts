import { Timer } from 'timer-node';
import { Player, type PlayerState, PLAYER_STATUSES, type Volume } from '../dist/mjs/index.js';
import type Video from '../dist/mjs/lib/app/Video.js';
import VideoLoader from './VideoLoader.js';

export interface FakeState {
  status: number;
  videoTitle: string;
  position: number;
  duration: number;
  volume: Volume;
}

/**
 * Custom implementation of {@link Player} for use with {@link FakePlayerDemo}.
 * Uses a timer to simulate playback and [YouTube.js](https://github.com/LuanRT/YouTube.js)
 * for fetching video info (see {@link VideoLoader}).
 */
export default class FakePlayer extends Player {

  videoLoader: VideoLoader;
  currentVideoId: string | null;
  currentVideoTitle: string | null;
  timer: Timer;
  seekOffset: number;
  duration: number;
  timeout: NodeJS.Timeout | null;
  volume: Volume;

  constructor() {
    super();
    this.videoLoader = new VideoLoader();
    this.currentVideoId = null;
    this.currentVideoTitle = null;
    this.timer = new Timer();
    this.seekOffset = 0;
    this.duration = 0;
    this.timeout = null;
    this.volume = {
      level: 50,
      muted: false
    };

    // When we receive a `state` event from the super class, signalling a change
    // In player state, we emit our own `fakeState` event for `FakeDemoPlayer` to consume.
    this.on('state', this.#emitFakeState.bind(this));
  }

  protected doPlay(video: Video, position: number): Promise<boolean> {
    this.logger.info(`[FakePlayer]: Play ${video.id} at position ${position}s`);
    return this.#fakePlay(video, position);
  }

  protected doPause(): Promise<boolean> {
    this.logger.info('[FakePlayer]: Pause');
    return this.#fakePause();
  }

  protected doResume(): Promise<boolean> {
    this.logger.info('[FakePlayer]: Resume');
    return this.#fakeResume();
  }

  protected doStop(): Promise<boolean> {
    this.logger.info('[FakePlayer]: Stop');
    return this.#fakeStop();
  }

  protected doSeek(position: number): Promise<boolean> {
    this.logger.info(`[FakePlayer]: Seek to ${position}s`);
    return this.#fakeSeek(position);
  }

  protected doSetVolume(volume: Volume): Promise<boolean> {
    this.volume = volume;
    return Promise.resolve(true);
  }

  protected doGetVolume(): Promise<Volume> {
    return Promise.resolve(this.volume);
  }

  protected doGetPosition(): Promise<number> {
    return Promise.resolve(this.seekOffset + Math.floor((this.timer.ms() / 1000)));
  }

  protected doGetDuration(): Promise<number> {
    return Promise.resolve(this.duration);
  }

  #fakeResume() {
    if (this.timer.isPaused()) {
      this.timer.resume();
    }
    else if (this.timer.isStopped() || !this.timer.isStarted()) {
      this.timer.start();
    }
    this.#startTimeout(this.duration - this.seekOffset);
    return Promise.resolve(true);
  }

  async #fakePlay(video: Video, position: number) {
    this.seekOffset = position;
    this.timer.stop();
    this.#resetTimeout();
    const info = await this.videoLoader.getInfo(video);
    this.logger.debug(`[FakePlayer] Video info for ${video.id}:`, info);
    if (info) {
      const duration = info.duration || 0;
      this.currentVideoId = video.id;
      this.currentVideoTitle = info.title;
      this.timer.start();
      this.#startTimeout(duration - this.seekOffset);
      this.duration = Number(duration);
      return true;
    }
    return false;
  }

  #fakePause() {
    this.timer.pause();
    this.#resetTimeout();
    return Promise.resolve(true);
  }

  #fakeStop() {
    this.seekOffset = 0;
    this.timer.stop().clear();
    this.#resetTimeout();
    return Promise.resolve(true);
  }

  #fakeSeek(position: number) {
    this.timer.stop().clear();
    this.seekOffset = position;
    this.#resetTimeout();
    if (this.status === PLAYER_STATUSES.PLAYING) {
      return Promise.resolve(this.#fakeResume());
    }
    return Promise.resolve(true);
  }

  #resetTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  #startTimeout(duration: number) {
    this.#resetTimeout();
    this.timeout = setTimeout(() => {
      void (async () => {
        await this.pause();
        this.seekOffset = 0;
        this.timer.stop().clear();
        this.logger.info('[FakePlayer] Playback ended. Moving to next in list...');
        await this.next();
      })();
    }, (duration + 1) * 1000);
  }

  #emitFakeState() {
    void (async () => {
      this.emit('fakeState', {
        status: this.status,
        videoId: this.currentVideoId,
        videoTitle: this.currentVideoTitle,
        duration: await this.getDuration(),
        position: await this.getPosition(),
        volume: await this.getVolume()
      });
    })();
  }

  on(event: 'fakeState', listener: (data: FakeState) => void): this;
  on(event: 'state', listener: (data: {AID: string, current: PlayerState, previous: PlayerState | null}) => void): this;
  on(event: string | symbol, listener: (...args: any[]) => void): this {
    super.on(event, listener);
    return this;
  }
}
