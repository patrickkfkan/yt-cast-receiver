[yt-cast-receiver](../README.md) / DefaultDataStore

# Class: DefaultDataStore

Default `DataStore` implementation that uses [node-persist](https://github.com/simonlast/node-persist) to persist data.

## Hierarchy

- [`DataStore`](DataStore.md)

  ↳ **`DefaultDataStore`**

## Table of contents

### Constructors

- [constructor](DefaultDataStore.md#constructor)

### Accessors

- [logger](DefaultDataStore.md#logger)

### Methods

- [clear](DefaultDataStore.md#clear)
- [get](DefaultDataStore.md#get)
- [set](DefaultDataStore.md#set)
- [setLogger](DefaultDataStore.md#setlogger)

## Constructors

### constructor

• **new DefaultDataStore**()

#### Overrides

[DataStore](DataStore.md).[constructor](DataStore.md#constructor)

#### Defined in

[src/lib/utils/DefaultDataStore.ts:11](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/utils/DefaultDataStore.ts#L11)

## Accessors

### logger

• `get` **logger**(): [`Logger`](../interfaces/Logger.md)

#### Returns

[`Logger`](../interfaces/Logger.md)

#### Inherited from

DataStore.logger

#### Defined in

[src/lib/utils/DataStore.ts:14](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/utils/DataStore.ts#L14)

## Methods

### clear

▸ **clear**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/utils/DefaultDataStore.ts:36](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/utils/DefaultDataStore.ts#L36)

___

### get

▸ **get**<`T`\>(`key`): `Promise`<``null`` \| `T`\>

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

#### Overrides

[DataStore](DataStore.md).[get](DataStore.md#get)

#### Defined in

[src/lib/utils/DefaultDataStore.ts:26](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/utils/DefaultDataStore.ts#L26)

___

### set

▸ **set**<`T`\>(`key`, `value`): `Promise`<`void`\>

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

#### Overrides

[DataStore](DataStore.md).[set](DataStore.md#set)

#### Defined in

[src/lib/utils/DefaultDataStore.ts:17](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/utils/DefaultDataStore.ts#L17)

___

### setLogger

▸ **setLogger**(`logger`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `logger` | [`Logger`](../interfaces/Logger.md) |

#### Returns

`void`

#### Inherited from

[DataStore](DataStore.md).[setLogger](DataStore.md#setlogger)

#### Defined in

[src/lib/utils/DataStore.ts:7](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/utils/DataStore.ts#L7)
