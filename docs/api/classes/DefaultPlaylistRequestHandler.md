[yt-cast-receiver](../README.md) / DefaultPlaylistRequestHandler

# Class: DefaultPlaylistRequestHandler

Default implementation of the `PlaylistRequestHandler` abstract class.
Uses [YouTube.js](https://github.com/LuanRT/YouTube.js) for fetching data
from YouTube.

## Hierarchy

- [`PlaylistRequestHandler`](PlaylistRequestHandler.md)

  ↳ **`DefaultPlaylistRequestHandler`**

## Table of contents

### Constructors

- [constructor](DefaultPlaylistRequestHandler.md#constructor)

### Accessors

- [logger](DefaultPlaylistRequestHandler.md#logger)

### Methods

- [getPreviousNextVideos](DefaultPlaylistRequestHandler.md#getpreviousnextvideos)
- [getPreviousNextVideosAbortable](DefaultPlaylistRequestHandler.md#getpreviousnextvideosabortable)
- [reset](DefaultPlaylistRequestHandler.md#reset)
- [setLogger](DefaultPlaylistRequestHandler.md#setlogger)

## Constructors

### constructor

• **new DefaultPlaylistRequestHandler**()

#### Overrides

[PlaylistRequestHandler](PlaylistRequestHandler.md).[constructor](PlaylistRequestHandler.md#constructor)

#### Defined in

[lib/app/DefaultPlaylistRequestHandler.ts:17](https://github.com/patrickkfkan/yt-cast-receiver/blob/5eecf1d/src/lib/app/DefaultPlaylistRequestHandler.ts#L17)

## Accessors

### logger

• `get` **logger**(): [`Logger`](../interfaces/Logger.md)

#### Returns

[`Logger`](../interfaces/Logger.md)

#### Inherited from

PlaylistRequestHandler.logger

#### Defined in

[lib/app/PlaylistRequestHandler.ts:58](https://github.com/patrickkfkan/yt-cast-receiver/blob/5eecf1d/src/lib/app/PlaylistRequestHandler.ts#L58)

## Methods

### getPreviousNextVideos

▸ **getPreviousNextVideos**(`target`, `playlist`): `Promise`<[`PlaylistPreviousNextVideos`](../interfaces/PlaylistPreviousNextVideos.md)\>

Given `target` video that resides in `playlist`, implementations shall fetch
the previous and next videos in the list.

If `target` is already the last video in the list, then fetch the autoplay video
in lieu of next video. You may optionally check first whether autoplay is enabled
with `playlist.autoplayMode`, and return `null` for next video if it is not.
The object returned by this method shall have the following properties:
- `previous`: object representing the previous video in the list, or `null` if there is none.
- `next`: object representing the next video in the list or autoplay video, as the case may be, or `null` if there is none.
Instead of `null`, you may simply omit `previous` or `next` from the returned result. But if provided, they
must satisfy the [Video](../interfaces/Video.md) interface constraint.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | [`Video`](../interfaces/Video.md) | Target video for which the previous and next videos are obtained. |
| `playlist` | [`Playlist`](Playlist.md) | The `Playlist` instance making the request. |

#### Returns

`Promise`<[`PlaylistPreviousNextVideos`](../interfaces/PlaylistPreviousNextVideos.md)\>

(Object)

#### Overrides

[PlaylistRequestHandler](PlaylistRequestHandler.md).[getPreviousNextVideos](PlaylistRequestHandler.md#getpreviousnextvideos)

#### Defined in

[lib/app/DefaultPlaylistRequestHandler.ts:32](https://github.com/patrickkfkan/yt-cast-receiver/blob/5eecf1d/src/lib/app/DefaultPlaylistRequestHandler.ts#L32)

___

### getPreviousNextVideosAbortable

▸ **getPreviousNextVideosAbortable**(`target`, `playlist`, `abortSignal`): `Promise`<[`PlaylistPreviousNextVideos`](../interfaces/PlaylistPreviousNextVideos.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`Video`](../interfaces/Video.md) |
| `playlist` | [`Playlist`](Playlist.md) |
| `abortSignal` | `AbortSignal` |

#### Returns

`Promise`<[`PlaylistPreviousNextVideos`](../interfaces/PlaylistPreviousNextVideos.md)\>

#### Inherited from

[PlaylistRequestHandler](PlaylistRequestHandler.md).[getPreviousNextVideosAbortable](PlaylistRequestHandler.md#getpreviousnextvideosabortable)

#### Defined in

[lib/app/PlaylistRequestHandler.ts:22](https://github.com/patrickkfkan/yt-cast-receiver/blob/5eecf1d/src/lib/app/PlaylistRequestHandler.ts#L22)

___

### reset

▸ **reset**(): `void`

Resets the handler to its initial state. By default, this method does nothing.
Implementations shall override this method if need be.

#### Returns

`void`

#### Overrides

[PlaylistRequestHandler](PlaylistRequestHandler.md).[reset](PlaylistRequestHandler.md#reset)

#### Defined in

[lib/app/DefaultPlaylistRequestHandler.ts:153](https://github.com/patrickkfkan/yt-cast-receiver/blob/5eecf1d/src/lib/app/DefaultPlaylistRequestHandler.ts#L153)

___

### setLogger

▸ **setLogger**(`logger`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `logger` | [`Logger`](../interfaces/Logger.md) |

#### Returns

`void`

#### Inherited from

[PlaylistRequestHandler](PlaylistRequestHandler.md).[setLogger](PlaylistRequestHandler.md#setlogger)

#### Defined in

[lib/app/PlaylistRequestHandler.ts:18](https://github.com/patrickkfkan/yt-cast-receiver/blob/5eecf1d/src/lib/app/PlaylistRequestHandler.ts#L18)
