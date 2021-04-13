const Player = require('../lib').Player;
const ytdl = require('ytdl-core');
const { Timer } = require('timer-node');

class FakePlayer extends Player {

    constructor() {
        super();
        this.currentVideoId = null;
        this._initFakePlayerProps();
    }

    async play(videoId, position = 0) {
        console.log(`[FakePlayer]: Play ${videoId} at position ${position}s`);
        await this._fakePlay(videoId, position);
        await this.notifyPlayed();
    }

    async pause() {
        console.log(`[FakePlayer]: Pause`);
        await this._fakePause();
        await this.notifyPaused();
    }

    async resume() {
        console.log(`[FakePlayer]: Resume`);
        await this._fakeResume();
        await this.notifyResumed();
    }

    async stop() {
        console.log(`[FakePlayer]: Stop`);
        await this._fakeStop();
        await this.notifyStopped();
    }

    async seek(position, statusBeforeSeek) {
        console.log(`[FakePlayer]: Seek to ${position}s`);
        await this._fakeSeek(position, statusBeforeSeek);
        await this.notifySeeked(statusBeforeSeek);
    }

    async getVolume() {
        return this.volume;
    }

    async setVolume(volume) {
        this.volume = volume;
        await this.notifyVolumeChanged();
    }

    async getPosition() {
        if (this.timer.time()) {
            return this.seekOffset + this.timer.time().s;
        }
        else {
            return this.seekOffset;
        }
    }

    async getDuration() {
        return this.duration;
    }

    _initFakePlayerProps() {
        this.timer = new Timer();
        this.seekOffset = 0;
        this.duration = 0;
        this.timeout = null;
        this.volume = 50;
    }

    async _fakeResume() {
        if (this.timer.isPaused()) {
            this.timer.resume();
        }
        else if (this.timer.isStopped()) {
            this.timer.start();
        }
        this._startTimeout(this.duration - this.seekOffset);
    }

    async _fakePlay(videoId, position) {
        this.seekOffset = position;
        this.timer.stop();
        this._resetTimeout();
        let info = await ytdl.getBasicInfo(videoId);
        let duration = info.player_response.videoDetails.lengthSeconds;
        this.currentVideoId = videoId;
        this.timer.start();
        this._startTimeout(duration - this.seekOffset);
        this.duration = Number(duration);
    }

    async _fakePause() {
        this.timer.pause();
        this._resetTimeout();
    }

    async _fakeStop() {
        this.seekOffset = 0;
        this.timer.stop().clear();
        this._resetTimeout();
    }

    async _fakeSeek(position, statusBeforeSeek) {
        this.timer.stop().clear();
        this.seekOffset = position;
        this._resetTimeout();
        if (statusBeforeSeek === Player.STATUS_PLAYING) {
            console.log(`[FakePlayer]: Resuming playback after seek`);
            this.timer.start();
            let duration = await this.getDuration();
            this._startTimeout(duration - this.seekOffset);
        }
    }

    _resetTimeout() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }

    _startTimeout(duration) {
        let self = this;
        self._resetTimeout();
        self.timeout = setTimeout( () => {
            self.pause().then( () => {
                self.seekOffset = 0;
                self.timer.stop().clear();
                console.log('Playback ended. Moving to next in list...');
                self.requestPlayNext();
            });           
        }, (duration + 1) * 1000);
    }
}

module.exports = FakePlayer;