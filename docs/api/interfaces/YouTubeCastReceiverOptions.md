[**yt-cast-receiver**](../README.md) • **Docs**

***

[yt-cast-receiver](../README.md) / YouTubeCastReceiverOptions

# Interface: YouTubeCastReceiverOptions

Options consumed by constructor of `YouTubeCastReceiver` class.

## Properties

### app?

> `optional` **app**: `Omit`\<[`AppOptions`](AppOptions.md), `"brand"` \| `"model"` \| `"logger"` \| `"screenName"` \| `"dataStore"`\>

YouTube app options.

#### Defined in

[src/lib/YouTubeCastReceiver.ts:24](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/YouTubeCastReceiver.ts#L24)

***

### dataStore?

> `optional` **dataStore**: `false` \| [`DataStore`](../classes/DataStore.md)

The `DataStore` instance used for persisting data such as session info.

#### Default

`DefaultDataStore` instance

#### Defined in

[src/lib/YouTubeCastReceiver.ts:47](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/YouTubeCastReceiver.ts#L47)

***

### device?

> `optional` **device**: `object`

#### brand?

> `optional` **brand**: `string`

#### model?

> `optional` **model**: `string`

#### name?

> `optional` **name**: `string`

The name shown in a sender app's Cast menu, when the receiver device is discovered through DIAL.

##### Default

```ts
Hostname
```

#### screenName?

> `optional` **screenName**: `string`

The name shown in a sender app's Cast menu, when the receiver device was previously connected to through manual pairing.

##### Default

```ts
'YouTube on <device.name>''
```

#### Defined in

[src/lib/YouTubeCastReceiver.ts:26](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/YouTubeCastReceiver.ts#L26)

***

### dial?

> `optional` **dial**: `Omit`\<[`DialOptions`](DialOptions.md), `"friendlyName"` \| `"manufacturer"` \| `"modelName"` \| `"logger"`\>

DIAL server options.

#### Defined in

[src/lib/YouTubeCastReceiver.ts:21](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/YouTubeCastReceiver.ts#L21)

***

### logger?

> `optional` **logger**: [`Logger`](Logger.md)

#### Defined in

[src/lib/YouTubeCastReceiver.ts:50](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/YouTubeCastReceiver.ts#L50)

***

### logLevel?

> `optional` **logLevel**: [`LogLevel`](../type-aliases/LogLevel.md)

#### Defined in

[src/lib/YouTubeCastReceiver.ts:49](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/YouTubeCastReceiver.ts#L49)
