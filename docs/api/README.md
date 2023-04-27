yt-cast-receiver

# yt-cast-receiver

## Table of contents

### Classes

- [AbortError](classes/AbortError.md)
- [AppError](classes/AppError.md)
- [BadResponseError](classes/BadResponseError.md)
- [ConnectionError](classes/ConnectionError.md)
- [DataError](classes/DataError.md)
- [DataStore](classes/DataStore.md)
- [DefaultDataStore](classes/DefaultDataStore.md)
- [DefaultLogger](classes/DefaultLogger.md)
- [DefaultPlaylistRequestHandler](classes/DefaultPlaylistRequestHandler.md)
- [DialServerError](classes/DialServerError.md)
- [IncompleteAPIDataError](classes/IncompleteAPIDataError.md)
- [PairingCodeRequestService](classes/PairingCodeRequestService.md)
- [Player](classes/Player.md)
- [Playlist](classes/Playlist.md)
- [PlaylistRequestHandler](classes/PlaylistRequestHandler.md)
- [Sender](classes/Sender.md)
- [SenderConnectionError](classes/SenderConnectionError.md)
- [SessionError](classes/SessionError.md)
- [YouTubeCastReceiver](classes/YouTubeCastReceiver.md)
- [YouTubeCastReceiverError](classes/YouTubeCastReceiverError.md)

### Interfaces

- [AppOptions](interfaces/AppOptions.md)
- [Client](interfaces/Client.md)
- [DialOptions](interfaces/DialOptions.md)
- [Logger](interfaces/Logger.md)
- [PlayerNavInfo](interfaces/PlayerNavInfo.md)
- [PlayerState](interfaces/PlayerState.md)
- [PlaylistEvent](interfaces/PlaylistEvent.md)
- [PlaylistPreviousNextVideos](interfaces/PlaylistPreviousNextVideos.md)
- [PlaylistState](interfaces/PlaylistState.md)
- [Video](interfaces/Video.md)
- [Volume](interfaces/Volume.md)
- [YouTubeCastReceiverOptions](interfaces/YouTubeCastReceiverOptions.md)

### Type Aliases

