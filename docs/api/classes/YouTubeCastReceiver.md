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
- [setAutoplayLoader](YouTubeCastReceiver.md#setautoplayloader)
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
| `options` | [`YouTubeCastReceiverOptions`](../README.md#youtubecastreceiveroptions) |

#### Overrides

EventEmitter.constructor

#### Defined in

[lib/YouTubeCastReceiver.ts:47](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/YouTubeCastReceiver.ts#L47)

## Accessors

### logger

• `get` **logger**(): [`Logger`](../interfaces/Logger.md)

#### Returns

[`Logger`](../interfaces/Logger.md)

#### Defined in

[lib/YouTubeCastReceiver.ts:170](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/YouTubeCastReceiver.ts#L170)

___

### status

• `get` **status**(): [`YouTubeCastReceiverStatus`](../README.md#youtubecastreceiverstatus)

#### Returns

[`YouTubeCastReceiverStatus`](../README.md#youtubecastreceiverstatus)

#### Defined in

[lib/YouTubeCastReceiver.ts:166](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/YouTubeCastReceiver.ts#L166)

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

[lib/YouTubeCastReceiver.ts:146](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/YouTubeCastReceiver.ts#L146)

___

### getConnectedSenders

▸ **getConnectedSenders**(): [`Sender`](Sender.md)[]

#### Returns

[`Sender`](Sender.md)[]

#### Defined in

[lib/YouTubeCastReceiver.ts:162](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/YouTubeCastReceiver.ts#L162)

___

### getPairingCodeRequestService

▸ **getPairingCodeRequestService**(): [`PairingCodeRequestService`](PairingCodeRequestService.md)

#### Returns

[`PairingCodeRequestService`](PairingCodeRequestService.md)

#### Defined in

[lib/YouTubeCastReceiver.ts:158](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/YouTubeCastReceiver.ts#L158)

___

### setAutoplayLoader

▸ **setAutoplayLoader**(`loader`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `loader` | ``null`` \| [`AutoplayLoader`](../interfaces/AutoplayLoader.md) |

#### Returns

`void`

#### Defined in

[lib/YouTubeCastReceiver.ts:150](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/YouTubeCastReceiver.ts#L150)

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

[lib/YouTubeCastReceiver.ts:154](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/YouTubeCastReceiver.ts#L154)

___

### start

▸ **start**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[lib/YouTubeCastReceiver.ts:96](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/YouTubeCastReceiver.ts#L96)

___

### stop

▸ **stop**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[lib/YouTubeCastReceiver.ts:127](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/YouTubeCastReceiver.ts#L127)

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

[lib/YouTubeCastReceiver.ts:179](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/YouTubeCastReceiver.ts#L179)

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

[lib/YouTubeCastReceiver.ts:185](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/YouTubeCastReceiver.ts#L185)

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

[lib/YouTubeCastReceiver.ts:191](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/YouTubeCastReceiver.ts#L191)

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

[lib/YouTubeCastReceiver.ts:197](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/YouTubeCastReceiver.ts#L197)
