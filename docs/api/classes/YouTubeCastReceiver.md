[yt-cast-receiver](../README.md) / YouTubeCastReceiver

# Class: YouTubeCastReceiver

Main class of `yt-cast-receiver` library.

To create a `YouTubeCastReceiver` instance, you need to provide at least a
[Player](Player.md) implementation.

## Hierarchy

- `EventEmitter`

  ↳ **`YouTubeCastReceiver`**

## Table of contents

### Constructors

- [constructor](YouTubeCastReceiver.md#constructor)

### Accessors

- [logger](YouTubeCastReceiver.md#logger)
- [status](YouTubeCastReceiver.md#status)

### Methods

- [emit](YouTubeCastReceiver.md#emit)
- [enableAutoplayOnConnect](YouTubeCastReceiver.md#enableautoplayonconnect)
- [getConnectedSenders](YouTubeCastReceiver.md#getconnectedsenders)
- [getPairingCodeRequestService](YouTubeCastReceiver.md#getpairingcoderequestservice)
- [setLogLevel](YouTubeCastReceiver.md#setloglevel)
- [setResetPlayerOnDisconnectPolicy](YouTubeCastReceiver.md#setresetplayerondisconnectpolicy)
- [start](YouTubeCastReceiver.md#start)
- [stop](YouTubeCastReceiver.md#stop)

### Events

- [on](YouTubeCastReceiver.md#on)

## Constructors

### constructor

• **new YouTubeCastReceiver**(`player`, `options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `player` | [`Player`](Player.md) |
| `options` | [`YouTubeCastReceiverOptions`](../interfaces/YouTubeCastReceiverOptions.md) |

#### Overrides

EventEmitter.constructor

#### Defined in

[src/lib/YouTubeCastReceiver.ts:70](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/YouTubeCastReceiver.ts#L70)

## Accessors

### logger

• `get` **logger**(): [`Logger`](../interfaces/Logger.md)

#### Returns

[`Logger`](../interfaces/Logger.md)

#### Defined in

[src/lib/YouTubeCastReceiver.ts:204](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/YouTubeCastReceiver.ts#L204)

___

### status

• `get` **status**(): [`YouTubeCastReceiverStatus`](../README.md#youtubecastreceiverstatus)

#### Returns

[`YouTubeCastReceiverStatus`](../README.md#youtubecastreceiverstatus)

#### Defined in

[src/lib/YouTubeCastReceiver.ts:200](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/YouTubeCastReceiver.ts#L200)

## Methods

### emit

▸ **emit**(`event`, `error`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `error` | `Error` |

#### Returns

`boolean`

#### Overrides

EventEmitter.emit

#### Defined in

[src/lib/YouTubeCastReceiver.ts:208](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/YouTubeCastReceiver.ts#L208)

▸ **emit**(`event`, `error`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"terminate"`` |
| `error` | `Error` |

#### Returns

`boolean`

#### Overrides

EventEmitter.emit

#### Defined in

[src/lib/YouTubeCastReceiver.ts:209](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/YouTubeCastReceiver.ts#L209)

▸ **emit**(`event`, `sender`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"senderConnect"`` |
| `sender` | [`Sender`](Sender.md) |

#### Returns

`boolean`

#### Overrides

EventEmitter.emit

#### Defined in

[src/lib/YouTubeCastReceiver.ts:210](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/YouTubeCastReceiver.ts#L210)

▸ **emit**(`event`, `sender`, `implicit`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"senderDisconnect"`` |
| `sender` | [`Sender`](Sender.md) |
| `implicit` | `boolean` |

#### Returns

`boolean`

#### Overrides

EventEmitter.emit

#### Defined in

[src/lib/YouTubeCastReceiver.ts:211](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/YouTubeCastReceiver.ts#L211)

___

### enableAutoplayOnConnect

▸ **enableAutoplayOnConnect**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Defined in

[src/lib/YouTubeCastReceiver.ts:180](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/YouTubeCastReceiver.ts#L180)

___

### getConnectedSenders

▸ **getConnectedSenders**(): [`Sender`](Sender.md)[]

#### Returns

[`Sender`](Sender.md)[]

#### Defined in

[src/lib/YouTubeCastReceiver.ts:196](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/YouTubeCastReceiver.ts#L196)

___

### getPairingCodeRequestService

▸ **getPairingCodeRequestService**(): [`PairingCodeRequestService`](PairingCodeRequestService.md)

#### Returns

[`PairingCodeRequestService`](PairingCodeRequestService.md)

#### Defined in

[src/lib/YouTubeCastReceiver.ts:192](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/YouTubeCastReceiver.ts#L192)

___

### setLogLevel

▸ **setLogLevel**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`LogLevel`](../README.md#loglevel) |

#### Returns

`void`

#### Defined in

[src/lib/YouTubeCastReceiver.ts:188](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/YouTubeCastReceiver.ts#L188)

___

### setResetPlayerOnDisconnectPolicy

▸ **setResetPlayerOnDisconnectPolicy**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `ValueOf`<{ `ALL_DISCONNECTED`: ``"allDisconnected"`` = 'allDisconnected'; `ALL_EXPLICITLY_DISCONNECTED`: ``"allExplicitlyDisconnected"`` = 'allExplicitlyDisconnected' }\> |

#### Returns

`void`

#### Defined in

[src/lib/YouTubeCastReceiver.ts:184](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/YouTubeCastReceiver.ts#L184)

___

### start

▸ **start**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/YouTubeCastReceiver.ts:130](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/YouTubeCastReceiver.ts#L130)

___

### stop

▸ **stop**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/YouTubeCastReceiver.ts:161](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/YouTubeCastReceiver.ts#L161)

## Events

### on

▸ **on**(`event`, `listener`): [`YouTubeCastReceiver`](YouTubeCastReceiver.md)

Emitted when the `YouTubeApp` instance has terminated due to irrecoverable error.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"terminate"`` |
| `listener` | (`error`: `Error`) => `void` |

#### Returns

[`YouTubeCastReceiver`](YouTubeCastReceiver.md)

#### Overrides

EventEmitter.on

#### Defined in

[src/lib/YouTubeCastReceiver.ts:221](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/YouTubeCastReceiver.ts#L221)

▸ **on**(`event`, `listener`): [`YouTubeCastReceiver`](YouTubeCastReceiver.md)

Emitted when an error has occurred.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`error`: `Error`) => `void` |

#### Returns

[`YouTubeCastReceiver`](YouTubeCastReceiver.md)

#### Overrides

EventEmitter.on

#### Defined in

[src/lib/YouTubeCastReceiver.ts:227](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/YouTubeCastReceiver.ts#L227)

▸ **on**(`event`, `listener`): [`YouTubeCastReceiver`](YouTubeCastReceiver.md)

Emitted when a sender has disconnected.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"senderDisconnect"`` |
| `listener` | (`sender`: [`Sender`](Sender.md), `implicit`: `boolean`) => `void` |

#### Returns

[`YouTubeCastReceiver`](YouTubeCastReceiver.md)

#### Overrides

EventEmitter.on

#### Defined in

[src/lib/YouTubeCastReceiver.ts:233](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/YouTubeCastReceiver.ts#L233)

▸ **on**(`event`, `listener`): [`YouTubeCastReceiver`](YouTubeCastReceiver.md)

Emitted when a sender has connected.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"senderConnect"`` |
| `listener` | (`sender`: [`Sender`](Sender.md)) => `void` |

#### Returns

[`YouTubeCastReceiver`](YouTubeCastReceiver.md)

#### Overrides

EventEmitter.on

#### Defined in

[src/lib/YouTubeCastReceiver.ts:239](https://github.com/patrickkfkan/yt-cast-receiver/blob/630ac05/src/lib/YouTubeCastReceiver.ts#L239)
