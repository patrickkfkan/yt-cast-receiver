[**yt-cast-receiver**](../README.md) • **Docs**

***

[yt-cast-receiver](../README.md) / PlaylistRequestHandler

# Class: `abstract` PlaylistRequestHandler

Handles requests made by a `Playlist` instance.

## Extended by

- [`DefaultPlaylistRequestHandler`](DefaultPlaylistRequestHandler.md)

## Constructors

### new PlaylistRequestHandler()

> **new PlaylistRequestHandler**(): [`PlaylistRequestHandler`](PlaylistRequestHandler.md)

#### Returns

[`PlaylistRequestHandler`](PlaylistRequestHandler.md)

## Accessors

### logger

#### Get Signature

> **get** **logger**(): [`Logger`](../interfaces/Logger.md)

##### Returns

[`Logger`](../interfaces/Logger.md)

#### Defined in

[src/lib/app/PlaylistRequestHandler.ts:65](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/PlaylistRequestHandler.ts#L65)

## Methods

### getPreviousNextVideos()

> `abstract` **getPreviousNextVideos**(`target`, `playlist`): `Promise`\<[`PlaylistPreviousNextVideos`](../interfaces/PlaylistPreviousNextVideos.md)\>

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

• **target**: [`Video`](../interfaces/Video.md)

Target video for which the previous and next videos are obtained.

• **playlist**: [`Playlist`](Playlist.md)

The `Playlist` instance making the request.

#### Returns

`Promise`\<[`PlaylistPreviousNextVideos`](../interfaces/PlaylistPreviousNextVideos.md)\>

(Object)

#### Defined in

[src/lib/app/PlaylistRequestHandler.ts:55](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/PlaylistRequestHandler.ts#L55)

***

### getPreviousNextVideosAbortable()

> **getPreviousNextVideosAbortable**(`target`, `playlist`, `abortSignal`): `Promise`\<[`PlaylistPreviousNextVideos`](../interfaces/PlaylistPreviousNextVideos.md)\>

#### Parameters

• **target**: [`Video`](../interfaces/Video.md)

• **playlist**: [`Playlist`](Playlist.md)

• **abortSignal**: `AbortSignal`

#### Returns

`Promise`\<[`PlaylistPreviousNextVideos`](../interfaces/PlaylistPreviousNextVideos.md)\>

#### Defined in

[src/lib/app/PlaylistRequestHandler.ts:21](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/PlaylistRequestHandler.ts#L21)

***

### reset()

> **reset**(): `void`

Resets the handler to its initial state. By default, this method does nothing.
Implementations shall override this method if need be.

#### Returns

`void`

#### Defined in

[src/lib/app/PlaylistRequestHandler.ts:61](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/PlaylistRequestHandler.ts#L61)

***

### setLogger()

> **setLogger**(`logger`): `void`

#### Parameters

• **logger**: [`Logger`](../interfaces/Logger.md)

#### Returns

`void`

#### Defined in

[src/lib/app/PlaylistRequestHandler.ts:17](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/PlaylistRequestHandler.ts#L17)
