[yt-cast-receiver](../README.md) / BadResponseError

# Class: BadResponseError

## Hierarchy

- [`YouTubeCastReceiverError`](YouTubeCastReceiverError.md)

  ↳ **`BadResponseError`**

## Table of contents

### Constructors

- [constructor](BadResponseError.md#constructor)

### Properties

- [cause](BadResponseError.md#cause)
- [info](BadResponseError.md#info)

### Methods

- [getCauses](BadResponseError.md#getcauses)

## Constructors

### constructor

• **new BadResponseError**(`message`, `url`, `response`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `url` | `string` |
| `response` | `Object` |
| `response.status` | `number` |
| `response.statusText` | `string` |

#### Overrides

[YouTubeCastReceiverError](YouTubeCastReceiverError.md).[constructor](YouTubeCastReceiverError.md#constructor)

#### Defined in

[lib/utils/Errors.ts:43](https://github.com/patrickkfkan/yt-cast-receiver/blob/7694e32/src/lib/utils/Errors.ts#L43)

## Properties

### cause

• `Optional` **cause**: `any`

#### Inherited from

[YouTubeCastReceiverError](YouTubeCastReceiverError.md).[cause](YouTubeCastReceiverError.md#cause)

#### Defined in

[lib/utils/Errors.ts:3](https://github.com/patrickkfkan/yt-cast-receiver/blob/7694e32/src/lib/utils/Errors.ts#L3)

___

### info

• `Optional` **info**: `Record`<`string`, `any`\>

#### Inherited from

[YouTubeCastReceiverError](YouTubeCastReceiverError.md).[info](YouTubeCastReceiverError.md#info)

#### Defined in

[lib/utils/Errors.ts:4](https://github.com/patrickkfkan/yt-cast-receiver/blob/7694e32/src/lib/utils/Errors.ts#L4)

## Methods

### getCauses

▸ **getCauses**(): `any`[]

#### Returns

`any`[]

#### Inherited from

[YouTubeCastReceiverError](YouTubeCastReceiverError.md).[getCauses](YouTubeCastReceiverError.md#getcauses)

#### Defined in

[lib/utils/Errors.ts:17](https://github.com/patrickkfkan/yt-cast-receiver/blob/7694e32/src/lib/utils/Errors.ts#L17)
