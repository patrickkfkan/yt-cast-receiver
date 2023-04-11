[yt-cast-receiver](../README.md) / SenderConnectionError

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

[lib/utils/Errors.ts:85](https://github.com/patrickkfkan/yt-cast-receiver/blob/d291079/src/lib/utils/Errors.ts#L85)

## Properties

### cause

• `Optional` **cause**: `any`

#### Inherited from

[YouTubeCastReceiverError](YouTubeCastReceiverError.md).[cause](YouTubeCastReceiverError.md#cause)

#### Defined in

[lib/utils/Errors.ts:3](https://github.com/patrickkfkan/yt-cast-receiver/blob/d291079/src/lib/utils/Errors.ts#L3)

___

### info

• `Optional` **info**: `Object`

#### Index signature

▪ [k: `string`]: `any`

#### Inherited from

[YouTubeCastReceiverError](YouTubeCastReceiverError.md).[info](YouTubeCastReceiverError.md#info)

#### Defined in

[lib/utils/Errors.ts:4](https://github.com/patrickkfkan/yt-cast-receiver/blob/d291079/src/lib/utils/Errors.ts#L4)

## Methods

### getCauses

▸ **getCauses**(): `any`[]

#### Returns

`any`[]

#### Inherited from

[YouTubeCastReceiverError](YouTubeCastReceiverError.md).[getCauses](YouTubeCastReceiverError.md#getcauses)

#### Defined in

[lib/utils/Errors.ts:17](https://github.com/patrickkfkan/yt-cast-receiver/blob/d291079/src/lib/utils/Errors.ts#L17)
