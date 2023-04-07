[yt-cast-receiver-next](../README.md) / YouTubeCastReceiverError

# Class: YouTubeCastReceiverError

## Hierarchy

- `Error`

  ↳ **`YouTubeCastReceiverError`**

  ↳↳ [`ConnectionError`](ConnectionError.md)

  ↳↳ [`AbortError`](AbortError.md)

  ↳↳ [`BadResponseError`](BadResponseError.md)

  ↳↳ [`DataError`](DataError.md)

  ↳↳ [`IncompleteAPIDataError`](IncompleteAPIDataError.md)

  ↳↳ [`SessionError`](SessionError.md)

  ↳↳ [`AppError`](AppError.md)

  ↳↳ [`DialServerError`](DialServerError.md)

  ↳↳ [`SenderConnectionError`](SenderConnectionError.md)

## Table of contents

### Constructors

- [constructor](YouTubeCastReceiverError.md#constructor)

### Properties

- [cause](YouTubeCastReceiverError.md#cause)
- [info](YouTubeCastReceiverError.md#info)

### Methods

- [getCauses](YouTubeCastReceiverError.md#getcauses)

## Constructors

### constructor

• **new YouTubeCastReceiverError**(`message`, `cause?`, `info?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `cause?` | `any` |
| `info?` | `Object` |

#### Overrides

Error.constructor

#### Defined in

lib/utils/Errors.ts:6

## Properties

### cause

• `Optional` **cause**: `any`

#### Defined in

lib/utils/Errors.ts:3

___

### info

• `Optional` **info**: `Object`

#### Index signature

▪ [k: `string`]: `any`

#### Defined in

lib/utils/Errors.ts:4

## Methods

### getCauses

▸ **getCauses**(): `any`[]

#### Returns

`any`[]

#### Defined in

lib/utils/Errors.ts:17