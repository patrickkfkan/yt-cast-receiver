class Player {

    async play(videoId, position) {
        throw new Error('[yt-cast-receiver.Player] play() not implemented!');
    }

    async resume() {
        throw new Error('[yt-cast-receiver.Player] play() not implemented!');
    }

    async pause() {
        throw new Error('[yt-cast-receiver.Player] pause() not implemented!');
    }

    async stop() {
        throw new Error('[yt-cast-receiver.Player] stop() not implemented!');
    }

    async seek(position, statusBeforeSeek) {
        throw new Error('[yt-cast-receiver.Player] seek() not implemented!');
    }

    async setVolume(volume) {
        throw new Error('[yt-cast-receiver.Player] setVolume() not implemented!');
    }

    async getVolume() {
        throw new Error('[yt-cast-receiver.Player] getVolume() not implemented!');
    }

    async getPosition() {
        throw new Error('[yt-cast-receiver.Player] getPosition() not implemented!');
    }

    async getDuration() {
        throw new Error('[yt-cast-receiver.Player] getDuration() not implemented!');
    }

    /**
     * Do not override the following functions unless you know what you're doing
     */

    setAppControl(appControl) {
        this._appControl = appControl;
    }

    notifyVolumeChanged() {
        return this._appControl.notifyVolumeChanged();
    }

    notifyPlayed() {
        return this._appControl.notifyPlayed();
    }

    notifyLoading() {
        return this._appControl.notifyLoading();
    }

    notifyPaused() {
        return this._appControl.notifyPaused();
    }

    notifyResumed() {
        return this._appControl.notifyResumed();
    }

    notifySeeked(playerStatus) {
        return this._appControl.notifySeeked(playerStatus);
    }

    notifyStopped() {
        return this._appControl.notifyStopped();
    }

    requestPlayNext() {
        return this._appControl.playNext();
    }

    requestPlayPrevious() {
        return this._appControl.playPrevious();
    }
   
}

Player.STATUS_PLAYING = 1;
Player.STATUS_PAUSED = 2;
Player.STATUS_LOADING = 3;
Player.STATUS_STOPPED = 4;

module.exports = Player;