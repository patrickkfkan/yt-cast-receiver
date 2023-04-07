yt-cast-receiver

# yt-cast-receiver

## Table of contents

### Classes

- [AbortError](classes/AbortError.md)
- [AppError](classes/AppError.md)
- [BadResponseError](classes/BadResponseError.md)
- [ConnectionError](classes/ConnectionError.md)
- [DataError](classes/DataError.md)
- [DefaultAutoplayLoader](classes/DefaultAutoplayLoader.md)
- [DefaultLogger](classes/DefaultLogger.md)
- [DialServerError](classes/DialServerError.md)
- [IncompleteAPIDataError](classes/IncompleteAPIDataError.md)
- [PairingCodeRequestService](classes/PairingCodeRequestService.md)
- [Player](classes/Player.md)
- [Playlist](classes/Playlist.md)
- [Sender](classes/Sender.md)
- [SenderConnectionError](classes/SenderConnectionError.md)
- [SessionError](classes/SessionError.md)
- [YouTubeCastReceiver](classes/YouTubeCastReceiver.md)
- [YouTubeCastReceiverError](classes/YouTubeCastReceiverError.md)

### Interfaces

- [AutoplayLoader](interfaces/AutoplayLoader.md)
- [Logger](interfaces/Logger.md)
- [PlayerNavInfo](interfaces/PlayerNavInfo.md)
- [PlayerState](interfaces/PlayerState.md)

### Type Aliases

- [AppOptions](README.md#appoptions)
- [AutoplayInfo](README.md#autoplayinfo)
- [AutoplayMode](README.md#autoplaymode)
- [DialOptions](README.md#dialoptions)
- [LogLevel](README.md#loglevel)
- [PlayerStatus](README.md#playerstatus)
- [YouTubeCastReceiverOptions](README.md#youtubecastreceiveroptions)
- [YouTubeCastReceiverStatus](README.md#youtubecastreceiverstatus)

### Variables

- [AUTOPLAY\_MODES](README.md#autoplay_modes)
- [CONF\_DEFAULTS](README.md#conf_defaults)
- [LOG\_LEVELS](README.md#log_levels)
- [PLAYER\_STATUSES](README.md#player_statuses)
- [STATUSES](README.md#statuses)

## Type Aliases

### AppOptions

Ƭ **AppOptions**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `autoplayLoader?` | [`AutoplayLoader`](interfaces/AutoplayLoader.md) \| ``null`` | **`Default`** `DefaultAutoplayLoader` instance |
| `brand?` | `string` | **`Default`** CONF_DEFAULTS.BRAND |
| `enableAutoplayOnConnect?` | `boolean` | **`Default`** true |
| `logger` | [`Logger`](interfaces/Logger.md) | - |
| `model?` | `string` | **`Default`** CONF_DEFAULTS.MODEL |
| `screenApp?` | `string` | **`Default`** CONF_DEFAULTS.SCREEN_APP |
| `screenName?` | `string` | **`Default`** CONF_DEFAULTS.SCREEN_NAME |

#### Defined in

[lib/app/YouTubeApp.ts:18](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/app/YouTubeApp.ts#L18)

___

### AutoplayInfo

Ƭ **AutoplayInfo**: { `forVideoId`: `string` ; `videoId`: `string`  } \| ``null``

#### Defined in

[lib/app/Playlist.ts:1](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/app/Playlist.ts#L1)

___

### AutoplayMode

Ƭ **AutoplayMode**: `ValueOf`<typeof [`AUTOPLAY_MODES`](README.md#autoplay_modes)\>

One of the values in [AUTOPLAY_MODES](README.md#autoplay_modes).

#### Defined in

[lib/Player.ts:11](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L11)

___

### DialOptions

Ƭ **DialOptions**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `bindToAddresses?` | `string`[] | - |
| `bindToInterfaces?` | `string`[] | - |
| `corsAllowOrigins?` | `boolean` | - |
| `logger` | [`Logger`](interfaces/Logger.md) | - |
| `manufacturer?` | `string` | **`Default`** CONF_DEFAULTS.BRAND |
| `modelName?` | `string` | **`Default`** CONF_DEFAULTS.MODEL |
| `port?` | `number` | - |
| `prefix?` | `string` | - |

#### Defined in

[lib/dial/DialServer.ts:10](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/dial/DialServer.ts#L10)

___

### LogLevel

Ƭ **LogLevel**: `ValueOf`<typeof [`LOG_LEVELS`](README.md#log_levels)\>

One of the values in [LOG_LEVELS](README.md#log_levels).

#### Defined in

[lib/utils/Logger.ts:7](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/utils/Logger.ts#L7)

___

### PlayerStatus

Ƭ **PlayerStatus**: `ValueOf`<typeof [`PLAYER_STATUSES`](README.md#player_statuses)\>

One of the values in [PLAYER_STATUSES](README.md#player_statuses).

#### Defined in

[lib/Player.ts:16](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Player.ts#L16)

___

### YouTubeCastReceiverOptions

Ƭ **YouTubeCastReceiverOptions**: `Object`

Options consumed by constructor of `YouTubeCastReceiver` class.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `app?` | `Omit`<[`AppOptions`](README.md#appoptions), ``"logger"`` \| ``"brand"`` \| ``"model"``\> | YouTube app options. |
| `brand?` | `string` | - |
| `dial?` | `Omit`<[`DialOptions`](README.md#dialoptions), ``"logger"`` \| ``"manufacturer"`` \| ``"modelName"``\> | DIAL server options. |
| `logLevel?` | [`LogLevel`](README.md#loglevel) | - |
| `logger?` | [`Logger`](interfaces/Logger.md) | - |
| `model?` | `string` | - |

#### Defined in

[lib/YouTubeCastReceiver.ts:16](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/YouTubeCastReceiver.ts#L16)

___

### YouTubeCastReceiverStatus

Ƭ **YouTubeCastReceiverStatus**: `ValueOf`<typeof [`STATUSES`](README.md#statuses)\>

One of the values in [STATUSES](README.md#statuses).

#### Defined in

[lib/YouTubeCastReceiver.ts:32](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/YouTubeCastReceiver.ts#L32)

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

[lib/Constants.ts:22](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Constants.ts#L22)

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

[lib/Constants.ts:15](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Constants.ts#L15)

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

[lib/Constants.ts:36](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Constants.ts#L36)

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

[lib/Constants.ts:28](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Constants.ts#L28)

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

[lib/Constants.ts:44](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/Constants.ts#L44)
