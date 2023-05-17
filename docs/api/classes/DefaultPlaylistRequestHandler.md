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
- [markWatched](DefaultPlaylistRequestHandler.md#markwatched)
- [reset](DefaultPlaylistRequestHandler.md#reset)
- [setLogger](DefaultPlaylistRequestHandler.md#setlogger)

## Constructors

### constructor

• **new DefaultPlaylistRequestHandler**()

#### Overrides

[PlaylistRequestHandler](PlaylistRequestHandler.md).[constructor](PlaylistRequestHandler.md#constructor)

#### Defined in

[src/lib/app/DefaultPlaylistRequestHandler.ts:33](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/DefaultPlaylistRequestHandler.ts#L33)

## Accessors

### logger

• `get` **logger**(): [`Logger`](../interfaces/Logger.md)

#### Returns

[`Logger`](../interfaces/Logger.md)

#### Inherited from

PlaylistRequestHandler.logger

#### Defined in

[src/lib/app/PlaylistRequestHandler.ts:66](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/PlaylistRequestHandler.ts#L66)

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

[src/lib/app/DefaultPlaylistRequestHandler.ts:53](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/DefaultPlaylistRequestHandler.ts#L53)

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

[src/lib/app/PlaylistRequestHandler.ts:22](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/PlaylistRequestHandler.ts#L22)

___

### markWatched

▸ **markWatched**(`video`, `run?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `video` | [`Video`](../interfaces/Video.md) | `undefined` |
| `run` | ``2`` \| ``1`` | `1` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/app/DefaultPlaylistRequestHandler.ts:208](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/DefaultPlaylistRequestHandler.ts#L208)

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

[src/lib/app/DefaultPlaylistRequestHandler.ts:278](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/DefaultPlaylistRequestHandler.ts#L278)

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

[src/lib/app/PlaylistRequestHandler.ts:18](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/PlaylistRequestHandler.ts#L18)
