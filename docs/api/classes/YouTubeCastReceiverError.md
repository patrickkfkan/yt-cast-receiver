[yt-cast-receiver](../README.md) / YouTubeCastReceiverError

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
| `info?` | `Record`<`string`, `any`\> |

#### Overrides

Error.constructor

#### Defined in

[lib/utils/Errors.ts:6](https://github.com/patrickkfkan/yt-cast-receiver/blob/6b07310/src/lib/utils/Errors.ts#L6)

## Properties

### cause

• `Optional` **cause**: `any`

#### Defined in

[lib/utils/Errors.ts:3](https://github.com/patrickkfkan/yt-cast-receiver/blob/6b07310/src/lib/utils/Errors.ts#L3)

___

### info

• `Optional` **info**: `Record`<`string`, `any`\>

#### Defined in

[lib/utils/Errors.ts:4](https://github.com/patrickkfkan/yt-cast-receiver/blob/6b07310/src/lib/utils/Errors.ts#L4)

## Methods

### getCauses

▸ **getCauses**(): `any`[]

#### Returns

`any`[]

#### Defined in

[lib/utils/Errors.ts:17](https://github.com/patrickkfkan/yt-cast-receiver/blob/6b07310/src/lib/utils/Errors.ts#L17)
