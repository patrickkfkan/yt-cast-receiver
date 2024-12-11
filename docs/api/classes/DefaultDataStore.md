[**yt-cast-receiver**](../README.md) • **Docs**

***

[yt-cast-receiver](../README.md) / DefaultDataStore

# Class: DefaultDataStore

Default `DataStore` implementation that uses [node-persist](https://github.com/simonlast/node-persist) to persist data.

## Extends

- [`DataStore`](DataStore.md)

## Constructors

### new DefaultDataStore()

> **new DefaultDataStore**(): [`DefaultDataStore`](DefaultDataStore.md)

#### Returns

[`DefaultDataStore`](DefaultDataStore.md)

#### Overrides

[`DataStore`](DataStore.md).[`constructor`](DataStore.md#constructors)

#### Defined in

[src/lib/utils/DefaultDataStore.ts:11](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/utils/DefaultDataStore.ts#L11)

## Accessors

### logger

#### Get Signature

> **get** **logger**(): [`Logger`](../interfaces/Logger.md)

##### Returns

[`Logger`](../interfaces/Logger.md)

#### Inherited from

[`DataStore`](DataStore.md).[`logger`](DataStore.md#logger)

#### Defined in

[src/lib/utils/DataStore.ts:15](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/utils/DataStore.ts#L15)

## Methods

### clear()

> **clear**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/utils/DefaultDataStore.ts:37](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/utils/DefaultDataStore.ts#L37)

***

### get()

> **get**\<`T`\>(`key`): `Promise`\<`null` \| `T`\>

#### Type Parameters

• **T**

#### Parameters

• **key**: `string`

#### Returns

`Promise`\<`null` \| `T`\>

#### Overrides

[`DataStore`](DataStore.md).[`get`](DataStore.md#get)

#### Defined in

[src/lib/utils/DefaultDataStore.ts:27](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/utils/DefaultDataStore.ts#L27)

***

### set()

> **set**\<`T`\>(`key`, `value`): `Promise`\<`void`\>

#### Type Parameters

• **T**

#### Parameters

• **key**: `string`

• **value**: `T`

#### Returns

`Promise`\<`void`\>

#### Overrides

[`DataStore`](DataStore.md).[`set`](DataStore.md#set)

#### Defined in

[src/lib/utils/DefaultDataStore.ts:18](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/utils/DefaultDataStore.ts#L18)

***

### setLogger()

> **setLogger**(`logger`): `void`

#### Parameters

• **logger**: [`Logger`](../interfaces/Logger.md)

#### Returns

`void`

#### Inherited from

[`DataStore`](DataStore.md).[`setLogger`](DataStore.md#setlogger)

#### Defined in

[src/lib/utils/DataStore.ts:7](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/utils/DataStore.ts#L7)
