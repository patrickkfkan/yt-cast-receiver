[yt-cast-receiver](../README.md) / SessionError

# Class: SessionError

## Hierarchy

- [`YouTubeCastReceiverError`](YouTubeCastReceiverError.md)

  ↳ **`SessionError`**

## Table of contents

### Constructors

- [constructor](SessionError.md#constructor)

### Properties

- [cause](SessionError.md#cause)
- [info](SessionError.md#info)

### Methods

- [getCauses](SessionError.md#getcauses)

## Constructors

### constructor

• **new SessionError**(`message`, `cause?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `cause?` | `any` |

#### Overrides

[YouTubeCastReceiverError](YouTubeCastReceiverError.md).[constructor](YouTubeCastReceiverError.md#constructor)

#### Defined in

[lib/utils/Errors.ts:64](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/utils/Errors.ts#L64)

## Properties

### cause

• `Optional` **cause**: `any`

#### Inherited from

[YouTubeCastReceiverError](YouTubeCastReceiverError.md).[cause](YouTubeCastReceiverError.md#cause)

#### Defined in

[lib/utils/Errors.ts:3](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/utils/Errors.ts#L3)

___

### info

• `Optional` **info**: `Object`

#### Index signature

▪ [k: `string`]: `any`

#### Inherited from

[YouTubeCastReceiverError](YouTubeCastReceiverError.md).[info](YouTubeCastReceiverError.md#info)

#### Defined in

[lib/utils/Errors.ts:4](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/utils/Errors.ts#L4)

## Methods

### getCauses

▸ **getCauses**(): `any`[]

#### Returns

`any`[]

#### Inherited from

[YouTubeCastReceiverError](YouTubeCastReceiverError.md).[getCauses](YouTubeCastReceiverError.md#getcauses)

#### Defined in

[lib/utils/Errors.ts:17](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/utils/Errors.ts#L17)
