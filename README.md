# yt-cast-receiver

A YouTube Cast Receiver for Node.

When your start the receiver, your device becomes discoverable and can be selected through the Cast button in the YouTube mobile app or website. When connected, the app or website acts as a remote control and issues commands to the receiver for controlling playback of videos (like Chromecast).

>Not all browsers support casting from the YouTube website. This module has been tested to work with the Chrome and Edge desktop browsers.

The receiver itself does not include a player. It is intended to be integrated into your application where you implement the player yourself. When the receiver receives a playback command from the YouTube mobile app or website (such as play, pause and seek), it will pass this command to your player. It is up to you to decide how you would handle these commands.

This project uses a [forked version](https://github.com/patrickkfkan/peer-dial) of [peer-dial](https://github.com/fraunhoferfokus/peer-dial) for DIAL server implementation and is heavily based on [TubeCast](https://github.com/enen92/script.tubecast).

# Installation

```
npm i yt-cast-receiver --save
```

# Usage

```
const ytcr = require('yt-cast-receiver');

// Your player implementation
const player = new MyPlayer();

// Create receiver instance with your player
const receiver = ytcr.instance(player);

// When a client connects
receiver.on('connected', client => {
    console.log(`Connected to ${client.name}`);
});

// When client disconnects
receiver.on('disconnected', client => {
    console.log(`Disconnected from ${client.name}`);
});

// Start the receiver
receiver.start();

// Your player implementation extends the Player class
class MyPlayer extends ytcr.Player {

    async play(videoId, position) {
        ...
        this.notifyPlayed();
    }

    async resume() {
        ...
        this.notifyResumed();
    }
    ...
}
```

# API

### `instance(player, options)`

Creates a receiver instance.

- `player`: Your player implementation
- `options`:
    - port: port on which to accept client requests (default: 3000)
    - corsAllowOrigins: `true` or `false` (default: `false` - no origin allowed)
    - prefix: access path (default: '/ytcr')
    - bindToInterfaces: Array<String> (default: `undefined` - bind to all network interfaces)
    - bindToAddresses: Array<String> (default: `undefined` - bind to all network addresses)
    - screenName
    - screenApp
    - defaultAutoplay: `true` or `false`. On connected, whether to enable autoplay if supported (default: `true`)
    - autoplayLoader: specify your own loader to retrieve the next video Id for autoplay
    - debug: `true` or `false`. Whether to output debug messages (default: `false`)

### `start()`

Starts the receiver.

### `stop()`

Stops the receiver.

### `on(event, listener)`

Fires `listener` on `event`.

| Event         | Description            | Data passed to `listener`  |
|---------------|------------------------|----------------------------|
|`started`      | Receiver is started    |                            |
|`stopped`      | Receiver is stopped    |                            |
|`connected`    | Client is connected    | Client info                |
|`disconnected` | Client is disconnected | Client info                |

### `off(event, listener)`

Detaches `listener` from `event`.

### `setDefaultAutoPlay(value)`

Sets the `defaultAutoplay` option at runtime.

### `setAutoplayLoader(loader)`

Sets the `autoplayLoader` option at runtime.

### `setDebug(value)`

Sets the `debug` option at runtime.

# Player

Refer to the [FakePlayer](example/fake-player.js) example, which uses a timer to simulate playback.

To begin with, create your player class by extending `ytcr.Player`:

```
const ytcr = require('yt-cast-receiver');

class MyPlayer extends ytcr.Player {
    ...
}
```

Then override the following functions:

```
// Play videoId starting at position
async play(videoId, position) {
    ...
    // When playback started
    await this.notifyPlayed();
}

// Resume paused playback
async resume() {
    ...
    // When playback resumed
    await this.notifyResumed();
}

// Pause playback
async pause() {
    ...
    // When playback paused
    await this.notifyPaused();
}

// Stop playback
async stop() {
    ...
    // When playback stopped
    await this.notifyStopped();
}

// Seek to position
async seek(position, statusBeforeSeek) {
    ...
    // After seeking
    await this.notifySeeked(statusBeforeSeek);
}

// Set volume
async setVolume(volume) {
    ...
    // After setting volume
    await this.notifyVolumeChanged();
}

// Get current volume
async getVolume() {
    ...
}

// Get current playback position
async getPosition() {
    ...
}

// Get duration of current playback
async getDuration() {
    ...
}
```

The `notify...` functions tell the receiver that it should update the client status following a change in the player state.

***Playing the next video***
It is the player's responsibility to tell the receiver to move on to the next video in the queue when the current video has finished playing:

```
...
// When current video has finished playing
await this.requestPlayNext();

```
The receiver will then tell the player to play the next video in the queue or, if there isn't any, the 'up next' video if autoplay is enabled.

> You can also tell the receiver to play the previous video in the list by calling `this.requestPlayPrevious()`

# Autoplay Loader

The default autoplay loader retrieves the 'up next' video Id through the following sources:

1. Mixes
2. Related videos, if mixes are not available

You can provide your own loader with the `autoplayLoader` option in `instance()` or call `setAutoplayLoader(loader)`. When implementing your own loader, you must provide the following function:

**`async function getUpNextVideoId(videoId, currentVideoIds)`**
- `videoId`: the video Id for which the 'up next' video Id is to be returned.
- `currentVideoIds`: an array of video Ids currently in the playlist / queue. Your implementation must ensure that the 'up next' video Id it returns is **not** among those in this list.


# Notes

- This module is work-in-progress and may not be reliable enough for production use
- The YouTube website is less featured than the YouTube mobile app as far as casting is concerned:
    - Autoplay is not supported
    - The receiver is not notified when videos are added to the queue. Hence, they will not be played even though they appear in the queue on the website.

# Changelog

0.1.0a
- Initial release