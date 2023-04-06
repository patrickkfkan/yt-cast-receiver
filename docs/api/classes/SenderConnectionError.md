[yt-cast-receiver-next](../README.md) / SenderConnectionError

# Class: SenderConnectionError

## Hierarchy

- [`YouTubeCastReceiverError`](YouTubeCastReceiverError.md)

  ↳ **`SenderConnectionError`**

## Table of contents

### Constructors

- [constructor](SenderConnectionError.md#constructor)

### Properties

- [cause](SenderConnectionError.md#cause)
- [info](SenderConnectionError.md#info)

### Methods

- [getCauses](SenderConnectionError.md#getcauses)

## Constructors

### constructor

• **new SenderConnectionError**(`message`, `cause?`, `action?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `cause?` | `any` |
| `action?` | ``"connect"`` \| ``"disconnect"`` |

#### Overrides

[YouTubeCastReceiverError](YouTubeCastReceiverError.md).[constructor](YouTubeCastReceiverError.md#constructor)

#### Defined in

lib/utils/Errors.ts:85

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
