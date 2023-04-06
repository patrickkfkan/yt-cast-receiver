[yt-cast-receiver-next](../README.md) / DataError

# Class: DataError

## Hierarchy

- [`YouTubeCastReceiverError`](YouTubeCastReceiverError.md)

  ↳ **`DataError`**

## Table of contents

### Constructors

- [constructor](DataError.md#constructor)

### Properties

- [cause](DataError.md#cause)
- [info](DataError.md#info)

### Methods

- [getCauses](DataError.md#getcauses)

## Constructors

### constructor

• **new DataError**(`message`, `cause?`, `data?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `cause?` | `any` |
| `data?` | `any` |

#### Overrides

[YouTubeCastReceiverError](YouTubeCastReceiverError.md).[constructor](YouTubeCastReceiverError.md#constructor)

#### Defined in

lib/utils/Errors.ts:50

## Properties

### cause

• `Optional` **cause**: `any`

#### Inherited from

[YouTubeCastReceiverError](YouTubeCastReceiverError.md).[cause](YouTubeCastReceiverError.md#cause)

#### Defined in

lib/utils/Errors.ts:3

___

### info

• `Optional` **info**: `Object`

#### Index signature

▪ [k: `string`]: `any`

#### Inherited from

[YouTubeCastReceiverError](YouTubeCastReceiverError.md).[info](YouTubeCastReceiverError.md#info)

#### Defined in

lib/utils/Errors.ts:4

## Methods

### getCauses

▸ **getCauses**(): `any`[]

#### Returns

`any`[]

#### Inherited from

[YouTubeCastReceiverError](YouTubeCastReceiverError.md).[getCauses](YouTubeCastReceiverError.md#getcauses)

#### Defined in

lib/utils/Errors.ts:17
