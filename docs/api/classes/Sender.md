[yt-cast-receiver](../README.md) / Sender

# Class: Sender

A `Sender` object holds information about a sender.

## Table of contents

### Properties

- [app](Sender.md#app)
- [capabilities](Sender.md#capabilities)
- [client](Sender.md#client)
- [device](Sender.md#device)
- [id](Sender.md#id)
- [name](Sender.md#name)
- [user](Sender.md#user)

### Methods

- [supportsAutoplay](Sender.md#supportsautoplay)
- [supportsMute](Sender.md#supportsmute)

## Properties

### app

• **app**: ``null`` \| `string`

#### Defined in

[src/lib/app/Sender.ts:11](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/Sender.ts#L11)

___

### capabilities

• **capabilities**: `string`[]

#### Defined in

[src/lib/app/Sender.ts:13](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/Sender.ts#L13)

___

### client

• **client**: ``null`` \| [`Client`](../interfaces/Client.md)

#### Defined in

[src/lib/app/Sender.ts:12](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/Sender.ts#L12)

___

### device

• **device**: `Record`<`string`, `any`\>

#### Defined in

[src/lib/app/Sender.ts:14](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/Sender.ts#L14)

___

### id

• **id**: `string`

#### Defined in

[src/lib/app/Sender.ts:9](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/Sender.ts#L9)

___

### name

• **name**: `string`

#### Defined in

[src/lib/app/Sender.ts:10](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/Sender.ts#L10)

___

### user

• `Optional` **user**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `thumbnail` | `string` |

#### Defined in

[src/lib/app/Sender.ts:15](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/Sender.ts#L15)

## Methods

### supportsAutoplay

▸ **supportsAutoplay**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/app/Sender.ts:57](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/Sender.ts#L57)

___

### supportsMute

▸ **supportsMute**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/app/Sender.ts:61](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/app/Sender.ts#L61)
