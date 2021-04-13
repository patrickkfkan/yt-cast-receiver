const ytmpl = require('yt-mix-playlist');
const ytdl = require('ytdl-core');

let mixPlaylist, debug;

function setDebug(value) {
    debug = value ? true : false;
}

function _logDebug(message) {
    debug && console.log(message);
}

async function getUpNextVideoId(videoId, currentVideoIds) {
    _logDebug(`[yt-cast-receiver.autoplay] getUpNextVideoId(): Trying to obtain from mix playlist`);
    let upNextVideoId = await _getUpNextVideoIdFromMixPlaylist(videoId, currentVideoIds);
    if (upNextVideoId == null) {
        _logDebug(`[yt-cast-receiver.autoplay] getUpNextVideoId(): Trying to obtain from related videos`);
        upNextVideoId = await _getUpNextVideoIdFromRelatedVideos(videoId, currentVideoIds);
    }
    return upNextVideoId;
}

async function _getUpNextVideoIdFromMixPlaylist(videoId, currentVideoIds = []) {
    // Retain existing mix playlist if current selection matches 
    // specified videoId. Otherwise reinitialize the playlist.
    let retain = false;
    if (mixPlaylist) {
        let selected = mixPlaylist.getSelected();
        retain = (selected.id === videoId);
    }

    if (!retain) {
        mixPlaylist = await _fetchMixPlaylist(videoId);   
    }
    else {
        _logDebug(`[yt-cast-receiver.autoplay] Keeping current mix playlist for video Id ${videoId}`);
    }

    if (mixPlaylist) {
        let itemsAfterSelected = mixPlaylist.getItemsAfterSelected();
        let upNextVideo = itemsAfterSelected[0];

        if (!upNextVideo) {
            _logDebug(`[yt-cast-receiver.autoplay] No more items in mix playlist`);
        }
        else {
            let index = 0,
            maxPlaylistRefreshes = 5,
            playlistRefreshCount = 0;

            while (upNextVideo && currentVideoIds.indexOf(upNextVideo.id) >= 0) {
                _logDebug(`[yt-cast-receiver.autoplay] Current playlist already contains video ${upNextVideo.id}. Moving to next video in the mix playlist...`);
                index++;
                if (index > itemsAfterSelected.length - 1) {
                    _logDebug(`[yt-cast-receiver.autoplay] Reached end of current mix playlist`);
                    let hasMore = false;
                    if (playlistRefreshCount < maxPlaylistRefreshes) {
                        _logDebug(`[yt-cast-receiver.autoplay] Obtaining more mixes...`);
                        playlistRefreshCount++;
                        mixPlaylist = await mixPlaylist.selectLast();
                        if (mixPlaylist) {
                            itemsAfterSelected = mixPlaylist.getItemsAfterSelected();
                            if (!itemsAfterSelected) {
                                _logDebug(`[yt-cast-receiver.autoplay] No more items in mix playlist`);
                            }
                            else {                    
                                index = 0;
                                hasMore = true;
                            }
                        }
                        else {
                            _logDebug(`[yt-cast-receiver.autoplay] Could not obtain further mixes`);
                        }
                    }
                    else {
                        _logDebug(`[yt-cast-receiver.autoplay] Max refreshes reached`);
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
            _logDebug(`[yt-cast-receiver.autoplay] Up next video:`);
            _logDebug(upNextVideo);

            // Obtain updated mix playlist before returning result
            mixPlaylist = await mixPlaylist.select(upNextVideo.id);

            return upNextVideo.id;
        }
        else {
            _logDebug(`[yt-cast-receiver.autoplay] Could not obtain Up next video from mix playlist`);
            mixPlaylist = null;
            return null;
        }
    }
    else {
        _logDebug(`[yt-cast-receiver.autoplay] Could not obtain mix playlist for video Id ${videoId}`);
        return null;
    }
}

async function _fetchMixPlaylist(videoId) {
    _logDebug(`[yt-cast-receiver.autoplay] Fetching mix playlist for video Id ${videoId}`);
    try {
        return await ytmpl(videoId);
    } catch (error) {
        console.log(`[yt-cast-receiver.autoplay] An error occurred while fetching mix playlist for video Id ${videoId}: ${error}`);
        return null;
    }
}

async function _getUpNextVideoIdFromRelatedVideos(videoId, currentVideoIds) {
    let videoInfo, result;
    try {
        videoInfo = await ytdl.getInfo(videoId);
    } catch (error) {
        console.log(`[yt-cast-receiver.autoplay] An error occurred while fetching info for video Id ${videoId}: ${error}`);
        videoInfo = null;
    }
    if (videoInfo) {
        let relatedVideos = videoInfo.related_videos;
        if (Array.isArray(relatedVideos)) {
            for (let i = 0; i < relatedVideos.length; i++) {
                let rv = relatedVideos[i];
                if (rv && currentVideoIds.indexOf(rv.id) < 0) {
                    result = rv.id;
                    break;
                }
                else if (rv) {
                    _logDebug(`[yt-cast-receiver.autoplay] Current playlist already contains video ${rv.id}`);
                    if (i === relatedVideos.length - 1) {
                        _logDebug(`[yt-cast-receiver.autoplay] Reached end of related videos`);
                    }
                    else {
                        _logDebug(`[yt-cast-receiver.autoplay] Moving to next related video...`);
                    }
                }
            }
        }
        else {
            _logDebug(`[yt-cast-receiver.autoplay] No related videos found for video Id ${videoId}`);    
        }
    }
    if (result == undefined) {
        _logDebug(`[yt-cast-receiver.autoplay] Could not obtain Up next video from related videos`);
    }
    else {
        _logDebug(`[yt-cast-receiver.autoplay] Up next video Id: ${result} `);
    }
    return result || null;
}

module.exports = {
    getUpNextVideoId,
    setDebug
};