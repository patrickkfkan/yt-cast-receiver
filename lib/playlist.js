class Playlist {

    constructor() {
        this.ctt = null;
        this.id = null;
        this.videoIds = null;
        this.currentIndex = null;
    }

    getCurrentVideoId() {
        if (this.isEmpty()) {
            return null;
        }
        return this.videoIds[this.currentIndex];
    }

    getVideoIds() {
        return this.videoIds || [];
    }

    setCurrentIndex(index) {
        if (this.isEmpty() || index > this.length() - 1) {
            this.currentIndex = null;
        }
        else {
            this.currentIndex = index;
        }
    }

    getCurrentIndex() {
        return this.currentIndex;
    }

    isEmpty() {
        return this.videoIds ? false : true;
    }

    set(data) {
        if (data['ctt'] != undefined) {
            this.ctt = data['ctt'];
        }

        this.id = data['listId'];
        this.videoIds = data['videoIds'].split(',');
        this.currentIndex = parseInt(data['currentIndex'], 10);
    }

    update(data) {
        if (data['listId']) {
            this.id = data['listId'];
        }
        let videoIds = data['videoIds'];
        if (!videoIds) {
            this.videoIds = null;
            this.currentIndex = null;
            return;
        }
        this.videoIds = videoIds.split(',');
        if (this.currentIndex !== null && this.currentIndex >= this.length()) {
            this.currentIndex = this.length() - 1;
        }
    }

    append(videoId) {
        if (this.isEmpty()) {
            this.videoIds = [videoId];
        }
        else {
            this.videoIds.push(videoId);
        }
    }

    hasNext() {
        if (this.isEmpty()) {
            return false;
        }

        return this.currentIndex + 1 <= this.length() - 1;
    }

    hasPrevious() {
        if (this.isEmpty() || this.currentIndex === 0) {
            return false;
        }

        return this.currentIndex - 1 >= 0;
    }

    last() {
        if (this.isEmpty()) {
            return false;
        }
        
        this.currentIndex = this.length() - 1;
        return true;
    }

    isLast() {
        if (this.isEmpty()) {
            return null;
        }
        return this.currentIndex === this.length() - 1;
    }

    length() {
        if (this.isEmpty()) {
            return 0;
        }

        return this.videoIds.length;
    }

    getState() {
        if (this.isEmpty()) {
            return {};
        }

        return {
            'videoId': this.getCurrentVideoId(),
            'ctt': this.ctt,
            'listId': this.id,
            'currentIndex': `${this.currentIndex}`
        };
    }
}

module.exports = Playlist;