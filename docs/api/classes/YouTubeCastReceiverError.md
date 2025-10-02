[**yt-cast-receiver**](../README.md) • **Docs**

***

[yt-cast-receiver](../README.md) / YouTubeCastReceiverError

# Class: YouTubeCastReceiverError

## Extends

- `Error`

## Extended by

- [`ConnectionError`](ConnectionError.md)
- [`AbortError`](AbortError.md)
- [`BadResponseError`](BadResponseError.md)
- [`DataError`](DataError.md)
- [`IncompleteAPIDataError`](IncompleteAPIDataError.md)
- [`SessionError`](SessionError.md)
- [`AppError`](AppError.md)
- [`DialServerError`](DialServerError.md)
- [`SenderConnectionError`](SenderConnectionError.md)

## Constructors

### new YouTubeCastReceiverError()

> **new YouTubeCastReceiverError**(`message`, `cause`?, `info`?): [`YouTubeCastReceiverError`](YouTubeCastReceiverError.md)

#### Parameters

• **message**: `string`

• **cause?**: `any`

• **info?**: `Record`\<`string`, `any`\>

#### Returns

[`YouTubeCastReceiverError`](YouTubeCastReceiverError.md)

#### Overrides

`Error.constructor`

#### Defined in

[src/lib/utils/Errors.ts:6](https://github.com/patrickkfkan/yt-cast-receiver/blob/e384300201bf276a725286875fe0fb4b45f5c05f/src/lib/utils/Errors.ts#L6)

## Properties

### cause?

> `optional` **cause**: `any`

#### Defined in

[src/lib/utils/Errors.ts:3](https://github.com/patrickkfkan/yt-cast-receiver/blob/e384300201bf276a725286875fe0fb4b45f5c05f/src/lib/utils/Errors.ts#L3)

***

### info?

> `optional` **info**: `Record`\<`string`, `any`\>

#### Defined in

[src/lib/utils/Errors.ts:4](https://github.com/patrickkfkan/yt-cast-receiver/blob/e384300201bf276a725286875fe0fb4b45f5c05f/src/lib/utils/Errors.ts#L4)

## Methods

### getCauses()

> **getCauses**(): `any`[]

#### Returns

`any`[]

#### Defined in

[src/lib/utils/Errors.ts:17](https://github.com/patrickkfkan/yt-cast-receiver/blob/e384300201bf276a725286875fe0fb4b45f5c05f/src/lib/utils/Errors.ts#L17)
