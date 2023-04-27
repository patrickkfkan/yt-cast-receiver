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

[src/lib/app/Playlist.ts:318](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/app/Playlist.ts#L318)

___

### autoplayMode

• `get` **autoplayMode**(): [`AutoplayMode`](../README.md#autoplaymode)

#### Returns

[`AutoplayMode`](../README.md#autoplaymode)

#### Defined in

[src/lib/app/Playlist.ts:329](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/app/Playlist.ts#L329)

___

### current

• `get` **current**(): ``null`` \| [`Video`](../interfaces/Video.md)

#### Returns

``null`` \| [`Video`](../interfaces/Video.md)

#### Defined in

[src/lib/app/Playlist.ts:325](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/app/Playlist.ts#L325)

___

### hasNext

• `get` **hasNext**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/app/Playlist.ts:342](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/app/Playlist.ts#L342)

___

### hasPrevious

• `get` **hasPrevious**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/app/Playlist.ts:338](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/app/Playlist.ts#L338)

___

### id

• `get` **id**(): ``null`` \| `string`

Id of the playlist.

#### Returns

``null`` \| `string`

#### Defined in

[src/lib/app/Playlist.ts:260](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/app/Playlist.ts#L260)

___

### isLast

• `get` **isLast**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/app/Playlist.ts:333](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/app/Playlist.ts#L333)

___

### isUpdating

• `get` **isUpdating**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/app/Playlist.ts:349](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/app/Playlist.ts#L349)

___

### length

• `get` **length**(): `number`

The number of videos in the playlist.

#### Returns

`number`

#### Defined in

[src/lib/app/Playlist.ts:274](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/app/Playlist.ts#L274)

___

### videoIds

• `get` **videoIds**(): `string`[]

The Ids of the videos in the playlist.

#### Returns

`string`[]

#### Defined in

[src/lib/app/Playlist.ts:267](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/app/Playlist.ts#L267)

## Methods

### getState

▸ **getState**(): [`PlaylistState`](../interfaces/PlaylistState.md)

#### Returns

[`PlaylistState`](../interfaces/PlaylistState.md)

#### Defined in

[src/lib/app/Playlist.ts:298](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/app/Playlist.ts#L298)

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

[src/lib/app/Playlist.ts:360](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/app/Playlist.ts#L360)

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

[src/lib/app/Playlist.ts:361](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/app/Playlist.ts#L361)

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

[src/lib/app/Playlist.ts:362](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/app/Playlist.ts#L362)
