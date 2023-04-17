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

- [enableAutoplayOnConnect](YouTubeCastReceiver.md#enableautoplayonconnect)
- [getConnectedSenders](YouTubeCastReceiver.md#getconnectedsenders)
- [getPairingCodeRequestService](YouTubeCastReceiver.md#getpairingcoderequestservice)
- [setLogLevel](YouTubeCastReceiver.md#setloglevel)
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

[lib/YouTubeCastReceiver.ts:62](https://github.com/patrickkfkan/yt-cast-receiver/blob/5eecf1d/src/lib/YouTubeCastReceiver.ts#L62)

## Accessors

### logger

• `get` **logger**(): [`Logger`](../interfaces/Logger.md)

#### Returns

[`Logger`](../interfaces/Logger.md)

#### Defined in

[lib/YouTubeCastReceiver.ts:186](https://github.com/patrickkfkan/yt-cast-receiver/blob/5eecf1d/src/lib/YouTubeCastReceiver.ts#L186)

___

### status

• `get` **status**(): [`YouTubeCastReceiverStatus`](../README.md#youtubecastreceiverstatus)

#### Returns

[`YouTubeCastReceiverStatus`](../README.md#youtubecastreceiverstatus)

#### Defined in

[lib/YouTubeCastReceiver.ts:182](https://github.com/patrickkfkan/yt-cast-receiver/blob/5eecf1d/src/lib/YouTubeCastReceiver.ts#L182)

## Methods

### enableAutoplayOnConnect

▸ **enableAutoplayOnConnect**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Defined in

[lib/YouTubeCastReceiver.ts:166](https://github.com/patrickkfkan/yt-cast-receiver/blob/5eecf1d/src/lib/YouTubeCastReceiver.ts#L166)

___

### getConnectedSenders

▸ **getConnectedSenders**(): [`Sender`](Sender.md)[]

#### Returns

[`Sender`](Sender.md)[]

#### Defined in

[lib/YouTubeCastReceiver.ts:178](https://github.com/patrickkfkan/yt-cast-receiver/blob/5eecf1d/src/lib/YouTubeCastReceiver.ts#L178)

___

### getPairingCodeRequestService

▸ **getPairingCodeRequestService**(): [`PairingCodeRequestService`](PairingCodeRequestService.md)

#### Returns

[`PairingCodeRequestService`](PairingCodeRequestService.md)

#### Defined in

[lib/YouTubeCastReceiver.ts:174](https://github.com/patrickkfkan/yt-cast-receiver/blob/5eecf1d/src/lib/YouTubeCastReceiver.ts#L174)

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

[lib/YouTubeCastReceiver.ts:170](https://github.com/patrickkfkan/yt-cast-receiver/blob/5eecf1d/src/lib/YouTubeCastReceiver.ts#L170)

___

### start

▸ **start**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[lib/YouTubeCastReceiver.ts:116](https://github.com/patrickkfkan/yt-cast-receiver/blob/5eecf1d/src/lib/YouTubeCastReceiver.ts#L116)

___

### stop

▸ **stop**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[lib/YouTubeCastReceiver.ts:147](https://github.com/patrickkfkan/yt-cast-receiver/blob/5eecf1d/src/lib/YouTubeCastReceiver.ts#L147)

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

[lib/YouTubeCastReceiver.ts:195](https://github.com/patrickkfkan/yt-cast-receiver/blob/5eecf1d/src/lib/YouTubeCastReceiver.ts#L195)

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

[lib/YouTubeCastReceiver.ts:201](https://github.com/patrickkfkan/yt-cast-receiver/blob/5eecf1d/src/lib/YouTubeCastReceiver.ts#L201)

▸ **on**(`event`, `listener`): [`YouTubeCastReceiver`](YouTubeCastReceiver.md)

Emitted when a sender has connected.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"senderDisconnect"`` |
| `listener` | (`sender`: [`Sender`](Sender.md)) => `void` |

#### Returns

[`YouTubeCastReceiver`](YouTubeCastReceiver.md)

#### Overrides

EventEmitter.on

#### Defined in

[lib/YouTubeCastReceiver.ts:207](https://github.com/patrickkfkan/yt-cast-receiver/blob/5eecf1d/src/lib/YouTubeCastReceiver.ts#L207)

▸ **on**(`event`, `listener`): [`YouTubeCastReceiver`](YouTubeCastReceiver.md)

Emitted when a sender has disconnected.

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

[lib/YouTubeCastReceiver.ts:213](https://github.com/patrickkfkan/yt-cast-receiver/blob/5eecf1d/src/lib/YouTubeCastReceiver.ts#L213)
