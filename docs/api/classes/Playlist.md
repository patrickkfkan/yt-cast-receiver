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

[lib/app/Playlist.ts:198](https://github.com/patrickkfkan/yt-cast-receiver/blob/6b07310/src/lib/app/Playlist.ts#L198)

___

### autoplayMode

• `get` **autoplayMode**(): [`AutoplayMode`](../README.md#autoplaymode)

#### Returns

[`AutoplayMode`](../README.md#autoplaymode)

#### Defined in

[lib/app/Playlist.ts:209](https://github.com/patrickkfkan/yt-cast-receiver/blob/6b07310/src/lib/app/Playlist.ts#L209)

___

### current

• `get` **current**(): ``null`` \| [`Video`](../interfaces/Video.md)

#### Returns

``null`` \| [`Video`](../interfaces/Video.md)

#### Defined in

[lib/app/Playlist.ts:205](https://github.com/patrickkfkan/yt-cast-receiver/blob/6b07310/src/lib/app/Playlist.ts#L205)

___

### hasNext

• `get` **hasNext**(): `boolean`

#### Returns

`boolean`

#### Defined in

[lib/app/Playlist.ts:222](https://github.com/patrickkfkan/yt-cast-receiver/blob/6b07310/src/lib/app/Playlist.ts#L222)

___

### hasPrevious

• `get` **hasPrevious**(): `boolean`

#### Returns

`boolean`

#### Defined in

[lib/app/Playlist.ts:218](https://github.com/patrickkfkan/yt-cast-receiver/blob/6b07310/src/lib/app/Playlist.ts#L218)

___

### id

• `get` **id**(): ``null`` \| `string`

Id of the playlist.

#### Returns

``null`` \| `string`

#### Defined in

[lib/app/Playlist.ts:140](https://github.com/patrickkfkan/yt-cast-receiver/blob/6b07310/src/lib/app/Playlist.ts#L140)

___

### isLast

• `get` **isLast**(): `boolean`

#### Returns

`boolean`

#### Defined in

[lib/app/Playlist.ts:213](https://github.com/patrickkfkan/yt-cast-receiver/blob/6b07310/src/lib/app/Playlist.ts#L213)

___

### length

• `get` **length**(): `number`

The number of videos in the playlist.

#### Returns

`number`

#### Defined in

[lib/app/Playlist.ts:154](https://github.com/patrickkfkan/yt-cast-receiver/blob/6b07310/src/lib/app/Playlist.ts#L154)

___

### videoIds

• `get` **videoIds**(): `string`[]

The Ids of the videos in the playlist.

#### Returns

`string`[]

#### Defined in

[lib/app/Playlist.ts:147](https://github.com/patrickkfkan/yt-cast-receiver/blob/6b07310/src/lib/app/Playlist.ts#L147)

## Methods

### getState

▸ **getState**(): [`PlaylistState`](../interfaces/PlaylistState.md)

#### Returns

[`PlaylistState`](../interfaces/PlaylistState.md)

#### Defined in

[lib/app/Playlist.ts:178](https://github.com/patrickkfkan/yt-cast-receiver/blob/6b07310/src/lib/app/Playlist.ts#L178)
