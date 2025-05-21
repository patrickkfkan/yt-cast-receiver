<a href='https://ko-fi.com/C0C5RGOOP' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi2.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

# yt-cast-receiver

A YouTube Cast Receiver for Node that also supports casting from YouTube Music. Originally inspired by [TubeCast](https://github.com/enen92/script.tubecast).

### Terminology

**Sender**

An app that initiates a Cast session and acts as a remote controller for playback of content on the *receiver*. In the context of YouTube casting, a sender can be the YouTube mobile app or the YouTube website. Likewise, for YouTube Music, the sender can be the YouTube Music app or website.

> Not all browsers support casting from the YouTube (Music) website. This module has been tested to work with the Chrome and Edge desktop browsers.

**Receiver**

An app that receives and responds to commands from a sender, plays content through a *player*, and provides status updates to senders.

---

`yt-cast-receiver` plays the role of the receiver in the context of YouTube casting, but does not include a player. It is intended to be integrated into your application where you implement the player yourself. When the receiver receives a playback command from a sender (such as play, pause and seek), it will pass this command to your player. It is up to you to decide how you would handle these commands.

The module includes a *DIAL server* for broadcasting the receiver device on the network. Users may then initiate a Cast session with the receiver through the sender app's Cast button.

*This project is (always) work-in-progress and may not be reliable enough for production use.*

# Installation

```
npm i yt-cast-receiver --save
```

# Usage

## Basic Usage

### 1. Implement player

First, implement your player by extending the `Player` class:
```
// ESM
import { Player } from 'yt-cast-receiver';
// or CJS
const { Player } = require('yt-cast-receiver');

class MyPlayer extends Player {
  ...
}
```

The methods you need to implement are:

<details>
<summary><code>doPlay(video, position): Promise&lt;boolean&gt;</code></summary>
<br />
<p>Implementations shall play the target video from the specified position.</p>

**Params**
- `video`: (object) target video to play; [object properties](#videos).
- `position`: (number) the position, in seconds, from which to start playback.

**Returns**
<br />
<p>Promise that resolves to `true` on successful playback; `false` otherwise.</p>
</details>

<details>
<summary><code>doPause(): Promise&lt;boolean&gt;</code></summary>
<br />
<p>Implementations shall pause current playback.</p>

**Returns**
<br />
<p>Promise that resolves to `true` when playback was paused; `false` otherwise.</p>
</details>

<details>
<summary><code>doResume(): Promise&lt;boolean&gt;</code></summary>
<br />
<p>Implementations shall resume paused playback.</p>

**Returns**
<br />
<p>Promise that resolves to `true` when playback was resumed; `false` otherwise.</p>
</details>

<details>
<summary><code>doStop(): Promise&lt;boolean&gt;</code></summary>
<br />
<p>Implementations shall stop current playback or cancel any pending playback (such as when a video is still being loaded).</p>

**Returns**
<br />
<p>Promise that resolves to `true` when playback was stopped or pending playback was cancelled; `false` otherwise.</p>
</details>

<details>
<summary><code>doSeek(position): Promise&lt;boolean&gt;</code></summary>
<br />
<p>Implementations shall seek to the specified position.<p>

**Params**
- `position`: (number) the position, in seconds, to seek to.

**Returns**
<br />
<p>Promise that resolves to `true` if seek operation was successful; `false` otherwise.</p>
</details>

<details>
<summary><code>doSetVolume(volume): Promise&lt;boolean&gt;</code></summary>
<br />
<p>Implementations shall set the volume level and muted state to the values specified in the <code>volume</code> object param.</p>

**Params**
- `volume`: (object)
  - `level`: (number) volume level between 0-100.
  - `muted`: (boolean) muted state.

**Returns**
<br />
<p>Promise that resolves to `true` when volume was set; `false` otherwise.</p>
</details>

<details>
<summary><code>doGetVolume(): Promise&lt;<code>Volume</code>&gt;</code></summary>
<br />
<p>Implementations shall return the current volume level and muted state.</p>

**Returns**
<p>

Promise that resolves to an object that satifies the [Volume](./docs/api/interfaces/Volume.md) interface constraint:

- `level`: (number) volume level between 0-100.
- `muted`: (boolean) muted state.
</p>

</details>

<details>
<summary><code>doGetPosition(): Promise&lt;number&gt;</code></summary>
<br />
<p>Implementations shall return the current playback position.</p>

**Returns**
<p>Promise that resolves to the current playback position (in seconds).</p>
</details>

<details>
<summary><code>doGetDuration(): Promise&lt;number&gt;</code></summary>
<br />
<p>Implementations shall return the duration of the current video.</p>

**Returns**
<p>Promise that resolves to the duration of the current video (in seconds).</p>
</details>

### 2. Create receiver instance

Once you have implemented your player, you create a `YouTubeCastReceiver` instance with it:

```
// ESM
import YouTubeCastReceiver from 'yt-cast-receiver';
// or CJS
const YouTubeCastReceiver = require('yt-cast-receiver');

// Your player implementation
const player = new MyPlayer();

// Create receiver instance with your player
const receiver = new YouTubeCastReceiver(player, [options]);
```

<details>
<summary><code>YouTubeCastReceiver</code> options</summary>
<br />

You can configure the `YouTubeCastReceiver` instance by passing options to its constructor. All options are optional.

(Object)
- `app`: (object) receiver app options
  - `playlistRequestHandler`: `PlaylistRequestHandler` implementation (default: `DefaultPlaylistRequestHandler` instance) - see [Player Queue](#player-queue).
  - `enableAutoplayOnConnect`: (boolean) whether to enable autoplay on sender app when it connects (default: `true`).
  - `mutePolicy`: (string) one of [Constants.MUTE_POLICIES](#constants) (default: AUTO). See [Mute Policy](#mute-policy).
  - `resetPlayerOnDisconnectPolicy`: (string) one of [Constants.RESET_PLAYER_ON_DISCONNECT_POLICIES](#constants) (default: ALL_DISCONNECTED). See [Reset Player On Disconnect Policy](#reset-player-on-disconnect-policy).
  - `screenApp`: (string) defaults to 'ytcr'.
- `dial`: (object) DIAL server options
  - `bindToAddresses`: Array<`string`> (default: `undefined` - bind to all network addresses).
  - `bindToInterfaces`: Array<`string`> (default: `undefined` - bind to all network interfaces).
  - `corsAllowOrigins`: (boolean) defaults to `false` - no origin allowed.
  - `port`: (number) port on which to accept requests (default: 3000).
  - `prefix`: (string) access path (default: '/ytcr').
- `device`: (object) Info about the receiver device
  - `name`: (string) name shown in a sender app's Cast menu, when the receiver device is discovered through DIAL. Defaults to hostname of the receiver device.
  - `screenName`: (string) name shown in a sender app's Cast menu, when the receiver device was previously connected to through [manual pairing](#manual-pairing). Defaults to 'YouTube on `device.name`'.
  - `brand`: (string) defaults to 'Generic'.
  - `model`: (string) defaults to 'SmartTV'.
- `dataStore`: `DataStore` implementation (default: `DefaultDataStore` instance) - see [DataStore](#datastore).
- `logger`: `Logger` implementation (default: `DefaultLogger` instance) - see [Logging](#logging).
- `logLevel`: one of [Constants.LOG_LEVELS](#constants) (default: INFO).
</details>

### 3. Start receiver

Once you have created a receiver instance with your player implementation, you can register event listeners and begin accepting Cast requests from senders:

```
// When a sender connects
receiver.on('senderConnect', (sender) => {
  console.log(`Connected to ${sender.name}`);
});

// When a sender disconnects
receiver.on('senderDisconnect', (sender, implicit) => {
  console.log(`Disconnected from ${sender.name}.`);

  // `yt-cast-receiver` supports multiple sender connections. Call
  // `getConnectedSenders()` to obtain info about them.
  console.log(`Remaining connected senders: ${receiver.getConnectedSenders().length}`);
});

// Start the receiver
try {
  await receiver.start();
}
catch (error) {
  ...
}
```

> In `senderDisconnect` event, the `implicit` flag indicates whether the sender was disconnected due to external event, as opposed to explicit command by the user or receiver. For example, if the user taps the 'Stop Casting' button in the sender app, the `implicit` flag will be `false`. On the other hand, if the sender device disconnects because it has gone outside the range of the receiver's network, then `implicit` will be `true`.

If all goes well, you should see the receiver device listed among the discovered devices when you hit the Cast button in a sender app (the YouTube mobile app, for instance). Selecting it will initiate a Cast session with the receiver. Once connected, you can begin casting videos from the sender app.

### 4. Stopping the receiver

```
try {
  await receiver.stop();
}
catch (error) {
  ...
}
```

## Controls

A user interacts with controls provided by the sender app to manage content played on the receiver or to set its volume. Such controls include:

- Pause / previous / next buttons;
- Volume slider or, in the case of phones, the physical volume up / down buttons;
- Progress bar for seeking; and
- Play button or, in the case of a YouTube sender app, the video thumbnails that start playback when tapped or clicked.

When a user interacts with a control, the sender app sends the corresponding command to the receiver. The receiver responds by calling one of the following 'control' methods defined in the `Player` class:

<a name="control-methods"></a>
<details>
<summary><code>play(video, position, AID): Promise&lt;boolean&gt;</code></summary>
<br />
<p>
Notifies senders that player is in 'loading' state, then calls <code>doPlay()</code>; if returned Promise resolves to <code>true</code>, notifies senders that playback has started.
</p>

**Params**
- `video`: (object) target video to play; [object properties](#videos).
- `position`: (number) the position, in seconds, from which to start playback.
- `AID`: internal use; do not specify.

**Returns**

Promise that resolves to the resolved result of `doPlay()`.
</details>

<details>
<summary><code>pause(AID): Promise&lt;boolean&gt;</code></summary>
<br />
<p>
Calls <code>doPause()</code>; if returned Promise resolves to <code>true</code>, notifies connected senders that playback has paused.
</p>

**Params**
- `AID`: internal use; do not specify.

**Returns**

Promise that resolves to the resolved result of `doPause()`, or `false` if no playback is in progress.
</details>

<details>
<summary><code>resume(AID): Promise&lt;boolean&gt;</code></summary>
<br />
<p>
Calls <code>doResume()</code>; if returned Promise resolves to <code>true</code>, notifies connected senders that playback has resumed.
</p>

**Params**
- `AID`: internal use; do not specify.

**Returns**

Promise that resolves to the resolved result of `doResume()`, or `false` if player is not in paused state.
</details>

<details>
<summary><code>stop(AID): Promise&lt;boolean&gt;</code></summary>
<br />
<p>
Calls <code>doStop()</code>; if returned Promise resolves to <code>true</code>, notifies connected senders that playback has stopped.
</p>

**Params**
- `AID`: internal use; do not specify.

**Returns**

Promise that resolves to the resolved result of `doStop()`, or `true` if player already in stopped or idle state.
</details>

<details>
<summary><code>seek(position, AID): Promise&lt;boolean&gt;</code></summary>
<br />
<p>
Calls <code>doSeek()</code>; if returned Promise resolves to <code>true</code>, notifies connected senders of new seek position.
</p>

**Params**
- `position`: (number) the position, in seconds, to seek to.
- `AID`: internal use; do not specify.

**Returns**

Promise that resolves to the resolved result of `doSeek()`, or `false` if no playback is in progress or otherwise not in paused state.
</details>

<details>
<summary><code>next(AID): Promise&lt;boolean&gt;</code></summary>
<br />
<p>
Plays the next video in the player queue. If already reached end of queue and autoplay is enabled, play autoplay video if available. Notifies senders on successful playback.
</p>

**Params**
- `AID`: internal use; do not specify.

**Returns**

Promise that resolves to `true` on playback of the next video; `false` otherwise.
</details>

<details>
<summary><code>previous(AID): Promise&lt;boolean&gt;</code></summary>
<br />
<p>
Plays the previous video in the player queue. Notifies senders on successful playback.
</p>

**Params**
- `AID`: internal use; do not specify.

**Returns**

Promise that resolves to `true` on playback of the previous video; `false` otherwise.
</details>

<details>
<summary><code>setVolume(volume, AID): Promise&lt;boolean&gt;</code></summary>
<br />
<p>
Calls <code>doSetVolume()</code>; if returned Promise resolves to <code>true</code>, notifies connected senders of new volume.
</p>

**Params**
- `volume`: (object)
  - `level`: (number) volume level between 0-100.
  - `muted`: (boolean) muted state.
- `AID`: internal use; do not specify.

**Returns**

Promise that resolves to the resolved result of `doSetVolume()`.
</details>

These methods wrap around the `do***()` methods you implemented in your player and sends status updates back to the sender as necessary. The status updates enable the sender app to refresh its UI to match the state of the player.

If your application also provides controls for the user to manage playback on the receiver, you should call these methods to ensure senders will be notified of the relevant changes in player state. For example:

```
// Example: user clicks 'pause' button in your application's UI
await player.pause();
```

## Videos

A video is represented by an object that satisfies the [Video](./docs/api/interfaces/Video.md) interface constraint:

- `id`: (string) video Id.
- `client`: (object) the client that is requesting playback; one of [Constants.CLIENTS](#constants).
- `context`: (object)
  - `playlistId`: (string) Id of the playlist containing the video.
  - `params`: (string) Exact purpose remains to be ascertained, but appears to affect playlist content and autoplay video.
  - `ctt`: (string) Client credentials transfer token, which is an authorization token for accessing private videos.

All properties of `context`, as well as `context` itself, are present only if available. Where provided, you may use them to fetch video info in your player implementation or, where applicable, your own `PlaylistRequestHandler` implementation (see [Player Queue](#player-queue)).

For example of fetching video info for purpose of playback, see [VideoLoader](./example/VideoLoader.ts) used by the [FakePlayer](./example/FakePlayer.ts) demo.

For example of fetching the next and previous videos in the [player queue](#player-queue), including autoplay video, see [DefaultPlaylistRequestHandler](./src/lib/app/DefaultPlaylistRequestHandler.ts).

> It is up to you to decide which properties to utilize in your implementation. For example, in your player implementation, you may just use `video.id` when fetching video streams for playback. On the other hand, if your player needs to be able to play private videos, then you must also utilize `video.context.ctt`.


## Handling changes in player state

If a change in player state is effected by one of the previously mentioned ['control' methods](#control-methods), then you don't have to do anything as those methods will send status updates to senders.

On the other hand, if a change is one that only your player implementation knows about, then it is your responsibility to deal with it. Situations where this will arise are:

#### 1. When playback finishes

The receiver has no knowledge when a playback reaches the end of a video. It is your responsibility to take action when this happens. Usually, this would be playing the next video in the queue:

```
// When playback finishes
await player.pause(); // Pause the player
await player.next();  // Play next video in the queue
```

#### 2. When your player implementation depends on an external player

If your player implementation delegates its functions to an external player, and the user is able to interact directly with that player, then you must be able to capture changes in the state of the external player arising from such interactions. You must then call the following method in your player implementation:

<details>
<summary><code>notifyExternalStateChange(newStatus): Promise&ltvoid&gt</code></summary>
<br />
<p>
Signals that there has been a change in player state that is not captured elsewhere in the `Player` implementation. This method will update the `Player` instance's internal state and, if necessary, notifies senders of the new player state.
</p>

**Params**
- `newStatus`: the new player status (one of [Constants.PLAYER_STATUSES](#constants)); `undefined` for no change in player status.
</details>

Example:
```
// Playback paused by external player
player.notifyExternalStateChange(PLAYER_STATUSES.PAUSED);

// Change in volume of external player
// -- Player status has not changed, so we do not specify `newStatus`.
player.notifyExternalStateChange();
```

## Manual Pairing

Manual pairing, aka 'Link with TV Code', allows a sender to connect to the receiver even when they are not on the same network. For this, you need to obtain a pairing code for the user to enter into the sender app.

> YouTube Music does not support this feature.

A pairing code refreshes every five minutes. Thus, the receiver provides a `PairingCodeRequestService` for obtaining the pairing code and automatically refreshing it at five-minute intervals:

```
// Obtain `PairingCodeRequestService` instance from receiver
const service = receiver.getPairingCodeRequestService();

// Events
service.on('request', () => {...});  // Event when request is being made
service.on('response', (code) => {...}); // Event when code is obtained
service.on('error', (error) => {...}); // Event when error occurs

// Note that service stops on `error` event.

service.start();
...

service.stop();
```
In your application, you would inform the user of the pairing code inside the `response` event.

<a name="player-queue"></a>
## Player Queue

The player queue is represented by a `Playlist` instance, accessible by `player.queue`. Internally, for the current selected video, the playlist keeps a reference to the previous and next videos. When the current video changes, the playlist refreshes the previous and next videos by calling the following method of a `PlaylistRequestHandler` implementation:

<details>
<summary><code>getPreviousNextVideos(target, playlist)</code></summary>
<br />
<p>Given <code>target</code> video that resides in <code>playlist</code>, implementations shall fetch the previous and next videos in the list.</p>

**Params**
- `video`: (object) target video for which to fetch the previous and next videos; [object properties](#videos).
- `playlist`: (object) the `Playlist` instance making the request.

**Returns**
<br />
<p>
Promise that resolves to the following value:

(Object)
- `previous`: (object) the previous video in the list, or `null` if none.
- `next`: (object) the next video in the list. If there is none, then set it to the autoplay video, or `null` if none or autoplay is not enabled (you may check with `playlist.autoplayMode`).

Instead of `null`, you may just omit `previous` or `next` (as appropriate) from the returned result. If provided, they must satisfy the `Video` interface constraint (see [Videos](#videos)).
</p>
</details>

By default, previous / next videos are obtained through a `DefaultPlaylistRequestHandler` instance, which makes YouTube API calls with the [YouTube.js](https://github.com/LuanRT/YouTube.js) library and returns the result after parsing the response.

You may have observed that the player queue can be obtained through the `Player` instance's `queue` property, and that the queue provides a `videoIds` property:

```
const videoIds = player.queue.videoIds; // Array of video Ids in the queue
```

So why does `DefaultPlaylistRequestHandler` go through the trouble of making YouTube API calls when the Id of the previous and next videos are readily available? This is because the `videoIds` property does not include context data such as `params` and `ctt`, nor does it include information about autoplay. The aim of `DefaultPlaylistRequestHandler` is to facilitate autoplay as well as provide sufficient data that would allow you to properly formulate requests when fetching video info for playback in your player implementation.

If the default `PlaylistRequestHandler` does not suit your purpose, you can implement your own:
```
import { Playlist, PlaylistRequestHandler, Video } from "yt-cast-receiver";

class MyPlaylistRequestHandler extends PlaylistRequestHandler {
  getPreviousNextVideos(target: Video, playlist: Playlist): Promise<{ previous?: Video | null; next?: Video | null; }> {
    // Do you stuff here
  }
}
```

To use your `PlaylistRequestHandler` implementation:
```
const receiver = new YouTubeCastReceiver(player, {
  app: {
    playlistRequestHandler: new MyPlaylistRequestHandler()
    ...
  }
});
```

### Events

To capture events emitted by the player queue:

```
player.queue.on(eventType, (event) => { ... });
```

<details>
<summary><code>on('videoSelected', (event) => { ... });</code></summary>
<br />
<p>
Emitted when a video in the queue has been selected.
</p>

`event`: (object)
- `type`: (string) 'videoSelected'
- `user`: (object) where applicable, the user that triggered the event.
  - `name`: (string) name of the user
  - `thumbnail`: (string) user avatar URI
- `videoId`: (string) the Id of the video selected.
</details>

<details>
<summary><code>on('videoAdded', (event) => { ... });</code></summary>
<br />
<p>
Emitted when a video has been added to the queue.
</p>

`event`: (object)
- `type`: (string) 'videoAdded'
- `user`: (object) where applicable, the user that triggered the event.
  - `name`: (string) name of the user
  - `thumbnail`: (string) user avatar URI
- `videoId`: (string) the Id of the video added.
</details>

<details>
<summary><code>on('videoRemoved', (event) => { ... });</code></summary>
<br />
<p>
Emitted when a video in the queue has been removed.
</p>

`event`: (object)
- `type`: (string) 'videoRemoved'
- `user`: (object) where applicable, the user that triggered the event.
  - `name`: (string) name of the user
  - `thumbnail`: (string) user avatar URI
- `videoId`: (string) the Id of the video removed.
</details>

<details>
<summary><code>on('playlistSet', (event) => { ... });</code></summary>
<br />
<p>
Emitted when the entire content of the queue has changed.
</p>

`event`: (object)
- `type`: (string) 'playlistSet'
- `user`: (object) where applicable, the user that triggered the event.
  - `name`: (string) name of the user
  - `thumbnail`: (string) user avatar URI
- `videoIds`: (Array<`string`>) the Ids of the videos representing the new content of the queue.
</details>

<details>
<summary><code>on('playlistAdded', (event) => { ... });</code></summary>
<br />
<p>
Emitted when a list of videos has been added to the queue.
</p>

`event`: (object)
- `type`: (string) 'playlistAdded'
- `user`: (object) where applicable, the user that triggered the event.
  - `name`: (string) name of the user
  - `thumbnail`: (string) user avatar URI
- `videoIds`: (Array<`string`>) the Ids of the videos added to the queue.
</details>

<details>
<summary><code>on('playlistCleared', (event) => { ... });</code></summary>
<br />
<p>
Emitted when the queue has been cleared.
</p>

`event`: (object)
- `type`: (string) 'playlistCleared'
- `user`: (object) where applicable, the user that triggered the event.
  - `name`: (string) name of the user
  - `thumbnail`: (string) user avatar URI
</details>

<details>
<summary><code>on('playlistUpdated', (event) => { ... });</code></summary>
<br />
<p>
Emitted when the queue has been updated and the update is not associated with any of the aforementioned events.
</p>

`event`: (object)
- `type`: (string) 'playlistUpdated'
- `videoIds`: (Array<`string`>) the Ids of the videos in the updated queue.
</details>

<details>
<summary><code>on('autoplayModeChange', (previous, current) => { ... });</code></summary>
<br />
<p>
Emitted when the autoplay mode has changed.
</p>

- `previous`: (string) Previous autoplay mode. One of [Constants.AUTOPLAY_MODES](#constants).
- `current`: (string) Current autoplay mode. One of [Constants.AUTOPLAY_MODES](#constants).

</details>

## Autoplay on Connect

By default, autoplay is enabled automatically on the sender app when a Cast session begins. You can disable this behaviour:

```
// At construction time
const receiver = new YouTubeCastReceiver(player, {
  app: {
    enableAutoplayOnConnect: false
    ...
  }
});

// At runtime
receiver.enableAutoplayOnConnect(false);
```

> `enableAutoplayOnConnect: true` may be overridden depending on the autoplay capability of all connected senders. If any one sender doesn't support autoplay (e.g. YouTube website), then autoplay will be disabled for all senders.

## Logging

You can set log level as follows:
```
// At construction time
const receiver = new YouTubeCastReceiver(player, {
  logLevel: ...
  ...
});

// At runtime
receiver.setLogLevel(...);
```

Log level can be one of [Constants.LOG_LEVELS](#constants).

### Logger

By default, a `DefaultLogger` instance is used for logging, which prints logs to the console.

You can get the logger used by a receiver instance as follows:
```
const logger = receiver.logger;
```

<details>
<summary>Implementing your own logger</summary>
<br />
<p>
The <code>Logger</code> interface defines the following methods you have to implement in your own logger:

- <code>error(...msg: any[]): void;</code><br />
- <code>warn(...msg: any[]): void;</code><br />
- <code>info(...msg: any[]): void;</code><br />
- <code>debug(...msg: any[]): void;</code><br />
- <code>setLevel(value: LogLevel): void;</code><br />
</p>

Example:

```
// ESM + Typescript:
import { Logger, LogLevel } from 'yt-cast-receiver';

class MyLogger implements Logger {
  error(...msg: any[]): void {
    ...
  }
  warn(...msg: any[]): void {
    ...
  }
  info(...msg: any[]): void {
    ...
  }
  debug(...msg: any[]): void {
    ...
  }
  setLevel(value: LogLevel): void {
    ...
  }
}

// CJS; no Typescript
class MyLogger {
  error(...msg) { ... }
  warn(...msg) { ... }
  info(...msg) { ... }
  debug(...msg) { ... }
  setLevel(value) { ... }
}
```

To use your logger implementation:
```
const receiver = new YouTubeCastReceiver(player, {
  logger: new MyLogger()
  ...
});
```

If you just want to change the output destination of logs, you may consider extending the `DefaultLogger` class instead:

```
import { DefaultLogger } from 'yt-cast-receiver';

class MyLogger extends DefaultLogger {

  // Override DefaultLogger's toOutput() method
  toOutput(targetLevel: LogLevel, msg: string[]): void {
    // Send `msg` to destination of choice.
    ...
  }
}
```
</details>

## DataStore

A `DataStore` implementation is used to persist certain data during the startup phase of the receiver. The following lists the keys used to reference the persisted data and their purpose:

|     Key     |     Description                 |
|-------------|---------------------------------|
|`app.pid`    |(string) Used by the DIAL server to broadcast the receiver's identity. If `pid` changes every time the receiver starts, you might see duplicate entries in the Cast menu.|
|`mdxContext` |(object: {`screenId`, `deviceId`}) Identifies the 'screen' being cast to. You can think of a screen as something to which senders connect, and thus controlled by users, and on which the receiver plays content. Preserving the `mdxContext`facilitates reconnections in case a Cast session got interrupted, such as when the receiver stops abnormally and needs to be restarted.

To disable persistence, set the `dataStore` option to `false` when creating the receiver instance:

```
const receiver = new YouTubeCastReceiver({
  ...
  dataStore: false
});
```

By default, a `DefaultDataStore` instance is used to persist data. It saves data to local files using the [node-persist](https://github.com/simonlast/node-persist) module. You can provide your own implementation by extending the `DataStore` class:

```
import { DataStore } from 'yt-cast-receiver';

class MyDataStore extends DataStore {

  // Store `value` referenced by `key`.
  async set<T>(key: string, value: T): Promise<void> {
    ...
  }

  // Return stored value by `key`, or `null` if none found.
  async get<T>(key: string): Promise<T | null> {
    ...
  }
}

```
Although not required, it is recommended that you provide a method in your implementation to clear the stored data. This would allow the receiver to start afresh.

The `DefaultDataStore`, for example, provides a `clear()` method:
```
import { DefaultDataStore } from "yt-cast-receiver";

const defaultDataStore = new DefaultDataStore();
await defaultDataStore.clear();

const receiver = new YouTubeCastReceiver({
  ...
  dataStore: defaultDataStore
});

receiver.start(); // Fresh start!
```

## Mute Policy

When volume is muted, its original level remains unchanged. Player implementations shall disable audio output while playing content.

On unmute, the original volume level is restored. Player implementations shall resume audio output.

However, not all sender apps support mute. On apps that don't, the volume level is set to 0 to mimic mute. Known sender apps that support mute are:

1. YouTube desktop website
2. YouTube Music desktop website

Known sender apps that do not support mute are:

1. YouTube mobile app
2. YouTube Music mobile app

The entry point to setting the volume level and muted status on the receiver is `setVolume(volume)` of the `Player` API, where `volume` is an object with the following properties:

- `level`: (number) the volume level to set (0-100).
- `muted`: (boolean) muted status.

For example, when the receiver receives a message from a sender telling it to set the volume, say `level: 50` and `muted: true`, it will call `setVolume()` as follows:

```
player.setVolume({ level: 50, muted: true });
```

This will in turn call:
```
player.doSetVolume({ level: 50, muted: true });
```

Your player implementation will then do whatever is necessary to set the volume level and muted status on the receiver device. After that, the receiver will send a volume change notification back to all connected sender apps. The sender apps will then update their UI to show the new volume.

However, as previously mentioned, not all sender apps support mute. In the current scenario, if one of the sender apps does not support mute, then it will ignore `muted: true` in the volume change notification payload and simply show '50' as the current volume level.

To resolve this, the receiver checks for the presence of sender apps that do not support mute. If it finds any, instead of doing the following in `setVolume()`:
```
setVolume() {
  ...
  this.doSetVolume({ level: 50, muted: true });
}
```

It will do this:
```
setVolume() {
  ...
  this.doSetVolume({ level: 0, muted: true });
}
```

Then, when the volume change notification is sent back to sender apps, it will indicate current volume level as 0. Sender apps that do not support mute will still show the correct volume in their UI.

Obviously, the drawback in this approach is that when you click 'unmute' in sender apps that do support mute, the original volume level cannot be restored because it has already been set to 0. If you do not want this effect, and prefer to have sender apps without mute support to show a non-zero volume level when muted, you can specify `mutePolicy` when constructing the receiver instance:

```
const receiver = this.#receiver = new YouTubeCastReceiver(player, {
  ...
  app: {
    mutePolicy: Constants.MUTE_POLICIES.PRESERVE_VOLUME_LEVEL
  }
});
```

> The default mute policy is `MUTE_POLICIES.AUTO`, which is what has been described above.

On the other hand, if you want to set volume level to 0, regardless of whether sender apps support mute, you can set `mutePolicy` to `MUTE_POLICIES.ZERO_VOLUME_LEVEL`.

## Reset Player On Disconnect Policy

By default, the receiver resets the player when all senders disconnect. This means any current playback is stopped and the player queue is cleared.

You can override this behavior such that the player is reset only when all senders are *explicitly* disconnected. A sender is explicitly disconnected when:

- The user ends the Cast session by the tapping the 'Stop Casting' button in the sender app; or
- The receiver has to end the Cast session due to incoming connection from a different client type (e.g. switching from YouTube to YouTube Music or vice versa) or occurrence of an irrecoverable error.

An example of where a sender is *implicitly* disconnected is where the sender device has gone outside the reach of the receiver's network. In such cases, the sender app should automatically reconnect when it rejoins the network.

To set the Reset Player On Disconnect Policy:

```
// Default policy is `Constants.RESET_PLAYER_ON_DISCONNECT_POLICIES.ALL_DISCONNECTED`
const policy = Constants.RESET_PLAYER_ON_DISCONNECT_POLICIES.ALL_EXPLICITLY_DISCONNECTED;

// At construction time
const receiver = new YouTubeCastReceiver(player, {
  app: {
    resetPlayerOnDisconnectPolicy: policy
    ...
  }
});

// At runtime
receiver.setResetPlayerOnDisconnectPolicy(policy);
```

## Constants

Constants are defined for convenience. For example:

```
// ESM
import { Constants } from 'yt-cast-receiver';
// CJS
const { Constants } = require('yt-cast-receiver')

// Instead of:
receiver.setLogLevel('error');

// You may do this:
receiver.setLogLevel(Constants.LOG_LEVELS.ERROR);
```

The following groups of constants are defined:

<details>
<summary>Constants.AUTOPLAY_MODES</summary>
<br />
<p>
Useful when checking current autoplay mode:

```
if (player.autoplayMode === Constants.AUTOPLAY_MODES.DISABLED) {
  ...
}
```
</p>

**Properties**
- ENABLED
- DISABLED
- UNSUPPORTED
</details>

<details>
<summary>Constants.PLAYER_STATUSES</summary>
<br />
<p>
Useful when checking current player status, updating player state through `player.notifyExternalStateChange()`:

```
if (player.status === Constants.PLAYER_STATUSES.PLAYING) {
  ...
}
```
</p>

**Properties**
- IDLE
- PLAYING
- PAUSED
- LOADING
- STOPPED
</details>

<details>
<summary>Constants.LOG_LEVELS</summary>
<br />
<p>
Useful when setting log level.
</p>

**Properties**
- ERROR
- WARN
- INFO
- DEBUG
- NONE
</details>

<details>
<summary>Constants.STATUSES</summary>
<br />
<p>
Useful when checking receiver statatus.
```
if (receiver.status === Constants.STATUSES.RUNNING) {
  ...
}
```
</p>

**Properties**
- STOPPED
- STOPPING
- STARTING
- RUNNING

</details>

<details>
<summary>Constants.CLIENTS</summary>
<br />
<p>
Predefined info corresponding to 'YouTube' or 'YouTube Music' client.

To check whether a sender is coming from YouTube Music:
```
if (sender.client === Constants.CLIENTS.YTMUSIC) {
  ...
}
```

To check whether a video is cast from YouTube:
```
// In your player implementation
doPlay(video: Video...) {
  if (video.client === Constants.CLIENTS.YT) {
    ...
  }
}
```
</p>
</details>

<details>
<summary>Constants.MUTE_POLICIES</summary>
<br />
<p>
Mute policy stipulates whether volume level should be set to 0 when <code>player.setVolume(volume)`</code> is called with <code>`volume.muted: true`</code>.
</p>

**Properties**
- `ZERO_VOLUME_LEVEL`: set volume level to 0.
- `PRESERVE_VOLUME_LEVEL`: do not override volume level.
- `AUTO`: preserve volume level or set it to 0, depending on whether connected senders support mute.
</details>

<details>
<summary>Constants.RESET_PLAYER_ON_DISCONNECT_POLICIES</summary>
<br />
<p>
Whether to reset the player (stop current playback and clear player queue) when all senders have disconnected.
</p>

**Properties**
- `ALL_EXPLICITLY_DISCONNECTED`: Reset player only when all senders are *explicitly* disconnected.
- `ALL_DISCONNECTED`: Reset player when all senders have disconnected, whether implicitly or explicitly.
</details>

# API

See generated [API docs](docs/api).

# Running the example

```
$ git clone https://github.com/patrickkfkan/yt-cast-receiver.git
$ cd yt-cast-receiver
$ npm install
$ npm run example
// or
$ npm run example:no-ui
```
Note: demo uses port 8099.

# Changelog

1.3.3
- Update YouTube.js lib

1.3.2
- Update YouTube.js lib

1.3.1
- Update YouTube.js lib
- Add `GaiaId` props to `Sender`

1.3.0
- Update dependencies and libraries
- This version now requires Node v18

1.2.4
- [Fixed] YouTube.js lib errors in example

1.2.3
- [Added] Include `previous` and `next` videos in `PlaylistState`
- [Added] `playlistUpdated` and `autoplayModeChange` queue events

1.2.2
- [Fixed] Export of `setResetPlayerOnDisconnectPolicy()` in `YouTubeCastReceiver`

1.2.1
- [Fixed] API doc
- [Fixed] Default export in `Constants`

1.2.0
- [Added] `implicit` flag in `senderDisconnect` event
- [Added] `resetPlayerOnDisconnectPolicy` receiver option

1.1.0
- [Changed] On queue update, dismiss autoplay video first when it is expected to change.
- [Fixed] Recurring autoplay videos
- [Added] `user` property in `Sender`

1.0.1
- [Added] Queue events
- [Fixed] Erratic seeking issues and status updates when casting from desktop website

1.0.0
- Complete rewrite with major breaking changes in the API from v0.1.x!
- Move to Typescript and package as ESM + CJS hybrid module.
- New features:
  - Support casting from YouTube Music (credit: [dgalli1](https://github.com/dgalli1))
  - Allow multiple sender connections
  - Support manual pairing, aka Link with TV Code (YouTube only)
  - Provide player implementations with sufficient data to play private media (such as uploads in your YouTube Music library)
  - Improved logging

0.1.2

- [Added] More options (credit: [mas94uk](https://github.com/mas94uk))
- [Fixed] Git repo dependency paths

  0.1.1-b

- [Changed] More robust fetching of mix playlists for 'Up Next' videos

  0.1.0b

- [Fixed] Connection issue with YouTube mobile app version 16.22.35 and later

  0.1.0a

- Initial release

# License

MIT

*Note on commercial use*:

This project uses a [forked version](https://github.com/patrickkfkan/peer-dial) of [peer-dial](https://github.com/fraunhoferfokus/peer-dial) for DIAL server implementation, which is provided "free for non commercial use". This means if you want to use `yt-cast-receiver` in a commercial product (not recommended anyway), you should contact the author of the *peer-dial* module for consent.
