[yt-cast-receiver](../README.md) / IncompleteAPIDataError

# Class: IncompleteAPIDataError

## Hierarchy

- [`YouTubeCastReceiverError`](YouTubeCastReceiverError.md)

  ↳ **`IncompleteAPIDataError`**

## Table of contents

### Constructors

- [constructor](IncompleteAPIDataError.md#constructor)

### Properties

- [cause](IncompleteAPIDataError.md#cause)
- [info](IncompleteAPIDataError.md#info)

### Methods

- [getCauses](IncompleteAPIDataError.md#getcauses)

## Constructors

### constructor

• **new IncompleteAPIDataError**(`message`, `missing?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `missing?` | `string`[] |

#### Overrides

[YouTubeCastReceiverError](YouTubeCastReceiverError.md).[constructor](YouTubeCastReceiverError.md#constructor)

#### Defined in

[src/lib/utils/Errors.ts:57](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/utils/Errors.ts#L57)

## Properties

### cause

• `Optional` **cause**: `any`

#### Inherited from

[YouTubeCastReceiverError](YouTubeCastReceiverError.md).[cause](YouTubeCastReceiverError.md#cause)

#### Defined in

[src/lib/utils/Errors.ts:3](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/utils/Errors.ts#L3)

___

### info

• `Optional` **info**: `Record`<`string`, `any`\>

#### Inherited from

[YouTubeCastReceiverError](YouTubeCastReceiverError.md).[info](YouTubeCastReceiverError.md#info)

#### Defined in

[src/lib/utils/Errors.ts:4](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/utils/Errors.ts#L4)

## Methods

### getCauses

▸ **getCauses**(): `any`[]

#### Returns

`any`[]

#### Inherited from

[YouTubeCastReceiverError](YouTubeCastReceiverError.md).[getCauses](YouTubeCastReceiverError.md#getcauses)

#### Defined in

[src/lib/utils/Errors.ts:17](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/utils/Errors.ts#L17)
