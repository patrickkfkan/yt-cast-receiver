[yt-cast-receiver-next](../README.md) / AppError

# Class: AppError

## Hierarchy

- [`YouTubeCastReceiverError`](YouTubeCastReceiverError.md)

  ↳ **`AppError`**

## Table of contents

### Constructors

- [constructor](AppError.md#constructor)

### Properties

- [cause](AppError.md#cause)
- [info](AppError.md#info)

### Methods

- [getCauses](AppError.md#getcauses)

## Constructors

### constructor

• **new AppError**(`message`, `cause?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `cause?` | `any` |

#### Overrides

[YouTubeCastReceiverError](YouTubeCastReceiverError.md).[constructor](YouTubeCastReceiverError.md#constructor)

#### Defined in

lib/utils/Errors.ts:71

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
