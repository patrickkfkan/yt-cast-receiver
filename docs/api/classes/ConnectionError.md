[**yt-cast-receiver**](../README.md) • **Docs**

***

[yt-cast-receiver](../README.md) / ConnectionError

# Class: ConnectionError

## Extends

- [`YouTubeCastReceiverError`](YouTubeCastReceiverError.md)

## Constructors

### new ConnectionError()

> **new ConnectionError**(`message`, `url`, `cause`?): [`ConnectionError`](ConnectionError.md)

#### Parameters

• **message**: `string`

• **url**: `string`

• **cause?**: `any`

#### Returns

[`ConnectionError`](ConnectionError.md)

#### Overrides

[`YouTubeCastReceiverError`](YouTubeCastReceiverError.md).[`constructor`](YouTubeCastReceiverError.md#constructors)

#### Defined in

[src/lib/utils/Errors.ts:29](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/utils/Errors.ts#L29)

## Properties

### cause?

> `optional` **cause**: `any`

#### Inherited from

[`YouTubeCastReceiverError`](YouTubeCastReceiverError.md).[`cause`](YouTubeCastReceiverError.md#cause)

#### Defined in

[src/lib/utils/Errors.ts:3](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/utils/Errors.ts#L3)

***

### info?

> `optional` **info**: `Record`\<`string`, `any`\>

#### Inherited from

[`YouTubeCastReceiverError`](YouTubeCastReceiverError.md).[`info`](YouTubeCastReceiverError.md#info)

#### Defined in

[src/lib/utils/Errors.ts:4](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/utils/Errors.ts#L4)

## Methods

### getCauses()

> **getCauses**(): `any`[]

#### Returns

`any`[]

#### Inherited from

[`YouTubeCastReceiverError`](YouTubeCastReceiverError.md).[`getCauses`](YouTubeCastReceiverError.md#getcauses)

#### Defined in

[src/lib/utils/Errors.ts:17](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/utils/Errors.ts#L17)
