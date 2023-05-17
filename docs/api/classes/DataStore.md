[yt-cast-receiver](../README.md) / DataStore

# Class: DataStore

## Hierarchy

- **`DataStore`**

  ↳ [`DefaultDataStore`](DefaultDataStore.md)

## Table of contents

### Constructors

- [constructor](DataStore.md#constructor)

### Accessors

- [logger](DataStore.md#logger)

### Methods

- [get](DataStore.md#get)
- [set](DataStore.md#set)
- [setLogger](DataStore.md#setlogger)

## Constructors

### constructor

• **new DataStore**()

## Accessors

### logger

• `get` **logger**(): [`Logger`](../interfaces/Logger.md)

#### Returns

[`Logger`](../interfaces/Logger.md)

#### Defined in

[src/lib/utils/DataStore.ts:14](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/utils/DataStore.ts#L14)

## Methods

### get

▸ `Abstract` **get**<`T`\>(`key`): `Promise`<``null`` \| `T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Promise`<``null`` \| `T`\>

#### Defined in

[src/lib/utils/DataStore.ts:12](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/utils/DataStore.ts#L12)

___

### set

▸ `Abstract` **set**<`T`\>(`key`, `value`): `Promise`<`void`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `T` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/utils/DataStore.ts:11](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/utils/DataStore.ts#L11)

___

### setLogger

▸ **setLogger**(`logger`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `logger` | [`Logger`](../interfaces/Logger.md) |

#### Returns

`void`

#### Defined in

[src/lib/utils/DataStore.ts:7](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/utils/DataStore.ts#L7)
