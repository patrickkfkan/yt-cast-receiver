[yt-cast-receiver](../README.md) / Playlist

# Class: Playlist

Representation of the player queue, which appears on sender apps that support
the `queue` capability (basically the YouTube mobile app).

The naming choice of 'Playlist' is for consistency with YouTube's API.
You may think of the queue as a form of playlist.

Treat all playlist properties as read-only.

## Table of contents

### Accessors

- [autoplay](Playlist.md#autoplay)
- [ctt](Playlist.md#ctt)
- [current](Playlist.md#current)
- [currentIndex](Playlist.md#currentindex)
- [hasNext](Playlist.md#hasnext)
- [hasPrevious](Playlist.md#hasprevious)
- [id](Playlist.md#id)
- [isLast](Playlist.md#islast)
- [length](Playlist.md#length)
- [videoIds](Playlist.md#videoids)

## Accessors

### autoplay

• `get` **autoplay**(): [`AutoplayInfo`](../README.md#autoplayinfo)

Autoplay info.

#### Returns

[`AutoplayInfo`](../README.md#autoplayinfo)

#### Defined in

[lib/app/Playlist.ts:209](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/app/Playlist.ts#L209)

___

### ctt

• `get` **ctt**(): ``null`` \| `string`

Client credentials transfer token.

#### Returns

``null`` \| `string`

#### Defined in

[lib/app/Playlist.ts:153](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/app/Playlist.ts#L153)

___

### current

• `get` **current**(): ``null`` \| `string`

The Id of the video at current index, or `null` if none.

#### Returns

``null`` \| `string`

#### Defined in

[lib/app/Playlist.ts:160](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/app/Playlist.ts#L160)

___

### currentIndex

• `get` **currentIndex**(): `number`

Position of the currently selected video; -1 if none selected or playlist is empty.

#### Returns

`number`

#### Defined in

[lib/app/Playlist.ts:174](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/app/Playlist.ts#L174)

___

### hasNext

• `get` **hasNext**(): `boolean`

Whether there is video after current index.

#### Returns

`boolean`

#### Defined in

[lib/app/Playlist.ts:195](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/app/Playlist.ts#L195)

___

### hasPrevious

• `get` **hasPrevious**(): `boolean`

Whether there is video before current index.

#### Returns

`boolean`

#### Defined in

[lib/app/Playlist.ts:202](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/app/Playlist.ts#L202)

___

### id

• `get` **id**(): ``null`` \| `string`

Id of the playlist.

#### Returns

``null`` \| `string`

#### Defined in

[lib/app/Playlist.ts:146](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/app/Playlist.ts#L146)

___

### isLast

• `get` **isLast**(): `boolean`

Whether current index points to the last video in the playlist.

#### Returns

`boolean`

#### Defined in

[lib/app/Playlist.ts:188](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/app/Playlist.ts#L188)

___

### length

• `get` **length**(): `number`

The number of videos in the playlist.

#### Returns

`number`

#### Defined in

[lib/app/Playlist.ts:181](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/app/Playlist.ts#L181)

___

### videoIds

• `get` **videoIds**(): `string`[]

The Ids of the videos in the playlist.

#### Returns

`string`[]

#### Defined in

[lib/app/Playlist.ts:167](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/app/Playlist.ts#L167)
