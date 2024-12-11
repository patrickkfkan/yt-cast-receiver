[**yt-cast-receiver**](../README.md) • **Docs**

***

[yt-cast-receiver](../README.md) / Player

# Class: `abstract` Player

`Player` abstract class that leaves playback functionality to implementors.

## Extends

- `EventEmitter`

## Constructors

### new Player()

> **new Player**(): [`Player`](Player.md)

#### Returns

[`Player`](Player.md)

#### Overrides

`EventEmitter.constructor`

#### Defined in

[src/lib/Player.ts:117](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L117)

## Accessors

### autoplayMode

#### Get Signature

> **get** **autoplayMode**(): [`AutoplayMode`](../type-aliases/AutoplayMode.md)

##### Returns

[`AutoplayMode`](../type-aliases/AutoplayMode.md)

#### Defined in

[src/lib/Player.ts:384](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L384)

***

### cpn

#### Get Signature

> **get** **cpn**(): `string`

##### Returns

`string`

#### Defined in

[src/lib/Player.ts:388](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L388)

***

### logger

#### Get Signature

> **get** **logger**(): [`Logger`](../interfaces/Logger.md)

##### Returns

[`Logger`](../interfaces/Logger.md)

#### Defined in

[src/lib/Player.ts:376](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L376)

***

### queue

#### Get Signature

> **get** **queue**(): [`Playlist`](Playlist.md)

##### Returns

[`Playlist`](Playlist.md)

#### Defined in

[src/lib/Player.ts:392](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L392)

***

### status

#### Get Signature

> **get** **status**(): [`PlayerStatus`](../type-aliases/PlayerStatus.md)

##### Returns

[`PlayerStatus`](../type-aliases/PlayerStatus.md)

#### Defined in

[src/lib/Player.ts:380](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L380)

***

### zeroVolumeLevelOnMute

#### Get Signature

> **get** **zeroVolumeLevelOnMute**(): `boolean`

##### Returns

`boolean`

#### Defined in

[src/lib/Player.ts:396](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L396)

## Methods

### doGetDuration()

> `abstract` `protected` **doGetDuration**(): `Promise`\<`number`\>

Implementations shall return the duration of the current video.

#### Returns

`Promise`\<`number`\>

Promise that resolves to the duration of the current video (in seconds).

#### Defined in

[src/lib/Player.ts:115](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L115)

***

### doGetPosition()

> `abstract` `protected` **doGetPosition**(): `Promise`\<`number`\>

Implementations shall return the current playback position.

#### Returns

`Promise`\<`number`\>

Promise that resolves to the current playback position (in seconds).

#### Defined in

[src/lib/Player.ts:109](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L109)

***

### doGetVolume()

> `abstract` `protected` **doGetVolume**(): `Promise`\<[`Volume`](../interfaces/Volume.md)\>

Implementations shall return the current volume level and muted state.

#### Returns

`Promise`\<[`Volume`](../interfaces/Volume.md)\>

Promise that resolves to an object with these properties:
  - `level`: (number) volume level between 0-100.
  - `muted`: (boolean) muted state.

#### Defined in

[src/lib/Player.ts:103](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L103)

***

### doPause()

> `abstract` `protected` **doPause**(): `Promise`\<`boolean`\>

Implementations shall pause current playback.

#### Returns

`Promise`\<`boolean`\>

Promise that resolves to `true` when playback was paused; `false` otherwise.

#### Defined in

[src/lib/Player.ts:66](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L66)

***

### doPlay()

> `abstract` `protected` **doPlay**(`video`, `position`): `Promise`\<`boolean`\>

Implementations shall play the target video from the specified position.

#### Parameters

• **video**: [`Video`](../interfaces/Video.md)

The target video to play.

• **position**: `number`

The position, in seconds, from which to start playback.

#### Returns

`Promise`\<`boolean`\>

Promise that resolves to `true` on successful playback; `false` otherwise.

#### Defined in

[src/lib/Player.ts:60](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L60)

***

### doResume()

> `abstract` `protected` **doResume**(): `Promise`\<`boolean`\>

Implementations shall resume paused playback.

#### Returns

`Promise`\<`boolean`\>

Promise that resolves to `true` when playback was resumed; `false` otherwise.

#### Defined in

[src/lib/Player.ts:72](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L72)

