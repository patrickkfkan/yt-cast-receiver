yt-cast-receiver

# yt-cast-receiver

## Table of contents

### Classes

- [AbortError](classes/AbortError.md)
- [AppError](classes/AppError.md)
- [BadResponseError](classes/BadResponseError.md)
- [ConnectionError](classes/ConnectionError.md)
- [DataError](classes/DataError.md)
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
- [DialOptions](interfaces/DialOptions.md)
- [Logger](interfaces/Logger.md)
- [PlayerNavInfo](interfaces/PlayerNavInfo.md)
- [PlayerState](interfaces/PlayerState.md)
- [PlaylistState](interfaces/PlaylistState.md)
- [Video](interfaces/Video.md)
- [YouTubeCastReceiverOptions](interfaces/YouTubeCastReceiverOptions.md)

### Type Aliases

- [AutoplayMode](README.md#autoplaymode)
- [LogLevel](README.md#loglevel)
- [PlayerStatus](README.md#playerstatus)
- [YouTubeCastReceiverStatus](README.md#youtubecastreceiverstatus)

### Variables

- [AUTOPLAY\_MODES](README.md#autoplay_modes)
- [CONF\_DEFAULTS](README.md#conf_defaults)
- [LOG\_LEVELS](README.md#log_levels)
- [PLAYER\_STATUSES](README.md#player_statuses)
- [STATUSES](README.md#statuses)

## Type Aliases

### AutoplayMode

Ƭ **AutoplayMode**: `ValueOf`<typeof [`AUTOPLAY_MODES`](README.md#autoplay_modes)\>

One of the values in [AUTOPLAY_MODES](README.md#autoplay_modes).

#### Defined in

[lib/Player.ts:12](https://github.com/patrickkfkan/yt-cast-receiver/blob/9c3f7bb/src/lib/Player.ts#L12)

___

### LogLevel

Ƭ **LogLevel**: `ValueOf`<typeof [`LOG_LEVELS`](README.md#log_levels)\>

One of the values in [LOG_LEVELS](README.md#log_levels).

#### Defined in

[lib/utils/Logger.ts:7](https://github.com/patrickkfkan/yt-cast-receiver/blob/9c3f7bb/src/lib/utils/Logger.ts#L7)

___

### PlayerStatus

Ƭ **PlayerStatus**: `ValueOf`<typeof [`PLAYER_STATUSES`](README.md#player_statuses)\>

One of the values in [PLAYER_STATUSES](README.md#player_statuses).

#### Defined in

[lib/Player.ts:17](https://github.com/patrickkfkan/yt-cast-receiver/blob/9c3f7bb/src/lib/Player.ts#L17)

___

### YouTubeCastReceiverStatus

Ƭ **YouTubeCastReceiverStatus**: `ValueOf`<typeof [`STATUSES`](README.md#statuses)\>

One of the values in [STATUSES](README.md#statuses).

#### Defined in

[lib/YouTubeCastReceiver.ts:31](https://github.com/patrickkfkan/yt-cast-receiver/blob/9c3f7bb/src/lib/YouTubeCastReceiver.ts#L31)

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

[lib/Constants.ts:22](https://github.com/patrickkfkan/yt-cast-receiver/blob/9c3f7bb/src/lib/Constants.ts#L22)

___

### CONF\_DEFAULTS

• `Const` **CONF\_DEFAULTS**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `BRAND` | ``"Generic"`` |
| `MODEL` | ``"SmartTV"`` |
| `SCREEN_APP` | ``"ytcr"`` |
| `SCREEN_NAME` | ``"YouTube Cast Receiver"`` |

#### Defined in

[lib/Constants.ts:15](https://github.com/patrickkfkan/yt-cast-receiver/blob/9c3f7bb/src/lib/Constants.ts#L15)

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

[lib/Constants.ts:36](https://github.com/patrickkfkan/yt-cast-receiver/blob/9c3f7bb/src/lib/Constants.ts#L36)

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

[lib/Constants.ts:28](https://github.com/patrickkfkan/yt-cast-receiver/blob/9c3f7bb/src/lib/Constants.ts#L28)

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

[lib/Constants.ts:44](https://github.com/patrickkfkan/yt-cast-receiver/blob/9c3f7bb/src/lib/Constants.ts#L44)
