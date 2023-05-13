[yt-cast-receiver](../README.md) / AbortError

# Class: AbortError

## Hierarchy

- [`YouTubeCastReceiverError`](YouTubeCastReceiverError.md)

  ↳ **`AbortError`**

## Table of contents

### Constructors

- [constructor](AbortError.md#constructor)

### Properties

- [cause](AbortError.md#cause)
- [info](AbortError.md#info)

### Methods

- [getCauses](AbortError.md#getcauses)

## Constructors

### constructor

• **new AbortError**(`message`, `url`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `url` | `string` |

#### Overrides

[YouTubeCastReceiverError](YouTubeCastReceiverError.md).[constructor](YouTubeCastReceiverError.md#constructor)

#### Defined in

[src/lib/utils/Errors.ts:36](https://github.com/patrickkfkan/yt-cast-receiver/blob/2051e1f/src/lib/utils/Errors.ts#L36)

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