***

### doSeek()

> `abstract` `protected` **doSeek**(`position`): `Promise`\<`boolean`\>

Implementations shall seek to the specified position.

#### Parameters

• **position**: `number`

The position, in seconds, to seek to.

#### Returns

`Promise`\<`boolean`\>

Promise that resolves to `true` if seek operation was successful; `false` otherwise.

#### Defined in

[src/lib/Player.ts:86](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L86)

***

### doSetVolume()

> `abstract` `protected` **doSetVolume**(`volume`): `Promise`\<`boolean`\>

Implementations shall set the volume level and muted state to the values specified in the `volume` object param.

#### Parameters

• **volume**: [`Volume`](../interfaces/Volume.md)

(object)
  - `level`: (number) volume level between 0-100.
  - `muted`: (boolean) muted state.

#### Returns

`Promise`\<`boolean`\>

Promise that resolves to `true` when volume was set; `false` otherwise.

#### Defined in

[src/lib/Player.ts:95](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L95)

***

### doStop()

> `abstract` `protected` **doStop**(): `Promise`\<`boolean`\>

Implementations shall stop current playback or cancel any pending playback (such as when
a video is still being loaded).

#### Returns

`Promise`\<`boolean`\>

Promise that resolves to `true` when playback was stopped or pending playback was cancelled; `false` otherwise.

#### Defined in

[src/lib/Player.ts:79](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L79)

***

### getDuration()

> **getDuration**(): `Promise`\<`number`\>

Calls `doGetDuration()`

#### Returns

`Promise`\<`number`\>

Promise returned by `doGetDuration()`.

#### Defined in

[src/lib/Player.ts:360](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L360)

***

### getNavInfo()

> **getNavInfo**(): [`PlayerNavInfo`](../interfaces/PlayerNavInfo.md)

#### Returns

[`PlayerNavInfo`](../interfaces/PlayerNavInfo.md)

#### Defined in

[src/lib/Player.ts:400](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L400)

***

### getPosition()

> **getPosition**(): `Promise`\<`number`\>

Calls `doGetPosition()`.

#### Returns

`Promise`\<`number`\>

Promise returned by `doGetPosition()`.

#### Defined in

[src/lib/Player.ts:352](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L352)

***

### getState()

> **getState**(): `Promise`\<[`PlayerState`](../interfaces/PlayerState.md)\>

#### Returns

`Promise`\<[`PlayerState`](../interfaces/PlayerState.md)\>

#### Defined in

[src/lib/Player.ts:408](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L408)

***

### getVolume()

> **getVolume**(): `Promise`\<[`Volume`](../interfaces/Volume.md)\>

Calls `doGetVolume()`.

#### Returns

`Promise`\<[`Volume`](../interfaces/Volume.md)\>

Promise that resolves to the resolved result of `doGetVolume()`.

#### Defined in

[src/lib/Player.ts:340](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L340)

***

### next()

> **next**(`AID`?): `Promise`\<`boolean`\>

Plays the next video in the player queue. If already reached end of queue,
play autoplay video if available. Notifies senders on successful playback.

#### Parameters

• **AID?**: `null` \| `number`

Internal use; do not specify.

#### Returns

`Promise`\<`boolean`\>

Promise that resolves to `true` on playback of the next video; `false` otherwise.

#### Defined in

[src/lib/Player.ts:251](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L251)

***

### notifyExternalStateChange()

> **notifyExternalStateChange**(`newStatus`?): `Promise`\<`void`\>

Signals that there has been a change in player state that is not captured elsewhere
in the `Player` implementation. This method will update the `Player` instance's
internal state and, if necessary, notifies senders of the new player state.

#### Parameters

• **newStatus?**: [`PlayerStatus`](../type-aliases/PlayerStatus.md)

The new player status; `undefined` for no change in player status.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/Player.ts:439](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L439)

***

### pause()

> **pause**(`AID`?): `Promise`\<`boolean`\>

Calls `doPause()`; if returned Promise resolves to `true`, notifies connected senders that playback has paused.

#### Parameters

• **AID?**: `null` \| `number`

Internal use; do not specify.

#### Returns

`Promise`\<`boolean`\>

Promise that resolves to the resolved result of `doPause()`, or `false` if no playback is in progress.

#### Defined in

