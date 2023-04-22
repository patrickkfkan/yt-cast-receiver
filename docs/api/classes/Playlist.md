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
- [isUpdating](Playlist.md#isupdating)
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

[lib/app/Playlist.ts:226](https://github.com/patrickkfkan/yt-cast-receiver/blob/7694e32/src/lib/app/Playlist.ts#L226)

___

### autoplayMode

• `get` **autoplayMode**(): [`AutoplayMode`](../README.md#autoplaymode)

#### Returns

[`AutoplayMode`](../README.md#autoplaymode)

#### Defined in

[lib/app/Playlist.ts:237](https://github.com/patrickkfkan/yt-cast-receiver/blob/7694e32/src/lib/app/Playlist.ts#L237)

___

### current

• `get` **current**(): ``null`` \| [`Video`](../interfaces/Video.md)

#### Returns

``null`` \| [`Video`](../interfaces/Video.md)

#### Defined in

[lib/app/Playlist.ts:233](https://github.com/patrickkfkan/yt-cast-receiver/blob/7694e32/src/lib/app/Playlist.ts#L233)

___

### hasNext

• `get` **hasNext**(): `boolean`

#### Returns

`boolean`

#### Defined in

[lib/app/Playlist.ts:250](https://github.com/patrickkfkan/yt-cast-receiver/blob/7694e32/src/lib/app/Playlist.ts#L250)

___

### hasPrevious

• `get` **hasPrevious**(): `boolean`

#### Returns

`boolean`

#### Defined in

[lib/app/Playlist.ts:246](https://github.com/patrickkfkan/yt-cast-receiver/blob/7694e32/src/lib/app/Playlist.ts#L246)

___

### id

• `get` **id**(): ``null`` \| `string`

Id of the playlist.

#### Returns

``null`` \| `string`

#### Defined in

[lib/app/Playlist.ts:168](https://github.com/patrickkfkan/yt-cast-receiver/blob/7694e32/src/lib/app/Playlist.ts#L168)

___

### isLast

• `get` **isLast**(): `boolean`

#### Returns

`boolean`

#### Defined in

[lib/app/Playlist.ts:241](https://github.com/patrickkfkan/yt-cast-receiver/blob/7694e32/src/lib/app/Playlist.ts#L241)

___

### isUpdating

• `get` **isUpdating**(): `boolean`

#### Returns

`boolean`

#### Defined in

[lib/app/Playlist.ts:257](https://github.com/patrickkfkan/yt-cast-receiver/blob/7694e32/src/lib/app/Playlist.ts#L257)

___

### length

• `get` **length**(): `number`

The number of videos in the playlist.

#### Returns

`number`

#### Defined in

[lib/app/Playlist.ts:182](https://github.com/patrickkfkan/yt-cast-receiver/blob/7694e32/src/lib/app/Playlist.ts#L182)

___

### videoIds

• `get` **videoIds**(): `string`[]

The Ids of the videos in the playlist.

#### Returns

`string`[]

#### Defined in

[lib/app/Playlist.ts:175](https://github.com/patrickkfkan/yt-cast-receiver/blob/7694e32/src/lib/app/Playlist.ts#L175)

## Methods

### getState

▸ **getState**(): [`PlaylistState`](../interfaces/PlaylistState.md)

#### Returns

[`PlaylistState`](../interfaces/PlaylistState.md)

#### Defined in

[lib/app/Playlist.ts:206](https://github.com/patrickkfkan/yt-cast-receiver/blob/7694e32/src/lib/app/Playlist.ts#L206)
