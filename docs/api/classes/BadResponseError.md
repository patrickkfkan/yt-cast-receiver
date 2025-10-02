[**yt-cast-receiver**](../README.md) • **Docs**

***

[yt-cast-receiver](../README.md) / BadResponseError

# Class: BadResponseError

## Extends

- [`YouTubeCastReceiverError`](YouTubeCastReceiverError.md)

## Constructors

### new BadResponseError()

> **new BadResponseError**(`message`, `url`, `response`): [`BadResponseError`](BadResponseError.md)

#### Parameters

• **message**: `string`

• **url**: `string`

• **response**

• **response.status**: `number`

• **response.statusText**: `string`

#### Returns

[`BadResponseError`](BadResponseError.md)

#### Overrides

[`YouTubeCastReceiverError`](YouTubeCastReceiverError.md).[`constructor`](YouTubeCastReceiverError.md#constructors)

#### Defined in

[src/lib/utils/Errors.ts:43](https://github.com/patrickkfkan/yt-cast-receiver/blob/e384300201bf276a725286875fe0fb4b45f5c05f/src/lib/utils/Errors.ts#L43)

## Properties

### cause?

> `optional` **cause**: `any`

#### Inherited from

[`YouTubeCastReceiverError`](YouTubeCastReceiverError.md).[`cause`](YouTubeCastReceiverError.md#cause)

#### Defined in

[src/lib/utils/Errors.ts:3](https://github.com/patrickkfkan/yt-cast-receiver/blob/e384300201bf276a725286875fe0fb4b45f5c05f/src/lib/utils/Errors.ts#L3)

***

### info?

> `optional` **info**: `Record`\<`string`, `any`\>

#### Inherited from

[`YouTubeCastReceiverError`](YouTubeCastReceiverError.md).[`info`](YouTubeCastReceiverError.md#info)

#### Defined in

[src/lib/utils/Errors.ts:4](https://github.com/patrickkfkan/yt-cast-receiver/blob/e384300201bf276a725286875fe0fb4b45f5c05f/src/lib/utils/Errors.ts#L4)

## Methods

### getCauses()

> **getCauses**(): `any`[]

#### Returns

`any`[]

#### Inherited from

[`YouTubeCastReceiverError`](YouTubeCastReceiverError.md).[`getCauses`](YouTubeCastReceiverError.md#getcauses)

#### Defined in

[src/lib/utils/Errors.ts:17](https://github.com/patrickkfkan/yt-cast-receiver/blob/e384300201bf276a725286875fe0fb4b45f5c05f/src/lib/utils/Errors.ts#L17)
