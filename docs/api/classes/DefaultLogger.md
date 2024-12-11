[**yt-cast-receiver**](../README.md) • **Docs**

***

[yt-cast-receiver](../README.md) / DefaultLogger

# Class: DefaultLogger

## Implements

- [`Logger`](../interfaces/Logger.md)

## Constructors

### new DefaultLogger()

> **new DefaultLogger**(`color`): [`DefaultLogger`](DefaultLogger.md)

#### Parameters

• **color**: `boolean` = `true`

#### Returns

[`DefaultLogger`](DefaultLogger.md)

#### Defined in

[src/lib/utils/DefaultLogger.ts:20](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/utils/DefaultLogger.ts#L20)

## Properties

### color

> `protected` **color**: `boolean`

#### Defined in

[src/lib/utils/DefaultLogger.ts:18](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/utils/DefaultLogger.ts#L18)

***

### level

> `protected` **level**: [`LogLevel`](../type-aliases/LogLevel.md)

#### Defined in

[src/lib/utils/DefaultLogger.ts:17](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/utils/DefaultLogger.ts#L17)

## Methods

### checkLevel()

> `protected` **checkLevel**(`targetLevel`): `boolean`

#### Parameters

• **targetLevel**: [`LogLevel`](../type-aliases/LogLevel.md)

#### Returns

`boolean`

#### Defined in

[src/lib/utils/DefaultLogger.ts:45](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/utils/DefaultLogger.ts#L45)

***

### debug()

> **debug**(...`msg`): `void`

#### Parameters

• ...**msg**: `any`[]

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`debug`](../interfaces/Logger.md#debug)

#### Defined in

[src/lib/utils/DefaultLogger.ts:37](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/utils/DefaultLogger.ts#L37)

***

### error()

> **error**(...`msg`): `void`

#### Parameters

• ...**msg**: `any`[]

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`error`](../interfaces/Logger.md#error)

#### Defined in

[src/lib/utils/DefaultLogger.ts:25](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/utils/DefaultLogger.ts#L25)

***

### info()

> **info**(...`msg`): `void`

#### Parameters

• ...**msg**: `any`[]

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`info`](../interfaces/Logger.md#info)

#### Defined in

[src/lib/utils/DefaultLogger.ts:33](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/utils/DefaultLogger.ts#L33)

***

### process()

> `protected` **process**(`targetLevel`, `msg`): `void`

#### Parameters

• **targetLevel**: [`LogLevel`](../type-aliases/LogLevel.md)

• **msg**: `any`[]

#### Returns

`void`

#### Defined in

[src/lib/utils/DefaultLogger.ts:49](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/utils/DefaultLogger.ts#L49)

***

### setLevel()

> **setLevel**(`value`): `void`

#### Parameters

• **value**: [`LogLevel`](../type-aliases/LogLevel.md)

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`setLevel`](../interfaces/Logger.md#setlevel)

#### Defined in

[src/lib/utils/DefaultLogger.ts:41](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/utils/DefaultLogger.ts#L41)

***

### toOutput()

> `protected` **toOutput**(`targetLevel`, `msg`): `void`

#### Parameters

• **targetLevel**: [`LogLevel`](../type-aliases/LogLevel.md)

• **msg**: `string`[]

#### Returns

`void`

#### Defined in

[src/lib/utils/DefaultLogger.ts:88](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/utils/DefaultLogger.ts#L88)

***

### toStrings()

> `protected` **toStrings**(`msg`): `string`[]

#### Parameters

• **msg**: `any`[]

#### Returns

`string`[]

#### Defined in

[src/lib/utils/DefaultLogger.ts:55](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/utils/DefaultLogger.ts#L55)

***

### warn()

> **warn**(...`msg`): `void`

#### Parameters

• ...**msg**: `any`[]

#### Returns

`void`

#### Implementation of

[`Logger`](../interfaces/Logger.md).[`warn`](../interfaces/Logger.md#warn)

#### Defined in

[src/lib/utils/DefaultLogger.ts:29](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/utils/DefaultLogger.ts#L29)
