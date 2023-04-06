[yt-cast-receiver-next](../README.md) / DefaultLogger

# Class: DefaultLogger

## Implements

- [`Logger`](../interfaces/Logger.md)

## Table of contents

### Constructors

- [constructor](DefaultLogger.md#constructor)

### Properties

- [color](DefaultLogger.md#color)
- [level](DefaultLogger.md#level)

### Methods

- [checkLevel](DefaultLogger.md#checklevel)
- [debug](DefaultLogger.md#debug)
- [error](DefaultLogger.md#error)
- [info](DefaultLogger.md#info)
- [process](DefaultLogger.md#process)
- [setLevel](DefaultLogger.md#setlevel)
- [toOutput](DefaultLogger.md#tooutput)
- [toStrings](DefaultLogger.md#tostrings)
- [warn](DefaultLogger.md#warn)

## Constructors

### constructor

• **new DefaultLogger**(`color?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `color` | `boolean` | `true` |

#### Defined in

lib/utils/DefaultLogger.ts:19

## Properties

### color

• **color**: `boolean`

#### Defined in

lib/utils/DefaultLogger.ts:17

___

### level

• **level**: [`LogLevel`](../README.md#loglevel)

#### Defined in

lib/utils/DefaultLogger.ts:16

## Methods

### checkLevel

▸ **checkLevel**(`targetLevel`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetLevel` | [`LogLevel`](../README.md#loglevel) |

#### Returns

`boolean`

#### Defined in

lib/utils/DefaultLogger.ts:44

___

### debug

▸ **debug**(`...msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...msg` | `any`[] |

#### Returns

`void`

#### Implementation of

[Logger](../interfaces/Logger.md).[debug](../interfaces/Logger.md#debug)

#### Defined in

lib/utils/DefaultLogger.ts:36

___

### error

▸ **error**(`...msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...msg` | `any`[] |

#### Returns

`void`

#### Implementation of

[Logger](../interfaces/Logger.md).[error](../interfaces/Logger.md#error)

#### Defined in

lib/utils/DefaultLogger.ts:24

___

### info

▸ **info**(`...msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...msg` | `any`[] |

#### Returns

`void`

#### Implementation of

[Logger](../interfaces/Logger.md).[info](../interfaces/Logger.md#info)

#### Defined in

lib/utils/DefaultLogger.ts:32

___

### process

▸ **process**(`targetLevel`, `msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetLevel` | [`LogLevel`](../README.md#loglevel) |
| `msg` | `any`[] |

#### Returns

`void`

#### Defined in

lib/utils/DefaultLogger.ts:48

___

### setLevel

▸ **setLevel**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`LogLevel`](../README.md#loglevel) |

#### Returns

`void`

#### Implementation of

[Logger](../interfaces/Logger.md).[setLevel](../interfaces/Logger.md#setlevel)

#### Defined in

lib/utils/DefaultLogger.ts:40

___

### toOutput

▸ **toOutput**(`msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string`[] |

#### Returns

`void`

#### Defined in

lib/utils/DefaultLogger.ts:87

___

### toStrings

▸ **toStrings**(`msg`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `any`[] |

#### Returns

`string`[]

#### Defined in

lib/utils/DefaultLogger.ts:54

___

### warn

▸ **warn**(`...msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...msg` | `any`[] |

#### Returns

`void`

#### Implementation of

[Logger](../interfaces/Logger.md).[warn](../interfaces/Logger.md#warn)

#### Defined in

lib/utils/DefaultLogger.ts:28
