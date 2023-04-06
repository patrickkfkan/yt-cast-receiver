[yt-cast-receiver-next](../README.md) / ConnectionError

# Class: ConnectionError

## Hierarchy

- [`YouTubeCastReceiverError`](YouTubeCastReceiverError.md)

  ↳ **`ConnectionError`**

## Table of contents

### Constructors

- [constructor](ConnectionError.md#constructor)

### Properties

- [cause](ConnectionError.md#cause)
- [info](ConnectionError.md#info)

### Methods

- [getCauses](ConnectionError.md#getcauses)

## Constructors

### constructor

• **new ConnectionError**(`message`, `url`, `cause?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `url` | `string` |
| `cause?` | `any` |

#### Overrides

[YouTubeCastReceiverError](YouTubeCastReceiverError.md).[constructor](YouTubeCastReceiverError.md#constructor)

#### Defined in

lib/utils/Errors.ts:29

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
