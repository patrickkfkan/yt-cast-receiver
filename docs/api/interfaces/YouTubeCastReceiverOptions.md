[yt-cast-receiver](../README.md) / YouTubeCastReceiverOptions

# Interface: YouTubeCastReceiverOptions

Options consumed by constructor of `YouTubeCastReceiver` class.

## Table of contents

### Properties

- [app](YouTubeCastReceiverOptions.md#app)
- [device](YouTubeCastReceiverOptions.md#device)
- [dial](YouTubeCastReceiverOptions.md#dial)
- [logLevel](YouTubeCastReceiverOptions.md#loglevel)
- [logger](YouTubeCastReceiverOptions.md#logger)

## Properties

### app

• `Optional` **app**: `Omit`<[`AppOptions`](AppOptions.md), ``"brand"`` \| ``"model"`` \| ``"logger"`` \| ``"screenName"``\>

YouTube app options.

#### Defined in

[lib/YouTubeCastReceiver.ts:21](https://github.com/patrickkfkan/yt-cast-receiver/blob/5eecf1d/src/lib/YouTubeCastReceiver.ts#L21)

___

### device

• `Optional` **device**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `brand?` | `string` | - |
| `model?` | `string` | - |
| `name?` | `string` | The name shown in a sender app's Cast menu, when the receiver device is discovered through DIAL. **`Default`** Hostname |
| `screenName?` | `string` | The name shown in a sender app's Cast menu, when the receiver device was previously connected to through manual pairing. **`Default`** 'YouTube on <device.name>'' |

#### Defined in

[lib/YouTubeCastReceiver.ts:23](https://github.com/patrickkfkan/yt-cast-receiver/blob/5eecf1d/src/lib/YouTubeCastReceiver.ts#L23)

___

### dial

• `Optional` **dial**: `Omit`<[`DialOptions`](DialOptions.md), ``"friendlyName"`` \| ``"manufacturer"`` \| ``"modelName"`` \| ``"logger"``\>

DIAL server options.

#### Defined in

[lib/YouTubeCastReceiver.ts:18](https://github.com/patrickkfkan/yt-cast-receiver/blob/5eecf1d/src/lib/YouTubeCastReceiver.ts#L18)

___

### logLevel

• `Optional` **logLevel**: [`LogLevel`](../README.md#loglevel)

#### Defined in

[lib/YouTubeCastReceiver.ts:40](https://github.com/patrickkfkan/yt-cast-receiver/blob/5eecf1d/src/lib/YouTubeCastReceiver.ts#L40)

___

### logger

• `Optional` **logger**: [`Logger`](Logger.md)

#### Defined in

[lib/YouTubeCastReceiver.ts:41](https://github.com/patrickkfkan/yt-cast-receiver/blob/5eecf1d/src/lib/YouTubeCastReceiver.ts#L41)
