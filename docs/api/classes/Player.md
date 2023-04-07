[yt-cast-receiver](../README.md) / Player

# Class: Player

`Player` abstract class that leaves playback functionality to implementors.

## Hierarchy

- `EventEmitter`

  ↳ **`Player`**

## Table of contents

### Constructors

- [constructor](Player.md#constructor)

### Accessors

- [autoplayMode](Player.md#autoplaymode)
- [cpn](Player.md#cpn)
- [logger](Player.md#logger)
- [playlist](Player.md#playlist)
- [status](Player.md#status)

### Methods

- [doGetDuration](Player.md#dogetduration)
- [doGetPosition](Player.md#dogetposition)
- [doGetVolume](Player.md#dogetvolume)
- [doPause](Player.md#dopause)
- [doPlay](Player.md#doplay)
- [doResume](Player.md#doresume)
- [doSeek](Player.md#doseek)
- [doSetVolume](Player.md#dosetvolume)
- [doStop](Player.md#dostop)
- [getDuration](Player.md#getduration)
- [getNavInfo](Player.md#getnavinfo)
- [getPosition](Player.md#getposition)
- [getState](Player.md#getstate)
- [getVolume](Player.md#getvolume)
- [next](Player.md#next)
- [notifyExternalStateChange](Player.md#notifyexternalstatechange)
- [pause](Player.md#pause)
- [play](Player.md#play)
- [previous](Player.md#previous)
- [reset](Player.md#reset)
- [resume](Player.md#resume)
- [seek](Player.md#seek)
- [setLogger](Player.md#setlogger)
- [setVolume](Player.md#setvolume)
- [stop](Player.md#stop)

### Events

- [on](Player.md#on)

## Constructors

### constructor

• **new Player**()

#### Overrides

EventEmitter.constructor

#### Defined in

[lib/Player.ts:112](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L112)

## Accessors

### autoplayMode

• `get` **autoplayMode**(): [`AutoplayMode`](../README.md#autoplaymode)

#### Returns

[`AutoplayMode`](../README.md#autoplaymode)

#### Defined in

[lib/Player.ts:332](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L332)

___

### cpn

• `get` **cpn**(): `string`

#### Returns

`string`

#### Defined in

[lib/Player.ts:336](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L336)

___

### logger

• `get` **logger**(): [`Logger`](../interfaces/Logger.md)

#### Returns

[`Logger`](../interfaces/Logger.md)

#### Defined in

[lib/Player.ts:324](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L324)

___

### playlist

• `get` **playlist**(): [`Playlist`](Playlist.md)

#### Returns

[`Playlist`](Playlist.md)

#### Defined in

[lib/Player.ts:340](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L340)

___

### status

• `get` **status**(): [`PlayerStatus`](../README.md#playerstatus)

#### Returns

[`PlayerStatus`](../README.md#playerstatus)

#### Defined in

[lib/Player.ts:328](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L328)

## Methods

### doGetDuration

▸ `Protected` `Abstract` **doGetDuration**(): `Promise`<`number`\>

Implementations shall return the duration of the current video.

#### Returns

`Promise`<`number`\>

Promise that resolves to the duration of the current video (in seconds).

#### Defined in

[lib/Player.ts:110](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L110)

___

### doGetPosition

▸ `Protected` `Abstract` **doGetPosition**(): `Promise`<`number`\>

Implementations shall return the current playback position.

#### Returns

`Promise`<`number`\>

Promise that resolves to the current playback position (in seconds).

#### Defined in

[lib/Player.ts:104](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L104)

___

### doGetVolume

▸ `Protected` `Abstract` **doGetVolume**(): `Promise`<`number`\>

Implementations shall return the current volume level.

#### Returns

`Promise`<`number`\>

Promise that resolves to the value of the current volume level (0 - 100).

#### Defined in

[lib/Player.ts:98](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L98)

___

### doPause

▸ `Protected` `Abstract` **doPause**(): `Promise`<`boolean`\>

Implementations shall pause current playback.

#### Returns

`Promise`<`boolean`\>

Promise that resolves to `true` when playback was paused; `false` otherwise.

#### Defined in

[lib/Player.ts:66](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L66)

___

### doPlay

▸ `Protected` `Abstract` **doPlay**(`videoId`, `position`): `Promise`<`boolean`\>

Implementations shall play the target video from the specified position.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoId` | `string` | Id of the target video. |
| `position` | `number` | The position, in seconds, from which to start playback. |

#### Returns

`Promise`<`boolean`\>

Promise that resolves to `true` on successful playback; `false` otherwise.

#### Defined in

[lib/Player.ts:60](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L60)

___

### doResume

▸ `Protected` `Abstract` **doResume**(): `Promise`<`boolean`\>

Implementations shall resume paused playback.

#### Returns

`Promise`<`boolean`\>

Promise that resolves to `true` when playback was resumed; `false` otherwise.

#### Defined in

[lib/Player.ts:72](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L72)

___

### doSeek

▸ `Protected` `Abstract` **doSeek**(`position`): `Promise`<`boolean`\>

Implementations shall seek to the specified position.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `position` | `number` | The position, in seconds, to seek to. |

#### Returns

`Promise`<`boolean`\>

Promise that resolves to `true` if seek operation was successful; `false` otherwise.

#### Defined in

[lib/Player.ts:85](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L85)

___

### doSetVolume

▸ `Protected` `Abstract` **doSetVolume**(`volume`): `Promise`<`boolean`\>

Implementations shall set the volume to the specified level.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `volume` | `number` | The volume level to set (0 - 100). |

#### Returns

`Promise`<`boolean`\>

Promise that resolves to `true` when volume was set; `false` otherwise.

#### Defined in

[lib/Player.ts:92](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L92)

___

### doStop

▸ `Protected` `Abstract` **doStop**(): `Promise`<`boolean`\>

Implementations shall stop current playback.

#### Returns

`Promise`<`boolean`\>

Promise that resolves to `true` when playback was stopped; `false` otherwise.

#### Defined in

[lib/Player.ts:78](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L78)

___

### getDuration

▸ **getDuration**(): `Promise`<`number`\>

Calls `doGetDuration()`

#### Returns

`Promise`<`number`\>

Promise returned by `doGetDuration()`.

#### Defined in

[lib/Player.ts:320](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L320)

___

### getNavInfo

▸ **getNavInfo**(): [`PlayerNavInfo`](../interfaces/PlayerNavInfo.md)

#### Returns

[`PlayerNavInfo`](../interfaces/PlayerNavInfo.md)

#### Defined in

[lib/Player.ts:351](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L351)

___

### getPosition

▸ **getPosition**(): `Promise`<`number`\>

Calls `doGetPosition()`.

#### Returns

`Promise`<`number`\>

Promise returned by `doGetPosition()`.

#### Defined in

[lib/Player.ts:312](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L312)

___

### getState

▸ **getState**(): `Promise`<[`PlayerState`](../interfaces/PlayerState.md)\>

#### Returns

`Promise`<[`PlayerState`](../interfaces/PlayerState.md)\>

#### Defined in

[lib/Player.ts:359](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L359)

___

### getVolume

▸ **getVolume**(): `Promise`<`number`\>

Calls `doGetVolume()`.

#### Returns

`Promise`<`number`\>

Promise that resolves to the resolved result of `doGetVolume()` (0-100).

#### Defined in

[lib/Player.ts:303](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L303)

___

### next

▸ **next**(`AID?`): `Promise`<`boolean`\>

Plays the next video in the player queue. If already reached end of queue,
play autoplay video if available. Notifies senders on successful playback.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `AID?` | ``null`` \| `number` | Internal use; do not specify. |

#### Returns

`Promise`<`boolean`\>

Promise that resolves to `true` on playback of the next video; `false` otherwise.

#### Defined in

[lib/Player.ts:229](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L229)

___

### notifyExternalStateChange

▸ **notifyExternalStateChange**(`newStatus?`): `Promise`<`void`\>

Signals that there has been a change in player state that is not captured elsewhere
in the `Player` implementation. This method will update the `Player` instance's
internal state and, if necessary, notifies senders of the new player state.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newStatus?` | [`PlayerStatus`](../README.md#playerstatus) | The new player status; `undefined` for no change in player status. |

#### Returns

`Promise`<`void`\>

#### Defined in

[lib/Player.ts:396](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L396)

___

### pause

▸ **pause**(`AID?`): `Promise`<`boolean`\>

Calls `doPause()`; if returned Promise resolves to `true`, notifies connected senders that playback has paused.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `AID?` | ``null`` \| `number` | Internal use; do not specify. |

#### Returns

`Promise`<`boolean`\>

Promise that resolves to the resolved result of `doPause()`, or `false` if no playback is in progress.

#### Defined in

[lib/Player.ts:148](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L148)

___

### play

▸ **play**(`videoId`, `position?`, `AID?`): `Promise`<`boolean`\>

Notifies senders that player is in 'loading' state, then calls `doPlay()`;
if returned Promise resolves to `true`, notifies senders that playback has started.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoId` | `string` | Id of the target video. |
| `position?` | `number` | The position (in seconds) from which to start playback. |
| `AID?` | ``null`` \| `number` | Internal use; do not specify. |

#### Returns

`Promise`<`boolean`\>

Promise that resolves to the resolved result of `doPlay()`.

#### Defined in

[lib/Player.ts:133](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L133)

___

### previous

▸ **previous**(`AID?`): `Promise`<`boolean`\>

Plays the previous video in the player queue. Notifies senders on successful playback.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `AID?` | ``null`` \| `number` | Internal use; do not specify. |

#### Returns

`Promise`<`boolean`\>

Promise that resolves to `true` on playback of the previous video; `false` otherwise.

#### Defined in

[lib/Player.ts:258](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L258)

___

### reset

▸ **reset**(`AID?`): `Promise`<`void`\>

Resets the player to Idle state.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `AID?` | ``null`` \| `number` | Internal use; do not specify. |

#### Returns

`Promise`<`void`\>

#### Defined in

[lib/Player.ts:291](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L291)

___

### resume

▸ **resume**(`AID?`): `Promise`<`boolean`\>

Calls `doResume()`; if returned Promise resolves to `true`, notifies connected senders that playback has resumed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `AID?` | ``null`` \| `number` | Internal use; do not specify. |

#### Returns

`Promise`<`boolean`\>

Promise that resolves to the resolved result of `doResume()`, or `false` if player is not in paused state.

#### Defined in

[lib/Player.ts:165](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L165)

___

### seek

▸ **seek**(`position`, `AID?`): `Promise`<`boolean`\>

Calls `doSeek()`; if returned Promise resolves to `true`, notifies connected senders of new seek position.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `position` | `number` | The position, in seconds, to seek to. |
| `AID?` | ``null`` \| `number` | Internal use; do not specify. |

#### Returns

`Promise`<`boolean`\>

Promise that resolves to the resolved result of `doSeek()`.

#### Defined in

[lib/Player.ts:208](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L208)

___

### setLogger

▸ **setLogger**(`logger`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `logger` | [`Logger`](../interfaces/Logger.md) |

#### Returns

`void`

#### Defined in

[lib/Player.ts:121](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L121)

___

### setVolume

▸ **setVolume**(`volume`, `AID?`): `Promise`<`boolean`\>

Calls `doSetVolume()`; if returned Promise resolves to `true`, notifies connected senders of new volume level.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `volume` | `number` | Volume level to set (0-100). |
| `AID?` | ``null`` \| `number` | Internal use; do not specify. |

#### Returns

`Promise`<`boolean`\>

Promise that resolves to the resolved result of `doSetVolume()`.

#### Defined in

[lib/Player.ts:276](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L276)

___

### stop

▸ **stop**(`AID?`): `Promise`<`boolean`\>

Calls `doStop()`; if returned Promise resolves to `true`, notifies connected senders that playback has stopped.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `AID?` | ``null`` \| `number` | Internal use; do not specify. |

#### Returns

`Promise`<`boolean`\>

A Promise that resolves to `true` when playback is stopped; `false` otherwise.

#### Defined in

[lib/Player.ts:189](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L189)

## Events

### on

▸ **on**(`event`, `listener`): [`Player`](Player.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`Player`](Player.md)

#### Overrides

EventEmitter.on

#### Defined in

[lib/Player.ts:401](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L401)

▸ **on**(`event`, `listener`): [`Player`](Player.md)

Emitted when there has been a change in player state.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"state"`` |
| `listener` | (`data`: { `AID`: `string` ; `current`: [`PlayerState`](../interfaces/PlayerState.md) ; `previous`: ``null`` \| [`PlayerState`](../interfaces/PlayerState.md)  }) => `void` |

#### Returns

[`Player`](Player.md)

#### Overrides

EventEmitter.on

#### Defined in

[lib/Player.ts:407](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L407)