- [AutoplayMode](README.md#autoplaymode)
- [ClientKey](README.md#clientkey)
- [LogLevel](README.md#loglevel)
- [PlayerStatus](README.md#playerstatus)
- [PlaylistEventType](README.md#playlisteventtype)
- [YouTubeCastReceiverStatus](README.md#youtubecastreceiverstatus)

### Variables

- [AUTOPLAY\_MODES](README.md#autoplay_modes)
- [CLIENTS](README.md#clients)
- [CONF\_DEFAULTS](README.md#conf_defaults)
- [LOG\_LEVELS](README.md#log_levels)
- [MUTE\_POLICIES](README.md#mute_policies)
- [PLAYER\_STATUSES](README.md#player_statuses)
- [PLAYLIST\_EVENT\_TYPES](README.md#playlist_event_types)
- [STATUSES](README.md#statuses)

## Type Aliases

### AutoplayMode

Ƭ **AutoplayMode**: `ValueOf`<typeof [`AUTOPLAY_MODES`](README.md#autoplay_modes)\>

One of the values in [AUTOPLAY_MODES](README.md#autoplay_modes).

#### Defined in

[src/lib/Player.ts:12](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/Player.ts#L12)

___

### ClientKey

Ƭ **ClientKey**: ``"YT"`` \| ``"YTMUSIC"``

#### Defined in

[src/lib/app/Client.ts:1](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/app/Client.ts#L1)

___

### LogLevel

Ƭ **LogLevel**: `ValueOf`<typeof [`LOG_LEVELS`](README.md#log_levels)\>

One of the values in [LOG_LEVELS](README.md#log_levels).

#### Defined in

[src/lib/utils/Logger.ts:7](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/utils/Logger.ts#L7)

___

### PlayerStatus

Ƭ **PlayerStatus**: `ValueOf`<typeof [`PLAYER_STATUSES`](README.md#player_statuses)\>

One of the values in [PLAYER_STATUSES](README.md#player_statuses).

#### Defined in

[src/lib/Player.ts:17](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/Player.ts#L17)

___

### PlaylistEventType

Ƭ **PlaylistEventType**: `ValueOf`<typeof [`PLAYLIST_EVENT_TYPES`](README.md#playlist_event_types)\>

#### Defined in

[src/lib/app/Playlist.ts:28](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/app/Playlist.ts#L28)

___

### YouTubeCastReceiverStatus

Ƭ **YouTubeCastReceiverStatus**: `ValueOf`<typeof [`STATUSES`](README.md#statuses)\>

One of the values in [STATUSES](README.md#statuses).

#### Defined in

[src/lib/YouTubeCastReceiver.ts:55](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/YouTubeCastReceiver.ts#L55)

## Variables

### AUTOPLAY\_MODES

• `Const` **AUTOPLAY\_MODES**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `DISABLED` | ``"DISABLED"`` |
| `ENABLED` | ``"ENABLED"`` |
| `UNSUPPORTED` | ``"UNSUPPORTED"`` |

#### Defined in

[src/lib/Constants.ts:23](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/Constants.ts#L23)

___

### CLIENTS

• `Const` **CLIENTS**: `Record`<[`ClientKey`](README.md#clientkey), [`Client`](interfaces/Client.md)\>

#### Defined in

[src/lib/Constants.ts:52](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/Constants.ts#L52)

___

### CONF\_DEFAULTS

• `Const` **CONF\_DEFAULTS**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `BRAND` | ``"Generic"`` |
| `MODEL` | ``"SmartTV"`` |
| `SCREEN_APP` | ``"ytcr"`` |

#### Defined in

[src/lib/Constants.ts:17](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/Constants.ts#L17)

___

### LOG\_LEVELS

• `Const` **LOG\_LEVELS**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `DEBUG` | ``"debug"`` |
| `ERROR` | ``"error"`` |
| `INFO` | ``"info"`` |
| `NONE` | ``"none"`` |
| `WARN` | ``"warn"`` |

#### Defined in

[src/lib/Constants.ts:37](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/Constants.ts#L37)

___

### MUTE\_POLICIES

• `Const` **MUTE\_POLICIES**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `AUTO` | ``"auto"`` |
| `PRESERVE_VOLUME_LEVEL` | ``"preserveLevel"`` |
| `ZERO_VOLUME_LEVEL` | ``"zeroLevel"`` |

#### Defined in

[src/lib/Constants.ts:65](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/Constants.ts#L65)

___

### PLAYER\_STATUSES

• `Const` **PLAYER\_STATUSES**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `IDLE` | ``-1`` |
| `LOADING` | ``3`` |
| `PAUSED` | ``2`` |
| `PLAYING` | ``1`` |
| `STOPPED` | ``4`` |

#### Defined in

[src/lib/Constants.ts:29](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/Constants.ts#L29)

___

### PLAYLIST\_EVENT\_TYPES

• `Const` **PLAYLIST\_EVENT\_TYPES**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `PLAYLIST_ADDED` | ``"playlistAdded"`` |
| `PLAYLIST_CLEARED` | ``"playlistCleared"`` |
| `PLAYLIST_SET` | ``"playlistSet"`` |
| `VIDEO_ADDED` | ``"videoAdded"`` |
| `VIDEO_REMOVED` | ``"videoRemoved"`` |
| `VIDEO_SELECTED` | ``"videoSelected"`` |

#### Defined in

[src/lib/app/Playlist.ts:12](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/app/Playlist.ts#L12)

___

### STATUSES

• `Const` **STATUSES**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `RUNNING` | ``"running"`` |
| `STARTING` | ``"starting"`` |
| `STOPPED` | ``"stopped"`` |
| `STOPPING` | ``"stopping"`` |

#### Defined in

[src/lib/Constants.ts:45](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/Constants.ts#L45)
