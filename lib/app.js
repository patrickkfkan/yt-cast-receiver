const queryString = require('query-string');
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
const removeNewline = require('newline-remove');
const LineByLineReader = require('line-by-line');
const AbortController = require('abort-controller');
const { v4: uuidv4 } = require('uuid');
const AsyncTaskQueue = require('async-task-queue');
const EventEmitter = require('events');
const Player = require('./player');
const Playlist = require('./playlist');
const defaultAutoplayLoader = require('./autoplay');

const YOUTUBE_BASE_URL = 'https://www.youtube.com';
const SCREEN_UID = 'c8277ac4-ke86-4f8b-8fe2-1236bef43397';
const DEFAULT_SCREEN_NAME = 'YouTube Cast Receiver';
const DEFAULT_SCREEN_APP = 'yt-cast-receiver';
const CMD_MATCH = /\[(\d+),\[\"(.+?)\"(?:,(.*?))?\]\]/g;
const STATE_RESET = {
    'duration': '0',
    'currentTime': '0',
    'cpn': 'foo',
    'loadedTime': '0',
    'state': '-1',
    'seekableEndTime': '0',
    'seekableStartTime': '0'
};
const AUTOPLAY_ENABLED = 'ENABLED';
const AUTOPLAY_DISABLED = 'DISABLED';
const AUTOPLAY_UNSUPPORTED = 'UNSUPPORTED';

class YouTubeApp {

    constructor(player, options = {}) {
        this.name = 'YouTube Cast Receiver App';
        this.allowStop = true,
        this.player = player;
        this.player.setAppControl({
            notifyPlayed: this.notifyPlayed.bind(this),
            notifyLoading: this.notifyLoading.bind(this),
            notifyPaused: this.notifyPaused.bind(this),
            notifyResumed: this.notifyResumed.bind(this),
            notifySeeked: this.notifySeeked.bind(this),
            notifyStopped: this.notifyStopped.bind(this),
            notifyVolumeChanged: this._reportVolume.bind(this),
            playNext: this._playNextInList.bind(this),
            playPrevious: this._playPreviousInList.bind(this)
        });
        this.keepAliveTimer = null;
        this.eventEmitter = new EventEmitter();
        this.screenName = options.screenName || DEFAULT_SCREEN_NAME;
        this.screenApp = options.screenApp || DEFAULT_SCREEN_APP;
        this.setDebug(options.debug);
        this.setDefaultAutoplay(options.defaultAutoplay);
        this.setAutoplayLoader(options.autoplayLoader || defaultAutoplayLoader);
        this._initAppState();
    }

    setDefaultAutoplay(value) {
        if (value != undefined) {
            this.defaultAutoplayMode = value ? AUTOPLAY_ENABLED : AUTOPLAY_DISABLED;
        }
        else {
            this.defaultAutoplayMode = AUTOPLAY_ENABLED;
        }
    }

    setDebug(value) {
        this.debug = value ? true : false;
        if (this.autoplayLoader && typeof this.autoplayLoader.setDebug == 'function') {
            this.autoplayLoader.setDebug(value);
        }
    }

    setAutoplayLoader(loader) {
        let useDefault = true;
        if (loader == undefined) {
            this._logDebug(`[yt-cast-receiver.YouTubeApp] No autoplay loader specified - use default`);
        }
        else if (typeof loader != 'object') {
            this._logDebug(`[yt-cast-receiver.YouTubeApp] Invalid autoplay loader specified - use default`);
        }
        else if (typeof loader.getUpNextVideoId != 'function') {
            this._logDebug('[yt-cast-receiver.YouTubeApp] Autoplay loader does not define function getUpNextVideoId() - use default')
        }
        else {
            useDefault = false;
        }

        this.autoplayLoader = useDefault ? defaultAutoplayLoader : loader;
        this.setDebug(this.debug);
    }

    _logDebug(message) {
        this.debug && console.log(message);
    }

    _initAppState() {
        this.state = 'stopped';
        this.pid = null;
        this.ofs = 0;
        this.screenId = null;
        this.loungeToken = null;
        this.bindVals = this._getAnnouncementTemplate();
        this.cmdCode = -1;
        this.connectedClient = null;
        this.currentIndex = 0;
        this.hasClient = false;
        this._replaceListener(null);
        this.playlist = new Playlist();
        this.upNext = null;
        this.playerStatus = Player.STATUS_STOPPED;
        this.autoplayMode = null;
    }

    async launch(data) {
        if (this.state !== 'stopped' && this.state !== 'stopping') {
            this._logDebug(`[yt-cast-receiver.YouTubeApp] launch() called while app is running. Stopping first...`);
            await this.stop(this.pid);
        }

        this._logDebug(`[yt-cast-receiver.YouTubeApp] Launching...`);

        let qs = queryString.parse(data);
        if (qs.pairingCode) {
            this.state = 'starting';
            await this._generateScreenId();
            await this._getLoungeTokenBatch();
            await this._bind();
            await this._registerPairingCode(qs.pairingCode);
            this._replaceListener(this._createListener());
            this.pid = uuidv4();
            this.state = 'running';
            this._startKeepAliveTimer();
            this._logDebug(`[yt-cast-receiver.YouTubeApp] Launched`);

            return this.pid;
        }
        else {
            throw new Error('[yt-cast-receiver.YouTubeApp] Unable to launch due to missing pairing code');
        }
    }

    async stop(pid, force = false) {
        if (this.pid !== pid && !force) {
            this._logDebug(`[yt-cast-receiver.YouTubeApp] stop() ignored - called with different pid.`);
            return;
        }

        if (this.state !== 'stopped' && this.state !== 'stopping') {
            this._logDebug(`[yt-cast-receiver.YouTubeApp] Stopping...`);
            this.state = 'stopping';
            await this._playerStop();
            await this._resetState();
            let disconnectedClient = this.connectedClient;
            this._clearKeepAliveTimer();
            this._initAppState();
            this.eventEmitter.emit('clientDisconnected', disconnectedClient);
            this._logDebug(`[yt-cast-receiver.YouTubeApp] Stopped`);
        }
    }

    on(eventName, listener) {
        this.eventEmitter.on(eventName, listener);
    }

    off(eventName, listener) {
        this.eventEmitter.off(eventName, listener);
    }

    async _generateScreenId() {
        let res = await fetch(`${YOUTUBE_BASE_URL}/api/lounge/pairing/generate_screen_id`);
        this.screenId = await res.text();
        this._logDebug(`[yt-cast-receiver.YouTubeApp] Generated screen Id: ${this.screenId}`);
    }

    async _getLoungeTokenBatch() {
        let params = new URLSearchParams({
            'screen_ids': this.screenId
        });
        let res = await fetch(`${YOUTUBE_BASE_URL}/api/lounge/pairing/get_lounge_token_batch`, {
            method: 'POST',
            body: params
        });
        let tokenInfo = await res.json();
        let token = tokenInfo['screens'][0]['loungeToken'];
        this._logDebug(`[yt-cast-receiver.YouTubeApp] Obtained lounge token: ${token}`);
        this.bindVals['loungeIdToken'] = this.loungeToken = token;
    }

    async _bind() {
        this._logDebug(`[yt-cast-receiver.YouTubeApp] Initiate binding...`);
        this.bindVals['CVER'] = '1';
        let params = new URLSearchParams({
            'count': '0'
        });

        let res = await fetch(`${YOUTUBE_BASE_URL}/api/lounge/bc/bind?${queryString.stringify(this.bindVals)}`, {
            method: 'POST',
            body: params
        });
        let bindInfo = await res.text();
        this._logDebug(`[yt-cast-receiver.YouTubeApp] Processing initial bind data...`);
        let cmds = this._parseCmd(bindInfo);
        for (let i = 0; i < cmds.length; i++) {
            await this._handleCmd(cmds[i]);
        }
    }

    _postBind(sc, postData) {
        let self = this;

        if (self.state === 'stop' || self.state === 'stopping') {
            return;
        }

        self._clearKeepAliveTimer();

        self.ofs++;

        let _postData = {
            'count': '1',
            'ofs': `${self.ofs}`,
            'req0__sc': sc
        };
        for (let [key, value] of Object.entries(postData)) {
            _postData['req0_' + key] = value;
        }

        self._logDebug(`[yt-cast-receiver.YouTubeApp] Posting bind data:`);
        self._logDebug(_postData);
        
        self.bindVals['RID'] = '1337';

        let url = `${YOUTUBE_BASE_URL}/api/lounge/bc/bind?${queryString.stringify(self.bindVals)}`;
        return fetch(url, {
            method: 'POST',
            body: new URLSearchParams(_postData)
        })
        .then( res => {
            if (self.state !== 'stopped' && self.state !== 'stopping') {
                self._startKeepAliveTimer();
            }
            self._logDebug(`[yt-cast-receiver.YouTubeApp] postBind() completed (ofs: ${_postData.ofs})`);
            return res.ok ? true : false
        })
        .catch( error => {
            if (self.state !== 'stopped' && self.state !== 'stopping') {
                self._startKeepAliveTimer();
            }
            console.log(`[yt-cast-receiver.YouTubeApp] Error occurred in _postBind()`);
            console.log(error);
            throw error;
        });
    }

    async _registerPairingCode(code) {
        let params = new URLSearchParams({
            'access_type': 'permanent',
            'app': this.screenApp,
            'pairing_code': code,
            'screen_id': this.screenId,
            'screen_name': this.screenName
        });
        
        this._logDebug(`[yt-cast-receiver.YouTubeApp] Registering pairing code with the following data:`);
        this._logDebug(params);

        let res = await fetch(`${YOUTUBE_BASE_URL}/api/lounge/pairing/register_pairing_code`, {
            method: 'POST',
            body: params
        });
        if (res.ok) {
            this._logDebug(`[yt-cast-receiver.YouTubeApp] Registered pairing code: ${code}`);
            return true;
        }
        else {
            console.log(`[yt-cast-receiver.YouTubeApp] Warning: failed to register pairing code: ${code}`);
            return false;
        }
    }

    _getAnnouncementTemplate() {
        return {
            'device': 'LOUNGE_SCREEN',
            'id': SCREEN_UID,
            'name': DEFAULT_SCREEN_NAME,
            'app': DEFAULT_SCREEN_APP,
            'theme': 'cl',
            'capabilities': 'que,atp,mus',
            'mdxVersion': '2',
            'loungeIdToken': '',
            'VER': '8',
            'v': '2',
            'RID': '1337',
            'AID': '42',
            'zx': 'xxxxxxxxxxxx',
            't': '1'
        };
    }

    _parseCmd(data) {
        let regex = RegExp(CMD_MATCH.source, CMD_MATCH.flags);

        // https://regex101.com/codegen?language=javascript
        let m, cmds = [];
        let _data = removeNewline(data);
        while ((m = regex.exec(_data)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            
            let cmd = {
                code: m[1],
                name: m[2]
            };
            if (m[3] !== undefined) {
                cmd.data = JSON.parse(`[${m[3]}]`);
                if (cmd.data.length === 1) {
                    cmd.data = cmd.data[0];
                }
            }
            cmds.push(cmd);
        }

        return cmds;
    }

    async _handleCmd(cmd) {

        let code = parseInt(cmd.code, 10),
            name = cmd.name,
            data = cmd.data;

        if (code <= this.cmdCode) {
            this._logDebug(`[yt-cast-receiver.YouTubeApp] Command #${code} - '${name}' already handled - ignoring...`);
            return;
        }
        
        this.cmdCode = code;
        
        if (name === 'c') { // C cmd received
            this._logDebug(`[yt-cast-receiver.YouTubeApp] Command #${code} - ${name} received with the following data:`);
            this._logDebug(data);
            this._logDebug(`[yt-cast-receiver.YouTubeApp] Setting SID to ${data[0]}`);
            this.bindVals['SID'] = data[0];
        }
        else if (name === 'S') { // Session established received
            this._logDebug(`[yt-cast-receiver.YouTubeApp] Command #${code} - ${name} received with the following data (gsessionid):`);
            this._logDebug(data);
            this.bindVals['gsessionid'] = data;
        }
        else if (name === 'remoteConnected') {
            if (JSON.stringify(this.connectedClient) !== JSON.stringify(data)) {
                this._logDebug(`[yt-cast-receiver.YouTubeApp] Command #${code} - ${name} received with the following client data:`);
                this._logDebug(data);
                let capabilities = data.capabilities.split(',');
                if (capabilities.indexOf('atp') < 0) {
                    this._logDebug(`[yt-cast-receiver.YouTubeApp] Client does not have autoplay capability. Autoplay support disabled.`);
                    await this._setAutoplayMode(AUTOPLAY_UNSUPPORTED);
                }
                else {
                    await this._setAutoplayMode(this.defaultAutoplayMode);
                }
                this.connectedClient = data;
                this.eventEmitter.emit('clientConnected', this.connectedClient);
            }
            else {
                this._logDebug(`[yt-cast-receiver.YouTubeApp] Command #${code} - '${name}' received with same client`);
            }
        }
        else if (name === 'remoteDisconnected') {
            this._logDebug(`[yt-cast-receiver.YouTubeApp] Command #${code} - ${name} received. Resetting app state...`);
            this._logDebug(data);
            await this.stop(this.pid);
        }
        else if (name === 'getNowPlaying') {
            this._logDebug(`[yt-cast-receiver.YouTubeApp] Command #${code} - ${name} received. Report 'now playing'...`);
            await this._reportNowPlaying();
        }
        else if (name === 'setPlaylist') {
            this._logDebug(`[yt-cast-receiver.YouTubeApp] Command #${code} - ${name} received with the following data:`);
            this._logDebug(data);
            this.playlist.set(data);
            if (this.playerStatus !== Player.STATUS_STOPPED) {
                this._logDebug(`[yt-cast-receiver.YouTubeApp] Requesting player to stop current playback`);
                await this._playerStop();
            }
            this._logDebug(`[yt-cast-receiver.YouTubeApp] Requesting player to play video ID ${this.playlist.getCurrentVideoId()} at position ${data['currentTime'] || 0}s`);
            await this._playCurrentInList(false, parseInt(data['currentTime'], 10) || 0);
        }
        else if (name === 'updatePlaylist') {
            this._logDebug(`[yt-cast-receiver.YouTubeApp] Command #${code} - ${name} received with the following data:`);
            this._logDebug(data);
            this.playlist.update(data);
            if (this.playlist.isEmpty()) {
                await this._playerStop();
            }
            if (this.playlist.isEmpty() || !this.playlist.isLast()) {
                await this._clearAutoplayUpNext();
            }
        }
        else if (name === 'next') {
            this._logDebug(`[yt-cast-receiver.YouTubeApp] Command #${code} - ${name} received`);
            await this._playNextInList();
        }
        else if (name === 'previous') {
            this._logDebug(`[yt-cast-receiver.YouTubeApp] Command #${code} - ${name} received`);
            await this._playPreviousInList();
        }
        else if (name ==='pause') {
            this._logDebug(`[yt-cast-receiver.YouTubeApp] Command #${code} - ${name} received`);
            await this._playerPause();
        }
        else if (name === 'stopVideo') {
            this._logDebug(`[yt-cast-receiver.YouTubeApp] Command #${code} - ${name} received`);
            await this._playerStop();
        }
        else if (name === 'seekTo') {
            this._logDebug(`[yt-cast-receiver.YouTubeApp] Command #${code} - ${name} received. Requesting player to seek to ${data['newTime']}s...`);
            await this._playerSeek(parseInt(data['newTime'], 10));
        }
        else if (name === 'getVolume') {
            this._logDebug(`[yt-cast-receiver.YouTubeApp] Command #${code} - ${name} received. Reporting volume...`);
            await this._reportVolume();
        }
        else if (name === 'setVolume') {
            this._logDebug(`[yt-cast-receiver.YouTubeApp] Command #${code} - ${name} received. Requesting player to set volume to ${data['volume']}...`);
            let newVolume = parseInt(data['volume'], 10);
            let currentVolume = await this.player.getVolume();
            if (newVolume != currentVolume) {
                await this.player.setVolume(newVolume);
            }
        }
        else if (name === 'play') {
            this._logDebug(`[yt-cast-receiver.YouTubeApp] Command #${code} - ${name} received.`);
            await this._playerResume();
        }
        else if (name === 'setAutoplayMode') {
            this._logDebug(`[yt-cast-receiver.YouTubeApp] Command #${code} - ${name} received. Setting autoplay mode to ${data.autoplayMode}`);
            await this._setAutoplayMode(data.autoplayMode);
        }
        else {
            this._logDebug(`[yt-cast-receiver.YouTubeApp] Command #${code} - ${name} received but not going to be handled. Skipping...`);
            if (data) {
                this._logDebug('Unhandled data:');
                this._logDebug(data);
            }
        }
    }

    _replaceListener(listener) {
        if (this.listener) {
            this.listener.stop();
        }
        this.listener = listener;
        if (listener) {
            listener.start();
        }
    }

    _createListener() {
        let self = this;
        let listener = new CommandListener(self);
        listener.onConnectionFailed( () => {
            // if listener cannot establish connection, then assume link
            // is lost and stop the app.
            self.stop();
        });
        return listener;
    }

    async _playerResume() {
        if (this.playerStatus === Player.STATUS_PLAYING) {
            return;
        }
        if (this.playerStatus === Player.STATUS_PAUSED) {
            await this.player.resume();
        }
        else if (!this.playlist.isEmpty()) {
            await this._playCurrentInList(true);
        }
    }

    async _playerSeek(position) {
        let statusBeforeSeek = this.playerStatus;
        await this.notifyLoading();
        await this.player.seek(position, statusBeforeSeek);
    }

    async _playerPause() {
        if (this.playerStatus === Player.STATUS_PLAYING) {
            this._logDebug(`[yt-cast-receiver.YouTubeApp] Requesting player to pause playback...`);
            await this.player.pause();
        }
    }

    async _playerStop() {
        if (this.playerStatus !== Player.STATUS_STOPPED) {
            this._logDebug(`[yt-cast-receiver.YouTubeApp] Requesting player to stop playback...`);
            await this.player.stop();
        }
    }

    async _playPreviousInList() {
        if (!this.playlist.hasPrevious()) {
            this._logDebug(`[yt-cast-receiver.YouTubeApp] No previous video in list`);
            await this._playerStop();
            await this._resetState();
            return;
        }
        await this._playListAt(this.playlist.getCurrentIndex() - 1);
    }

    async _playNextInList() {
        if (!this.playlist.hasNext()) {
            this._logDebug(`[yt-cast-receiver.YouTubeApp] No next video in list`);
            if (this.isAutoplayEnabled() && this.upNext) {
                await this._autoplayUpNext();
            }
            else {
                await this._playerStop();
                await this._resetState();
            }
            return;
        }
        await this._playListAt(this.playlist.getCurrentIndex() + 1);
    }

    async _playListAt(index) {
        if (index !== this.playlist.getCurrentIndex()) {
            this.playlist.setCurrentIndex(index);
            await this._playCurrentInList(true);
        }
        else {
            await this._playCurrentInList(false);
        }
    }

    async notifyPlayed() {
        this.playerStatus = Player.STATUS_PLAYING;
        await this._createTaskQueuePromise([
            () => this._reportNowPlaying(),
            () => this._reportStateChanged(),
            () => this._refreshAutoplayUpNext()
        ]);
    }

    async notifyPaused() {
        this.playerStatus = Player.STATUS_PAUSED;
        await this._reportStateChanged();
    }

    async notifyResumed() {
        this.playerStatus = Player.STATUS_PLAYING;
        await this._createTaskQueuePromise([
            () => this._reportNowPlaying(),
            () => this._reportStateChanged()
        ]);
    }

    async notifySeeked(playerStatus) {
        this.playerStatus = playerStatus;
        await this._reportStateChanged();
    }

    async notifyStopped() {
        this.playerStatus = Player.STATUS_STOPPED;
        await this._reportStateChanged();
    }

    async notifyLoading() {
        this.playerStatus = Player.STATUS_LOADING;
        await this._reportStateChanged();
    }

    async _autoplayUpNext() {
        if (!this.isAutoplayEnabled() || !this.upNext) {
            return;
        }

        this._logDebug(`[yt-cast-receiver.YouTubeApp] Autoplay up next...`);
        if (this.isAutoplayEnabled() && this.upNext) {
            this._moveUpNextToPlaylist();
            this.playlist.last();
            await this._playCurrentInList(false);
        }
    }

    async _reportNowPlaying() {
        if (this.playlist.isEmpty()) { 
            await this._postBind('noop', {});
            return;
        }

        let [position, duration] = await Promise.all([
            this.player.getPosition(),
            this.player.getDuration()
        ]);
        let playlistState = this.playlist.getState();

        let np = {
            'currentTime': `${position}`,
            'duration': `${duration}`,
            'cpn': 'foo',
            'loadedTime': '0',
            'state': `${this.playerStatus}`,
            'seekableStartTime': '0',
            'seekableEndTime': `${duration}`,
            'listId': `${playlistState.listId}`,
            'videoId': `${playlistState.videoId}`,
            'currentIndex': `${playlistState.currentIndex}`
        };

        await this._postBind('nowPlaying', np);
    }

    async _reportVolume() {
        if (this.playlist.isEmpty()) {
            await this._postBind('noop', {});
            return; 
        }

        let volume = await this.player.getVolume();
        await this._postBind('onVolumeChanged', {
            'volume': `${volume}`,
            'muted': 'false'
        });
    }

    async _setAutoplayMode(mode) {
        let oldMode = this.autoplayMode;
        this.autoplayMode = mode;

        await this._postBind('onAutoplayModeChanged', { 'autoplayMode': mode })

        if (oldMode !== mode) {
            await this._refreshAutoplayUpNext();
        }
    }

    async _refreshAutoplayUpNext() {
        this._logDebug('[yt-cast-receiver.YouTubeApp] Refresh autoplay Up Next')
        if (this.isAutoplayEnabled() && this.playlist.isLast()) {
            let currentVideoId = this.playlist.getCurrentVideoId();
            this._logDebug(`[yt-cast-receiver.YouTubeApp] Current Up Next:`);
            this._logDebug(this.upNext);
            this._logDebug(`[yt-cast-receiver.YouTubeApp] Current video Id: ${currentVideoId}`);
            if (!this.upNext || this.upNext.forVideoId !== currentVideoId) {
                this._logDebug(`[yt-cast-receiver.YouTubeApp] Updating autoplay Up Next...`);
                let upNextVideoId = await this.autoplayLoader.getUpNextVideoId(currentVideoId, this.playlist.getVideoIds());
                if (upNextVideoId != null) {
                    this.upNext = {
                        videoId: upNextVideoId,
                        forVideoId: currentVideoId
                    };
                }
                else {
                    this._logDebug(`[yt-cast-receiver.YouTubeApp] No Up Next video found`);
                    this.upNext = null;
                }
            }
        }
        else {
            this.upNext = null;
        }

        await this._postBind('autoplayUpNext', this.upNext ? { videoId: this.upNext.videoId } : {});
    }

    async _clearAutoplayUpNext() {
        this._logDebug(`[yt-cast-receiver.YouTubeApp] Clearing autoplay Up Next...`);
        this.upNext = null;
        await this._postBind('autoplayUpNext', {});
    }

    isAutoplayEnabled() {
        return this.autoplayMode === AUTOPLAY_ENABLED;
    }

    async _reportStateChanged() {
        this._logDebug(`[yt-cast-receiver.YouTubeApp] Reporting change in player state...`);
        
        let [position, duration] = await Promise.all([
            this.player.getPosition(),
            this.player.getDuration()
        ]);
        
        let state = {
            'currentTime': `${position}`,
            'duration': `${duration}`,
            'cpn': 'foo',
            'loadedTime': '0',
            'state': `${this.playerStatus}`,
            'seekableStartTime': '0',
            'seekableEndTime': `${duration}`
        };

        await this._postBind('onStateChange', state);
    }

    async _moveUpNextToPlaylist() {
        if (this.upNext == null) {
            return;
        }

        this.playlist.append(this.upNext.videoId);
        this.playlist.last();
        let state = this.playlist.getState();

        let ops = [
            () => this._postBind('autoplayUpNext', {}),
            () => this._postBind('playlistModified', {
                videoId: state.videoId,
                listId: state.listId,
                currentIndex: state.currentIndex
            })
        ];

        await this._createTaskQueuePromise(ops);
    }

    async _playCurrentInList(loadSequence, position = 0) {
        let playlistState = this.playlist.getState();
        if (!playlistState.videoId) {
            return;
        }

        if (!loadSequence) {
            let ops = [
                this.notifyLoading(),
                this.player.play(playlistState.videoId, position)
            ];
            await Promise.all(ops);
            return;
        }

        // Start 'loading' -> 'play' sequence
        // This is actually not required when casting from the YouTube mobile app.
        // But when casting from YouTube website on the desktop, if you don't do
        // the following the page won't get updated to show the current video.
        // (The sequence of postBinds is observed from my Samsung TV)
        let duration = await this.player.getDuration();
        let endTime = duration + 1;

        let stateCurrentEnd = {
            'currentTime': `${endTime}`,
            'cpn': 'foo',
            'duration': `${duration}`,
            'loadedTime': '0',
            'state': '0',
            'seekableEndTime': `${duration}`,
            'seekableStartTime': '0'
        }

        let stateCurrentEnd2 = Object.assign({}, stateCurrentEnd, { 'seekableEndTime': '0' });

        let nowPlaying = {
            'duration': '0',
            'listId': playlistState.listId,
            'currentTime': '0',
            'loadedTime': '0',
            'videoId': playlistState.videoId,
            'state': `${Player.STATUS_LOADING}`,
            'currentIndex': playlistState.currentIndex,
            'seekableStartTime': '0',
            'seekableEndTime': '0'
        }       

        let stateLoading = Object.assign({}, STATE_RESET, { state: `${Player.STATUS_LOADING}` });

        let ops = [
            () => this._postBind('onStateChange', stateCurrentEnd),
            () => this._postBind('onHasPreviousNextChanged', {
                'hasPrevious': 'false', 'hasNext': 'false'
            }),
            () => this._postBind('autoplayUpNext', {}),
            () => this._postBind('onStateChange', stateCurrentEnd2),
            () => this._postBind('nowPlaying', nowPlaying),
            () => this._resetState(),
            () => this._postBind('onStateChange', stateLoading),
            () => this.player.play(playlistState.videoId, 0)
        ];

        await this._createTaskQueuePromise(ops);
    }

    async _resetState() {
        await this._postBind('onStateChange', STATE_RESET);
    }

    _clearKeepAliveTimer() {
        if (this.keepAliveTimer) {
            clearInterval(this.keepAliveTimer);
            this.keepAliveTimer = null;
        }
    }

    _startKeepAliveTimer() {
        let self = this;
        self._clearKeepAliveTimer();
        self.keepAliveTimer = setInterval( async () => {
            // My Samsung TV sends a 'nowPlaying' notification roughly
            // every 20 seconds, so we do it here too.
            self._logDebug(`[yt-cast-receiver.YouTubeApp] Keeping alive...`);
            await self._reportNowPlaying();
            /*let state = self.playlist.getState();
            let position = await self.player.getPosition();
            let duration = await self.player.getDuration();
            let nowPlaying = {
                'currentTime': `${position}`,
                'duration': `${duration}`,
                'loadedTime': '0',
                'state': `${self.playerStatus}`,
                'seekableStartTime': '0',
                'seekableEndTime': `${duration}`,
                'listId': state.listId || '',
                'videoId': state.videoId || '',
                'currentIndex': state.currentIndex || '0',
            }
            await self._postBind('nowPlaying', nowPlaying);*/
        }, 20000);
    }

    _createTaskQueuePromise(tasks) {
        return new Promise( (resolve, reject) => {
            let q = new AsyncTaskQueue();
            for (let i = 0; i < tasks.length; i++) {
                q.enqueue( async (next) => {
                    let error = null;
                    try {
                        await tasks[i]();
                    } catch (e) {
                        error = e;
                    }
                    if (error) {
                        reject(error);
                    }
                    else if (q.queue.length > 0) {
                        next();
                    }
                    else {
                        resolve();
                    }
                });
            }
        });
    }
}

class CommandListener {

    constructor(app) {
        this.app = app;
        this.stopped = false;
        this.abortController = new AbortController();
        this.reconnects = 0;
        this.MAX_RECONNECTS = 5;
        this.commandQueue = new AsyncTaskQueue();
    }

    _logDebug(message) {
        this.app._logDebug(message);
    }

    _listen() {
        let self = this;
        let bv = Object.assign({}, self.app.bindVals, {
            'RID': 'rpc',
            'CI': '0',
            'TYPE': 'xmlhttp',
            'AID': '3'
        });

        let url = `${YOUTUBE_BASE_URL}/api/lounge/bc/bind?${queryString.stringify(bv)}`;
        self._logDebug(`[yt-cast-receiver.CommandListener] Listening to: ${url}`);
        fetch(url, {
            signal: self.abortController.signal
        })
        .then( res => {
            if (res.ok) {
                self.reconnects = 0;
                let reader = new LineByLineReader(res.body, {
                    encoding: 'utf8',
                    skipEmptyLines: true
                });
                reader.on('error', error => {
                    if (error.name === 'AbortError') {
                        self._logDebug('[yt-cast-receiver.CommandListener] Connection closed by external call');
                    }
                    else {
                        console.log(`[yt-cast-receiver.CommandListener] Error: ${error}`);
                    }
                });
                reader.on('line', async (line) => {
                    if (!self.stopped) {
                        let cmds = self.app._parseCmd(line);
                        for (let i = 0; i < cmds.length; i++) {
                            self.commandQueue.enqueue( async (next) => {
                                await self.app._handleCmd(cmds[i]);
                                next();
                            });
                        }
                    }
                });
                reader.on('end', () => {
                    self._logDebug(`[yt-cast-receiver.CommandListener] Connection closed`);
                    if (!self.stopped) {
                        self._logDebug(`[yt-cast-receiver.CommandListener] Reconnecting...`);
                        self._listen();
                    }
                });
            }
            else {
                console.log(`[yt-cast-receiver.CommandListener] Connection error: ${res.status}`);
                self.reconnects++;
                if (self.reconnects > self.MAX_RECONNECTS) {
                    console.log(`[yt-cast-receiver.CommandListener] Max reconnects exceeded - not going to reconnect`);
                    self.stopped = true;
                    if (self.connFailedCallback) {
                        self.connFailedCallback();
                    }
                }
                else if (!self.stopped) {
                    self._logDebug(`[yt-cast-receiver.CommandListener] Reconnecting...`);
                    self._listen();
                }
            }
        })
        .catch( error => {
            if (error.name === 'AbortError') {
                self._logDebug('[yt-cast-receiver.CommandListener] Connection closed by external call - not going to reconnect.');
            }
            else {
                throw error;
            }
        });
    }

    onConnectionFailed(callback) {
        this.connFailedCallback = callback;
    }

    start() {
        this._logDebug(`[yt-cast-receiver.CommandListener] Started`);
        this._listen();
    }

    stop() {
        if (!this.stopped) {
            this.stopped = true;
            this.abortController.abort();
            this.commandQueue.queue = [];
            this.commandQueue.isExecuting = false;
            this._logDebug(`[yt-cast-receiver.CommandListener] Stopped by external call`);
        }
    }
}

module.exports = YouTubeApp;