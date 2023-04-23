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

[lib/app/Playlist.ts:311](https://github.com/patrickkfkan/yt-cast-receiver/blob/64eea67/src/lib/app/Playlist.ts#L311)

___

### autoplayMode

• `get` **autoplayMode**(): [`AutoplayMode`](../README.md#autoplaymode)

#### Returns

[`AutoplayMode`](../README.md#autoplaymode)

#### Defined in

[lib/app/Playlist.ts:322](https://github.com/patrickkfkan/yt-cast-receiver/blob/64eea67/src/lib/app/Playlist.ts#L322)

___

### current

• `get` **current**(): ``null`` \| [`Video`](../interfaces/Video.md)

#### Returns

``null`` \| [`Video`](../interfaces/Video.md)

#### Defined in

[lib/app/Playlist.ts:318](https://github.com/patrickkfkan/yt-cast-receiver/blob/64eea67/src/lib/app/Playlist.ts#L318)

___

### hasNext

• `get` **hasNext**(): `boolean`

#### Returns

`boolean`

#### Defined in

[lib/app/Playlist.ts:335](https://github.com/patrickkfkan/yt-cast-receiver/blob/64eea67/src/lib/app/Playlist.ts#L335)

___

### hasPrevious

• `get` **hasPrevious**(): `boolean`

#### Returns

`boolean`

#### Defined in

[lib/app/Playlist.ts:331](https://github.com/patrickkfkan/yt-cast-receiver/blob/64eea67/src/lib/app/Playlist.ts#L331)

___

### id

• `get` **id**(): ``null`` \| `string`

Id of the playlist.

#### Returns

``null`` \| `string`

#### Defined in

[lib/app/Playlist.ts:253](https://github.com/patrickkfkan/yt-cast-receiver/blob/64eea67/src/lib/app/Playlist.ts#L253)

___

### isLast

• `get` **isLast**(): `boolean`

#### Returns

`boolean`

#### Defined in

[lib/app/Playlist.ts:326](https://github.com/patrickkfkan/yt-cast-receiver/blob/64eea67/src/lib/app/Playlist.ts#L326)

___

### isUpdating

• `get` **isUpdating**(): `boolean`

#### Returns

`boolean`

#### Defined in

[lib/app/Playlist.ts:342](https://github.com/patrickkfkan/yt-cast-receiver/blob/64eea67/src/lib/app/Playlist.ts#L342)

___

### length

• `get` **length**(): `number`

The number of videos in the playlist.

#### Returns

`number`

#### Defined in

[lib/app/Playlist.ts:267](https://github.com/patrickkfkan/yt-cast-receiver/blob/64eea67/src/lib/app/Playlist.ts#L267)

___

### videoIds

• `get` **videoIds**(): `string`[]

The Ids of the videos in the playlist.

#### Returns

`string`[]

#### Defined in

[lib/app/Playlist.ts:260](https://github.com/patrickkfkan/yt-cast-receiver/blob/64eea67/src/lib/app/Playlist.ts#L260)

## Methods

### getState

▸ **getState**(): [`PlaylistState`](../interfaces/PlaylistState.md)

#### Returns

[`PlaylistState`](../interfaces/PlaylistState.md)

#### Defined in

[lib/app/Playlist.ts:291](https://github.com/patrickkfkan/yt-cast-receiver/blob/64eea67/src/lib/app/Playlist.ts#L291)

___

### on

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

[lib/app/Playlist.ts:353](https://github.com/patrickkfkan/yt-cast-receiver/blob/64eea67/src/lib/app/Playlist.ts#L353)

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

[lib/app/Playlist.ts:354](https://github.com/patrickkfkan/yt-cast-receiver/blob/64eea67/src/lib/app/Playlist.ts#L354)

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

[lib/app/Playlist.ts:355](https://github.com/patrickkfkan/yt-cast-receiver/blob/64eea67/src/lib/app/Playlist.ts#L355)
