[yt-cast-receiver-next](../README.md) / DefaultAutoplayLoader

# Class: DefaultAutoplayLoader

Default [AutoplayLoader](../interfaces/AutoplayLoader.md) implementation that fetches an autoplay video from:
- Mixes; or
- Related videos, if mixes are not found for the target video.

## Implements

- [`AutoplayLoader`](../interfaces/AutoplayLoader.md)

## Table of contents

### Constructors

- [constructor](DefaultAutoplayLoader.md#constructor)

### Methods

- [fetchMixPlaylist](DefaultAutoplayLoader.md#fetchmixplaylist)
- [getAutoplayVideoId](DefaultAutoplayLoader.md#getautoplayvideoid)
- [getFromMixPlaylist](DefaultAutoplayLoader.md#getfrommixplaylist)
- [getFromRelatedVideos](DefaultAutoplayLoader.md#getfromrelatedvideos)

## Constructors

### constructor

• **new DefaultAutoplayLoader**()

## Methods

### fetchMixPlaylist

▸ **fetchMixPlaylist**(`videoId`): `Promise`<``null`` \| `default`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `videoId` | `string` |

#### Returns

`Promise`<``null`` \| `default`\>

#### Defined in

lib/app/DefaultAutoplayLoader.ts:104

___

### getAutoplayVideoId

▸ **getAutoplayVideoId**(`videoId`, `context`, `logger`): `Promise`<``null`` \| `string`\>

Fetches the autoplay video for the specified video.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoId` | `string` | The Id of the target video. |
| `context` | [`AutoplayLoaderContext`](../interfaces/AutoplayLoaderContext.md) | Additional info that might be useful. |
| `logger` | [`Logger`](../interfaces/Logger.md) | `Logger` implementation for logging messages. |

#### Returns

`Promise`<``null`` \| `string`\>

Promise that resolves to the Id of the autoplay video, or `null` if none obtained.

#### Implementation of

[AutoplayLoader](../interfaces/AutoplayLoader.md).[getAutoplayVideoId](../interfaces/AutoplayLoader.md#getautoplayvideoid)

#### Defined in

lib/app/DefaultAutoplayLoader.ts:16

___

### getFromMixPlaylist

▸ **getFromMixPlaylist**(`videoId`, `currentVideoIds`): `Promise`<``null`` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `videoId` | `string` |
| `currentVideoIds` | `string`[] |

#### Returns

`Promise`<``null`` \| `string`\>

#### Defined in

lib/app/DefaultAutoplayLoader.ts:27

___

### getFromRelatedVideos

▸ **getFromRelatedVideos**(`videoId`, `currentVideoIds`): `Promise`<``null`` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `videoId` | `string` |
| `currentVideoIds` | `string`[] |

#### Returns

`Promise`<``null`` \| `string`\>

#### Defined in

lib/app/DefaultAutoplayLoader.ts:115
