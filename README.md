# yt-cast-receiver

A YouTube Cast Receiver for Node. Originally inspired by [TubeCast](https://github.com/enen92/script.tubecast).

### Terminology

**Sender**

An app that initiates a Cast session and acts as a remote controller for playback of content on the *receiver*. In the context of YouTube casting, a sender can be the YouTube mobile app or the YouTube website.

> Not all browsers support casting from the YouTube website. This module has been tested to work with the Chrome and Edge desktop browsers.

**Receiver**

An app that receives and responds to commands from a sender, plays content through a *player*, and provides status updates to senders.

---

`yt-cast-receiver` plays the role of the receiver in the context of YouTube casting, but does not include a player. It is intended to be integrated into your application where you implement the player yourself. When the receiver receives a playback command from a sender (such as play, pause and seek), it will pass this command to your player. It is up to you to decide how you would handle these commands.

The module includes a *DIAL server* for broadcasting the receiver device on the network. Users may then initiate a Cast session with the receiver through the sender app's Cast button.

*`yt-cast-receiver` is (always) work-in-progress and may not be reliable enough for production use.*

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
<summary><code>doPlay(videoId, position): Promise&lt;boolean&gt;</code></summary>
<br />
<p>Implementations shall play the target video from the specified position.</p>

**Params**
- `videoId`: (string) Id of the target video.
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
<p>Implementations shall stop current playback.</p>

**Returns**
<br />
<p>Promise that resolves to `true` when playback was stopped; `false` otherwise.</p>
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
<summary><code>doSetVolume(level): Promise&lt;boolean&gt;</code></summary>
<br />
<p>Implementations shall set the volume to the specified level.</p>

**Params**
- `level`: (number) the volume level to set (0 - 100).

**Returns**
<br />
<p>Promise that resolves to `true` when volume was set; `false` otherwise.</p>
</details>

<details>
<summary><code>doGetVolume(): Promise&lt;number&gt;</code></summary>
<br />
<p>Implementations shall return the current volume level.</p>

**Returns**
<p>Promise that resolves to the value of the current volume level (0 - 100).</p>
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
- `brand`: (string) defaults to 'Generic'.
- `model`: (string) defaults to 'SmartTV'.
- `logger`: `Logger` implementation (default: `DefaultLogger` instance) - see [Logging](#logging).
- `logLevel`: one of [Constants.LOG_LEVELS](#constants) (default: INFO).
- `app`: (object) receiver app options
  - `autoplayLoader`: `AutoplayLoader` implementation, or `null` to disable autoplay (default: `DefaultAutoplayLoader` instance) - see [Autoplay](#autoplay).
  - `enableAutoplayOnConnect`: (boolean) whether to enable autoplay on sender app when it connects.
  - `screenApp`: (string) defaults to 'YouTube Cast Receiver'.
  - `screenName`: (string) defaults to 'ytcr'.
- `dial`: (object) DIAL server options
  - `bindToAddresses`: Array<`string`> (default: `undefined` - bind to all network addresses).
  - `bindToInterfaces`: Array<`string`> (default: `undefined` - bind to all network interfaces).
  - `corsAllowOrigins`: (boolean) defaults to `false` - no origin allowed.
  - `port`: (number) port on which to accept requests (default: 3000).
  - `prefix`: (string) access path (default: '/ytcr').
</details>

### 3. Start receiver

Once you have created a receiver instance with your player implementation, you can register event listeners and begin accepting Cast requests from senders:

```
// When a sender connects
receiver.on('senderConnect', (sender) => {
  console.log(`Connected to ${sender.name}`);
});

// When a sender disconnects
receiver.on('senderDisconnect', (sender) => {
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
<summary><code>play(videoId, position, AID): Promise&lt;boolean&gt;</code></summary>
<br />
<p>
Notifies senders that player is in 'loading' state, then calls `doPlay()`; if returned Promise resolves to `true`, notifies senders that playback has started.
</p>

**Params**
- `videoId`: (string) Id of the target video.
- `position`: (number) the position, in seconds, from which to start playback.
- `AID`: internal use; do not specify.

**Returns**

Promise that resolves to the resolved result of `doPlay()`.
</details>

<details>
<summary><code>pause(AID): Promise&lt;boolean&gt;</code></summary>
<br />
<p>
Calls `doPause()`; if returned Promise resolves to `true`, notifies connected senders that playback has paused.
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
Calls `doResume()`; if returned Promise resolves to `true`, notifies connected senders that playback has resumed.
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
Calls `doStop()`; if returned Promise resolves to `true`, notifies connected senders that playback has stopped.
</p>

**Params**
- `AID`: internal use; do not specify.

**Returns**
Promise that resolves to the resolved result of `doStop()`, or `false` if player is already in stopped state.
</details>

<details>
<summary><code>seek(position, AID): Promise&lt;boolean&gt;</code></summary>
<br />
<p>
Calls `doSeek()`; if returned Promise resolves to `true`, notifies connected senders of new seek position.
</p>

**Params**
- `position`: (number) the position, in seconds, to seek to.
- `AID`: internal use; do not specify.

**Returns**

Promise that resolves to the resolved result of `doSeek()`.
</details>

<details>
<summary><code>next(AID): Promise&lt;boolean&gt;</code></summary>
<br />
<p>
Plays the next video in the player queue. If already reached end of queue, play autoplay video if available. Notifies senders on successful playback.
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
Calls `doSetVolume()`; if returned Promise resolves to `true`, notifies connected senders of new volume level.
</p>

**Params**
- `volume`: (number) volume level to set (0-100).
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

## Autoplay

If autoplay is enabled, the receiver will fetch the autoplay (aka 'Up Next') video when playback reaches the end of the player queue.

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

### Autoplay loader

By default, autoplay videos are obtained through a `DefaultAutoplayLoader` instance, which fetches from the following sources:
- Mixes; or
- Related videos, if mixes are not found for the target video.

<details>
<summary>Implementing your own autoplay loader</summary>
<br />
<p>
The <code>AutoplayLoader</code> interface defines the one method you have to implement in your own autoplay loader:

<code>getAutoplayVideoId(videoId, player, logger): Promise<string | null></code>

Fetches the autoplay video for the specified video.

**Params**
- `videoId`: (string) the Id of the target video.
- `player`: the `Player` implementation associated with this request.
- `logger`: `Logger` implementation for logging messages.
</p>

**Returns**
<br />
<p>
Promise that resolves to the Id of the autoplay video, or <code>null</code> if none obtained.
</p>

Example:

```
// ESM + Typescript:
import { AutoplayLoader, Logger, Player } from "yt-cast-receiver";

class MyAutoplayLoader implements AutoplayLoader {
  getAutoplayVideoId(videoId: string, player: Player, logger: Logger): Promise<string | null> {
    // Do your stuff here
  }
}

// CJS; no Typescript
class MyAutoplayLoader {
  getAutoplayVideoId(videoId, player, logger) {
    // Do your stuff here
  }
}
```

To use your autoplay loader implementation:
```
// At construction time
const receiver = new YouTubeCastReceiver(player, {
  app: {
    autoplayLoader: new MyAutoplayLoader()
    ...
  }
});

// At runtime:
receiver.setAutoplayLoader(new MyAutoplayLoader());

```
</details>

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
  toOutput(msg: string[]): void {
    // Send `msg` to destination of choice.
    ...
  }
}
```
</details>

## Constants

Constants are defined for convenience. For example:

```
// EJS
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

1.0.0
- Complete rewrite with major breaking changes from v0.1.x!
- Move to Typescript and package as ESM + CJS hybrid module.

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

This project uses a [forked version](https://github.com/patrickkfkan/peer-dial) of [peer-dial](https://github.com/fraunhoferfokus/peer-dial) for DIAL server implementation, which is provided "free for non commercial use" under GPLv3. This means if you want to use `yt-cast-receiver` in a commercial product (not recommended anyway), you should contact the author of the [peer-dial](https://github.com/fraunhoferfokus/peer-dial) module for consent.
