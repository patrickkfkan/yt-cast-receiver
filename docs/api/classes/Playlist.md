[yt-cast-receiver](../README.md) / Playlist

# Class: Playlist

Representation of the player queue.

## Table of contents

### Accessors

- [autoplay](Playlist.md#autoplay)
- [autoplayMode](Playlist.md#autoplaymode)
- [current](Playlist.md#current)
- [hasNext](Playlist.md#hasnext)
- [hasPrevious](Playlist.md#hasprevious)
- [id](Playlist.md#id)
- [isLast](Playlist.md#islast)
- [length](Playlist.md#length)
- [videoIds](Playlist.md#videoids)

### Methods

- [getState](Playlist.md#getstate)

## Accessors

### autoplay

• `get` **autoplay**(): ``null`` \| [`Video`](../interfaces/Video.md)

#### Returns

``null`` \| [`Video`](../interfaces/Video.md)

#### Defined in

[lib/app/Playlist.ts:200](https://github.com/patrickkfkan/yt-cast-receiver/blob/77915bb/src/lib/app/Playlist.ts#L200)

___

### autoplayMode

• `get` **autoplayMode**(): [`AutoplayMode`](../README.md#autoplaymode)

#### Returns

[`AutoplayMode`](../README.md#autoplaymode)

#### Defined in

[lib/app/Playlist.ts:211](https://github.com/patrickkfkan/yt-cast-receiver/blob/77915bb/src/lib/app/Playlist.ts#L211)

___

### current

• `get` **current**(): ``null`` \| [`Video`](../interfaces/Video.md)

#### Returns

``null`` \| [`Video`](../interfaces/Video.md)

#### Defined in

[lib/app/Playlist.ts:207](https://github.com/patrickkfkan/yt-cast-receiver/blob/77915bb/src/lib/app/Playlist.ts#L207)

___

### hasNext

• `get` **hasNext**(): `boolean`

#### Returns

`boolean`

#### Defined in

[lib/app/Playlist.ts:224](https://github.com/patrickkfkan/yt-cast-receiver/blob/77915bb/src/lib/app/Playlist.ts#L224)

___

### hasPrevious

• `get` **hasPrevious**(): `boolean`

#### Returns

`boolean`

#### Defined in

[lib/app/Playlist.ts:220](https://github.com/patrickkfkan/yt-cast-receiver/blob/77915bb/src/lib/app/Playlist.ts#L220)

___

### id

• `get` **id**(): ``null`` \| `string`

Id of the playlist.

#### Returns

``null`` \| `string`

#### Defined in

[lib/app/Playlist.ts:142](https://github.com/patrickkfkan/yt-cast-receiver/blob/77915bb/src/lib/app/Playlist.ts#L142)

___

### isLast

• `get` **isLast**(): `boolean`

#### Returns

`boolean`

#### Defined in

[lib/app/Playlist.ts:215](https://github.com/patrickkfkan/yt-cast-receiver/blob/77915bb/src/lib/app/Playlist.ts#L215)

___

### length

• `get` **length**(): `number`

The number of videos in the playlist.

#### Returns

`number`

#### Defined in

[lib/app/Playlist.ts:156](https://github.com/patrickkfkan/yt-cast-receiver/blob/77915bb/src/lib/app/Playlist.ts#L156)

___

### videoIds

• `get` **videoIds**(): `string`[]

The Ids of the videos in the playlist.

#### Returns

`string`[]

#### Defined in

[lib/app/Playlist.ts:149](https://github.com/patrickkfkan/yt-cast-receiver/blob/77915bb/src/lib/app/Playlist.ts#L149)

## Methods

### getState

▸ **getState**(): [`PlaylistState`](../interfaces/PlaylistState.md)

#### Returns

[`PlaylistState`](../interfaces/PlaylistState.md)

#### Defined in

[lib/app/Playlist.ts:180](https://github.com/patrickkfkan/yt-cast-receiver/blob/77915bb/src/lib/app/Playlist.ts#L180)
