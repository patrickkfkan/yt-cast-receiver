[**yt-cast-receiver**](../README.md) • **Docs**

***

[yt-cast-receiver](../README.md) / DataStore

# Class: `abstract` DataStore

## Extended by

- [`DefaultDataStore`](DefaultDataStore.md)

## Constructors

### new DataStore()

> **new DataStore**(): [`DataStore`](DataStore.md)

#### Returns

[`DataStore`](DataStore.md)

## Accessors

### logger

#### Get Signature

> **get** **logger**(): [`Logger`](../interfaces/Logger.md)

##### Returns

[`Logger`](../interfaces/Logger.md)

#### Defined in

[src/lib/utils/DataStore.ts:15](https://github.com/patrickkfkan/yt-cast-receiver/blob/7898fbce0f56a5f9871c7ea968fa6c6f4e21202f/src/lib/utils/DataStore.ts#L15)

## Methods

### get()

> `abstract` **get**\<`T`\>(`key`): `Promise`\<`null` \| `T`\>

#### Type Parameters

• **T**

#### Parameters

• **key**: `string`

#### Returns

`Promise`\<`null` \| `T`\>

#### Defined in

[src/lib/utils/DataStore.ts:13](https://github.com/patrickkfkan/yt-cast-receiver/blob/7898fbce0f56a5f9871c7ea968fa6c6f4e21202f/src/lib/utils/DataStore.ts#L13)

***

### set()

> `abstract` **set**\<`T`\>(`key`, `value`): `Promise`\<`void`\>

#### Type Parameters

• **T**

#### Parameters

• **key**: `string`

• **value**: `T`

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/utils/DataStore.ts:12](https://github.com/patrickkfkan/yt-cast-receiver/blob/7898fbce0f56a5f9871c7ea968fa6c6f4e21202f/src/lib/utils/DataStore.ts#L12)

***

### setLogger()

> **setLogger**(`logger`): `void`

#### Parameters

• **logger**: [`Logger`](../interfaces/Logger.md)

#### Returns

`void`

#### Defined in

[src/lib/utils/DataStore.ts:7](https://github.com/patrickkfkan/yt-cast-receiver/blob/7898fbce0f56a5f9871c7ea968fa6c6f4e21202f/src/lib/utils/DataStore.ts#L7)
