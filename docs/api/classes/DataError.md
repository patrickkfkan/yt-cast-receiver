[yt-cast-receiver](../README.md) / DataError

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

[src/lib/utils/Errors.ts:50](https://github.com/patrickkfkan/yt-cast-receiver/blob/2051e1f/src/lib/utils/Errors.ts#L50)

## Properties

### cause

• `Optional` **cause**: `any`

#### Inherited from

[YouTubeCastReceiverError](YouTubeCastReceiverError.md).[cause](YouTubeCastReceiverError.md#cause)

#### Defined in

[src/lib/utils/Errors.ts:3](https://github.com/patrickkfkan/yt-cast-receiver/blob/2051e1f/src/lib/utils/Errors.ts#L3)

___

### info

• `Optional` **info**: `Record`<`string`, `any`\>

#### Inherited from

[YouTubeCastReceiverError](YouTubeCastReceiverError.md).[info](YouTubeCastReceiverError.md#info)

#### Defined in

[src/lib/utils/Errors.ts:4](https://github.com/patrickkfkan/yt-cast-receiver/blob/2051e1f/src/lib/utils/Errors.ts#L4)

## Methods

### getCauses

▸ **getCauses**(): `any`[]

#### Returns

`any`[]

#### Inherited from

[YouTubeCastReceiverError](YouTubeCastReceiverError.md).[getCauses](YouTubeCastReceiverError.md#getcauses)

#### Defined in

[src/lib/utils/Errors.ts:17](https://github.com/patrickkfkan/yt-cast-receiver/blob/2051e1f/src/lib/utils/Errors.ts#L17)
