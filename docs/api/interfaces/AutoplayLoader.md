[yt-cast-receiver](../README.md) / AutoplayLoader

# Interface: AutoplayLoader

Fetches and returns the autoplay (aka 'Up Next') video for a given video.

## Implemented by

- [`DefaultAutoplayLoader`](../classes/DefaultAutoplayLoader.md)

## Table of contents

### Methods

- [getAutoplayVideoId](AutoplayLoader.md#getautoplayvideoid)

## Methods

### getAutoplayVideoId

▸ **getAutoplayVideoId**(`videoId`, `player`, `logger`): `Promise`<``null`` \| `string`\>

Fetches the autoplay video for the specified video.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoId` | `string` | The Id of the target video. |
| `player` | [`Player`](../classes/Player.md) | The `Player` implementation associated with this request. |
| `logger` | [`Logger`](Logger.md) | `Logger` implementation for logging messages. |

#### Returns

`Promise`<``null`` \| `string`\>

Promise that resolves to the Id of the autoplay video, or `null` if none obtained.

#### Defined in

[lib/app/AutoplayLoader.ts:15](https://github.com/patrickkfkan/yt-cast-receiver/blob/d291079/src/lib/app/AutoplayLoader.ts#L15)
