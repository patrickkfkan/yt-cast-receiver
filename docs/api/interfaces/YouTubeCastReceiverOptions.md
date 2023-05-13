[yt-cast-receiver](../README.md) / YouTubeCastReceiverOptions

# Interface: YouTubeCastReceiverOptions

Options consumed by constructor of `YouTubeCastReceiver` class.

## Table of contents

### Properties

- [app](YouTubeCastReceiverOptions.md#app)
- [dataStore](YouTubeCastReceiverOptions.md#datastore)
- [device](YouTubeCastReceiverOptions.md#device)
- [dial](YouTubeCastReceiverOptions.md#dial)
- [logLevel](YouTubeCastReceiverOptions.md#loglevel)
- [logger](YouTubeCastReceiverOptions.md#logger)

## Properties

### app

• `Optional` **app**: `Omit`<[`AppOptions`](AppOptions.md), ``"brand"`` \| ``"model"`` \| ``"logger"`` \| ``"screenName"`` \| ``"dataStore"``\>

YouTube app options.

#### Defined in

[src/lib/YouTubeCastReceiver.ts:23](https://github.com/patrickkfkan/yt-cast-receiver/blob/2051e1f/src/lib/YouTubeCastReceiver.ts#L23)

___

### dataStore

• `Optional` **dataStore**: ``false`` \| [`DataStore`](../classes/DataStore.md)

The `DataStore` instance used for persisting data such as session info.

**`Default`**

`DefaultDataStore` instance

#### Defined in

[src/lib/YouTubeCastReceiver.ts:46](https://github.com/patrickkfkan/yt-cast-receiver/blob/2051e1f/src/lib/YouTubeCastReceiver.ts#L46)

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

[src/lib/YouTubeCastReceiver.ts:25](https://github.com/patrickkfkan/yt-cast-receiver/blob/2051e1f/src/lib/YouTubeCastReceiver.ts#L25)

___

### dial

• `Optional` **dial**: `Omit`<[`DialOptions`](DialOptions.md), ``"friendlyName"`` \| ``"manufacturer"`` \| ``"modelName"`` \| ``"logger"``\>

DIAL server options.

#### Defined in

[src/lib/YouTubeCastReceiver.ts:20](https://github.com/patrickkfkan/yt-cast-receiver/blob/2051e1f/src/lib/YouTubeCastReceiver.ts#L20)

___

### logLevel

• `Optional` **logLevel**: [`LogLevel`](../README.md#loglevel)

#### Defined in

[src/lib/YouTubeCastReceiver.ts:48](https://github.com/patrickkfkan/yt-cast-receiver/blob/2051e1f/src/lib/YouTubeCastReceiver.ts#L48)

___

### logger

• `Optional` **logger**: [`Logger`](Logger.md)

#### Defined in

[src/lib/YouTubeCastReceiver.ts:49](https://github.com/patrickkfkan/yt-cast-receiver/blob/2051e1f/src/lib/YouTubeCastReceiver.ts#L49)
