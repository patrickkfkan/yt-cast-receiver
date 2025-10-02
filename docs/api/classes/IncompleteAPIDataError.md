[**yt-cast-receiver**](../README.md) • **Docs**

***

[yt-cast-receiver](../README.md) / IncompleteAPIDataError

# Class: IncompleteAPIDataError

## Extends

- [`YouTubeCastReceiverError`](YouTubeCastReceiverError.md)

## Constructors

### new IncompleteAPIDataError()

> **new IncompleteAPIDataError**(`message`, `missing`?): [`IncompleteAPIDataError`](IncompleteAPIDataError.md)

#### Parameters

• **message**: `string`

• **missing?**: `string`[]

#### Returns

[`IncompleteAPIDataError`](IncompleteAPIDataError.md)

#### Overrides

[`YouTubeCastReceiverError`](YouTubeCastReceiverError.md).[`constructor`](YouTubeCastReceiverError.md#constructors)

#### Defined in

[src/lib/utils/Errors.ts:57](https://github.com/patrickkfkan/yt-cast-receiver/blob/e384300201bf276a725286875fe0fb4b45f5c05f/src/lib/utils/Errors.ts#L57)

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
