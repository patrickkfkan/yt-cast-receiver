[**yt-cast-receiver**](../README.md) • **Docs**

***

[yt-cast-receiver](../README.md) / DataError

# Class: DataError

## Extends

- [`YouTubeCastReceiverError`](YouTubeCastReceiverError.md)

## Constructors

### new DataError()

> **new DataError**(`message`, `cause`?, `data`?): [`DataError`](DataError.md)

#### Parameters

• **message**: `string`

• **cause?**: `any`

• **data?**: `any`

#### Returns

[`DataError`](DataError.md)

#### Overrides

[`YouTubeCastReceiverError`](YouTubeCastReceiverError.md).[`constructor`](YouTubeCastReceiverError.md#constructors)

#### Defined in

[src/lib/utils/Errors.ts:50](https://github.com/patrickkfkan/yt-cast-receiver/blob/7898fbce0f56a5f9871c7ea968fa6c6f4e21202f/src/lib/utils/Errors.ts#L50)

## Properties

### cause?

> `optional` **cause**: `any`

#### Inherited from

[`YouTubeCastReceiverError`](YouTubeCastReceiverError.md).[`cause`](YouTubeCastReceiverError.md#cause)

#### Defined in

[src/lib/utils/Errors.ts:3](https://github.com/patrickkfkan/yt-cast-receiver/blob/7898fbce0f56a5f9871c7ea968fa6c6f4e21202f/src/lib/utils/Errors.ts#L3)

***

### info?

> `optional` **info**: `Record`\<`string`, `any`\>

#### Inherited from

[`YouTubeCastReceiverError`](YouTubeCastReceiverError.md).[`info`](YouTubeCastReceiverError.md#info)

#### Defined in

[src/lib/utils/Errors.ts:4](https://github.com/patrickkfkan/yt-cast-receiver/blob/7898fbce0f56a5f9871c7ea968fa6c6f4e21202f/src/lib/utils/Errors.ts#L4)

## Methods

### getCauses()

> **getCauses**(): `any`[]

#### Returns

`any`[]

#### Inherited from

[`YouTubeCastReceiverError`](YouTubeCastReceiverError.md).[`getCauses`](YouTubeCastReceiverError.md#getcauses)

#### Defined in

[src/lib/utils/Errors.ts:17](https://github.com/patrickkfkan/yt-cast-receiver/blob/7898fbce0f56a5f9871c7ea968fa6c6f4e21202f/src/lib/utils/Errors.ts#L17)
