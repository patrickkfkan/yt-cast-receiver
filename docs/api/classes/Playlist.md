[yt-cast-receiver](../README.md) / Playlist

# Class: Playlist

Representation of the player queue.

## Hierarchy

- `EventEmitter`

  ↳ **`Playlist`**

## Table of contents

### Accessors

- [autoplay](Playlist.md#autoplay)
- [autoplayMode](Playlist.md#autoplaymode)
- [current](Playlist.md#current)
- [hasNext](Playlist.md#hasnext)
- [hasPrevious](Playlist.md#hasprevious)
- [id](Playlist.md#id)
- [isLast](Playlist.md#islast)
- [isUpdating](Playlist.md#isupdating)
- [length](Playlist.md#length)
- [videoIds](Playlist.md#videoids)

### Methods

- [getState](Playlist.md#getstate)
- [on](Playlist.md#on)

## Accessors

### autoplay

• `get` **autoplay**(): ``null`` \| [`Video`](../interfaces/Video.md)

#### Returns

``null`` \| [`Video`](../interfaces/Video.md)

#### Defined in

[src/lib/app/Playlist.ts:333](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/Playlist.ts#L333)

___

### autoplayMode

• `get` **autoplayMode**(): [`AutoplayMode`](../README.md#autoplaymode)

#### Returns

[`AutoplayMode`](../README.md#autoplaymode)

#### Defined in

[src/lib/app/Playlist.ts:344](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/Playlist.ts#L344)

___

### current

• `get` **current**(): ``null`` \| [`Video`](../interfaces/Video.md)

#### Returns

``null`` \| [`Video`](../interfaces/Video.md)

#### Defined in

[src/lib/app/Playlist.ts:340](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/Playlist.ts#L340)

___

### hasNext

• `get` **hasNext**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/app/Playlist.ts:357](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/Playlist.ts#L357)

___

### hasPrevious

• `get` **hasPrevious**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/app/Playlist.ts:353](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/Playlist.ts#L353)

___

### id

• `get` **id**(): ``null`` \| `string`

Id of the playlist.

#### Returns

``null`` \| `string`

#### Defined in

[src/lib/app/Playlist.ts:273](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/Playlist.ts#L273)

___

### isLast

• `get` **isLast**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/app/Playlist.ts:348](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/Playlist.ts#L348)

___

### isUpdating

• `get` **isUpdating**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/app/Playlist.ts:364](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/Playlist.ts#L364)

___

### length

• `get` **length**(): `number`

The number of videos in the playlist.

#### Returns

`number`

#### Defined in

[src/lib/app/Playlist.ts:287](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/Playlist.ts#L287)

___

### videoIds

• `get` **videoIds**(): `string`[]

The Ids of the videos in the playlist.

#### Returns

`string`[]

#### Defined in

[src/lib/app/Playlist.ts:280](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/Playlist.ts#L280)

## Methods

### getState

▸ **getState**(): [`PlaylistState`](../interfaces/PlaylistState.md)

#### Returns

[`PlaylistState`](../interfaces/PlaylistState.md)

#### Defined in

[src/lib/app/Playlist.ts:311](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/Playlist.ts#L311)

___

### on

▸ **on**(`event`, `listener`): [`Playlist`](Playlist.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"autoplayModeChange"`` |
| `listener` | (`previous`: [`AutoplayMode`](../README.md#autoplaymode), `current`: [`AutoplayMode`](../README.md#autoplaymode)) => `void` |

#### Returns

[`Playlist`](Playlist.md)

#### Overrides

EventEmitter.on

#### Defined in

[src/lib/app/Playlist.ts:375](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/Playlist.ts#L375)

▸ **on**(`event`, `listener`): [`Playlist`](Playlist.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"playlistUpdated"`` |
| `listener` | (`event`: `Omit`<[`PlaylistEvent`](../interfaces/PlaylistEvent.md), ``"user"`` \| ``"videoId"``\>) => `void` |

#### Returns

[`Playlist`](Playlist.md)

#### Overrides

EventEmitter.on

#### Defined in

[src/lib/app/Playlist.ts:376](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/Playlist.ts#L376)

▸ **on**(`event`, `listener`): [`Playlist`](Playlist.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"playlistCleared"`` |
| `listener` | (`event`: `Omit`<[`PlaylistEvent`](../interfaces/PlaylistEvent.md), ``"videoId"`` \| ``"videoIds"``\>) => `void` |

#### Returns

[`Playlist`](Playlist.md)

#### Overrides

EventEmitter.on

#### Defined in

[src/lib/app/Playlist.ts:377](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/Playlist.ts#L377)

▸ **on**(`event`, `listener`): [`Playlist`](Playlist.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"videoSelected"`` \| ``"videoAdded"`` \| ``"videoRemoved"`` |
| `listener` | (`event`: `Omit`<[`PlaylistEvent`](../interfaces/PlaylistEvent.md), ``"videoIds"``\>) => `void` |

#### Returns

[`Playlist`](Playlist.md)

#### Overrides

EventEmitter.on

#### Defined in

[src/lib/app/Playlist.ts:378](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/Playlist.ts#L378)

▸ **on**(`event`, `listener`): [`Playlist`](Playlist.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"playlistSet"`` \| ``"playlistAdded"`` |
| `listener` | (`event`: `Omit`<[`PlaylistEvent`](../interfaces/PlaylistEvent.md), ``"videoId"``\>) => `void` |

#### Returns

[`Playlist`](Playlist.md)

#### Overrides

EventEmitter.on

#### Defined in

[src/lib/app/Playlist.ts:379](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/Playlist.ts#L379)