[src/lib/Player.ts:164](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L164)

***

### play()

> **play**(`video`, `position`?, `AID`?): `Promise`\<`boolean`\>

Notifies senders that player is in 'loading' state, then calls `doPlay()`;
if returned Promise resolves to `true`, notifies senders that playback has started.

#### Parameters

• **video**: [`Video`](../interfaces/Video.md)

The target video to play.

• **position?**: `number`

The position (in seconds) from which to start playback.

• **AID?**: `null` \| `number`

Internal use; do not specify.

#### Returns

`Promise`\<`boolean`\>

Promise that resolves to the resolved result of `doPlay()`.

#### Defined in

[src/lib/Player.ts:141](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L141)

***

### previous()

> **previous**(`AID`?): `Promise`\<`boolean`\>

Plays the previous video in the player queue. Notifies senders on successful playback.

#### Parameters

• **AID?**: `null` \| `number`

Internal use; do not specify.

#### Returns

`Promise`\<`boolean`\>

Promise that resolves to `true` on playback of the previous video; `false` otherwise.

#### Defined in

[src/lib/Player.ts:283](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L283)

***

### reset()

> **reset**(`AID`?): `Promise`\<`void`\>

Resets the player to Idle state.

#### Parameters

• **AID?**: `null` \| `number`

Internal use; do not specify.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/Player.ts:327](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L327)

***

### resume()

> **resume**(`AID`?): `Promise`\<`boolean`\>

Calls `doResume()`; if returned Promise resolves to `true`, notifies connected senders that playback has resumed.

#### Parameters

• **AID?**: `null` \| `number`

Internal use; do not specify.

#### Returns

`Promise`\<`boolean`\>

Promise that resolves to the resolved result of `doResume()`, or `false` if player is not in paused state.

#### Defined in

[src/lib/Player.ts:181](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L181)

***

### seek()

> **seek**(`position`, `AID`?): `Promise`\<`boolean`\>

Calls `doSeek()`; if returned Promise resolves to `true`, notifies connected senders of new seek position.

#### Parameters

• **position**: `number`

The position, in seconds, to seek to.

• **AID?**: `null` \| `number`

Internal use; do not specify.

#### Returns

`Promise`\<`boolean`\>

Promise that resolves to the resolved result of `doSeek()`; `false` if no playback is in progress or otherwise not in paused state.

#### Defined in

[src/lib/Player.ts:225](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L225)

***

### setVolume()

> **setVolume**(`volume`, `AID`?): `Promise`\<`boolean`\>

Calls `doSetVolume()`; if returned Promise resolves to `true`, notifies connected senders of new volume level.

#### Parameters

• **volume**: [`Volume`](../interfaces/Volume.md)

(object)
  - `level`: (number) volume level between 0-100.
  - `muted`: (boolean) muted state.

• **AID?**: `null` \| `number`

Internal use; do not specify.

#### Returns

`Promise`\<`boolean`\>

Promise that resolves to the resolved result of `doSetVolume()`.

#### Defined in

[src/lib/Player.ts:307](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L307)

***

### stop()

> **stop**(`AID`?): `Promise`\<`boolean`\>

Calls `doStop()`; if returned Promise resolves to `true`, notifies connected senders that playback has stopped.

#### Parameters

• **AID?**: `null` \| `number`

Internal use; do not specify.

#### Returns

`Promise`\<`boolean`\>

A Promise that resolves to the result of `doStop()`; `true` if player already in stopped or idle state.

#### Defined in

[src/lib/Player.ts:206](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L206)

## Events

### on()

#### on(event, listener)

> **on**(`event`, `listener`): `this`

Adds the `listener` function to the end of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName` and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
const myEE = new EventEmitter();
myEE.on('foo', () => console.log('a'));
myEE.prependListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

##### Parameters

• **event**: `string` \| `symbol`

• **listener**

The callback function

##### Returns

`this`

##### Since

v0.1.101

##### Overrides

`EventEmitter.on`

##### Defined in

[src/lib/Player.ts:444](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L444)

#### on(event, listener)

> **on**(`event`, `listener`): `this`

Emitted when there has been a change in player state.

##### Parameters

• **event**: `"state"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.on`

##### Defined in

[src/lib/Player.ts:450](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/Player.ts#L450)
