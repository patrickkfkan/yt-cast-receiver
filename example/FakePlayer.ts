import { Timer } from 'timer-node';
import ytdl from 'ytdl-core';
import { Player, PlayerState, PLAYER_STATUSES } from '../dist/mjs/index.js';

/**
 * Custom implementation of {@link Player} for use with {@link FakePlayerDemo}.
 * Uses a timer to simulate playback and [ytdl-core](https://github.com/fent/node-ytdl-core) for fetching video info.
 */
export default class FakePlayer extends Player {

  currentVideoId: string | null;
  currentVideoTitle: string | null;
  timer: Timer;
  seekOffset: number;
  duration: number;
  timeout: NodeJS.Timeout | null;
  volume: number;

  constructor() {
    super();
    this.currentVideoId = null;
    this.currentVideoTitle = null;
    this.timer = new Timer();
    this.seekOffset = 0;
    this.duration = 0;
    this.timeout = null;
    this.volume = 50;

    // When we receive a `state` event from the super class, signalling a change
    // In player state, we emit our own `fakeState` event for `FakeDemoPlayer` to consume.
    this.on('state', this.#emitFakeState.bind(this));
  }

  doPlay(videoId: string, position: number): Promise<boolean> {
    this.logger.info(`[FakePlayer]: Play ${videoId} at position ${position}s`);
    return this.#fakePlay(videoId, position);
  }

  doPause(): Promise<boolean> {
    this.logger.info('[FakePlayer]: Pause');
    return this.#fakePause();
  }

  doResume(): Promise<boolean> {
    this.logger.info('[FakePlayer]: Resume');
    return this.#fakeResume();
  }

  doStop(): Promise<boolean> {
    this.logger.info('[FakePlayer]: Stop');
    return this.#fakeStop();
  }

  doSeek(position: number): Promise<boolean> {
    this.logger.info(`[FakePlayer]: Seek to ${position}s`);
    return this.#fakeSeek(position);
  }

  async doSetVolume(volume: number): Promise<boolean> {
    this.volume = volume;
    return true;
  }

  async doGetVolume(): Promise<number> {
    return this.volume;
  }

  async doGetPosition(): Promise<number> {
    return this.seekOffset + Math.floor((this.timer.ms() / 1000));
  }

  async doGetDuration(): Promise<number> {
    return this.duration;
  }

  async #fakeResume() {
    if (this.timer.isPaused()) {
      this.timer.resume();
    }
    else if (this.timer.isStopped() || !this.timer.isStarted()) {
      this.timer.start();
    }
    this.#startTimeout(this.duration - this.seekOffset);
    return true;
  }

  async #fakePlay(videoId: string, position: number) {
    this.seekOffset = position;
    this.timer.stop();
    this.#resetTimeout();
    const info = await ytdl.getBasicInfo(videoId);
    const duration = parseInt(info.player_response.videoDetails.lengthSeconds, 10);
    this.currentVideoId = videoId;
    this.currentVideoTitle = info.player_response.videoDetails.title;
    this.timer.start();
    this.#startTimeout(duration - this.seekOffset);
    this.duration = Number(duration);
    return true;
  }

  async #fakePause() {
    this.timer.pause();
    this.#resetTimeout();
    return true;
  }

  async #fakeStop() {
    this.seekOffset = 0;
    this.timer.stop().clear();
    this.#resetTimeout();
    return true;
  }

  async #fakeSeek(position: number) {
    this.timer.stop().clear();
    this.seekOffset = position;
    this.#resetTimeout();
    if (this.status === PLAYER_STATUSES.PLAYING) {
      return this.#fakeResume();
    }
    return true;
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
      this.pause().then(() => {
        this.seekOffset = 0;
        this.timer.stop().clear();
        this.logger.info('[FakePlayer] Playback ended. Moving to next in list...');
        this.next();
      });
    }, (duration + 1) * 1000);
  }

  async #emitFakeState() {
    this.emit('fakeState', {
      status: this.status,
      videoId: this.currentVideoId,
      videoTitle: this.currentVideoTitle,
      duration: await this.getDuration(),
      position: await this.getPosition(),
      volume: await this.getVolume()
    });
  }

  on(event: 'fakeState', listener: (data: { status: number, videoTitle: string, position: number, duration: number, volume: number }) => void): this;
  on(event: 'state', listener: (data: {AID: string, current: PlayerState, previous: PlayerState | null}) => void): this;
  on(event: string | symbol, listener: (...args: any[]) => void): this {
    super.on(event, listener);
    return this;
  }
}
