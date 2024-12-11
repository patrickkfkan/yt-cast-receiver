[**yt-cast-receiver**](../README.md) • **Docs**

***

[yt-cast-receiver](../README.md) / YouTubeCastReceiver

# Class: YouTubeCastReceiver

Main class of `yt-cast-receiver` library.

To create a `YouTubeCastReceiver` instance, you need to provide at least a
[Player](Player.md) implementation.

## Extends

- `EventEmitter`

## Constructors

### new YouTubeCastReceiver()

> **new YouTubeCastReceiver**(`player`, `options`): [`YouTubeCastReceiver`](YouTubeCastReceiver.md)

#### Parameters

• **player**: [`Player`](Player.md)

• **options**: [`YouTubeCastReceiverOptions`](../interfaces/YouTubeCastReceiverOptions.md) = `{}`

#### Returns

[`YouTubeCastReceiver`](YouTubeCastReceiver.md)

#### Overrides

`EventEmitter.constructor`

#### Defined in

[src/lib/YouTubeCastReceiver.ts:71](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/YouTubeCastReceiver.ts#L71)

## Accessors

### logger

#### Get Signature

> **get** **logger**(): [`Logger`](../interfaces/Logger.md)

##### Returns

[`Logger`](../interfaces/Logger.md)

#### Defined in

[src/lib/YouTubeCastReceiver.ts:207](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/YouTubeCastReceiver.ts#L207)

***

### status

#### Get Signature

> **get** **status**(): [`YouTubeCastReceiverStatus`](../type-aliases/YouTubeCastReceiverStatus.md)

##### Returns

[`YouTubeCastReceiverStatus`](../type-aliases/YouTubeCastReceiverStatus.md)

#### Defined in

[src/lib/YouTubeCastReceiver.ts:203](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/YouTubeCastReceiver.ts#L203)

## Methods

### emit()

#### emit(event, error)

> **emit**(`event`, `error`): `boolean`

Synchronously calls each of the listeners registered for the event named`eventName`, in the order they were registered, passing the supplied arguments
to each.

Returns `true` if the event had listeners, `false` otherwise.

```js
import EventEmitter from 'node:events';
const myEmitter = new EventEmitter();

// First listener
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
// Second listener
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ');
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners('event'));

myEmitter.emit('event', 1, 2, 3, 4, 5);

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

##### Parameters

• **event**: `"error"`

• **error**: `Error`

##### Returns

`boolean`

##### Since

v0.1.26

##### Overrides

`EventEmitter.emit`

##### Defined in

[src/lib/YouTubeCastReceiver.ts:211](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/YouTubeCastReceiver.ts#L211)

#### emit(event, error)

> **emit**(`event`, `error`): `boolean`

##### Parameters

• **event**: `"terminate"`

• **error**: `Error`

##### Returns

`boolean`

##### Overrides

`EventEmitter.emit`

##### Defined in

[src/lib/YouTubeCastReceiver.ts:212](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/YouTubeCastReceiver.ts#L212)

#### emit(event, sender)

> **emit**(`event`, `sender`): `boolean`

##### Parameters

• **event**: `"senderConnect"`

• **sender**: [`Sender`](Sender.md)

##### Returns

`boolean`

##### Overrides

`EventEmitter.emit`

##### Defined in

[src/lib/YouTubeCastReceiver.ts:213](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/YouTubeCastReceiver.ts#L213)

#### emit(event, sender, implicit)

> **emit**(`event`, `sender`, `implicit`): `boolean`

##### Parameters

• **event**: `"senderDisconnect"`

• **sender**: [`Sender`](Sender.md)

• **implicit**: `boolean`

##### Returns

`boolean`

##### Overrides

`EventEmitter.emit`

##### Defined in

[src/lib/YouTubeCastReceiver.ts:214](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/YouTubeCastReceiver.ts#L214)

***

### enableAutoplayOnConnect()

> **enableAutoplayOnConnect**(`value`): `void`

#### Parameters

• **value**: `boolean`

#### Returns

`void`

#### Defined in

[src/lib/YouTubeCastReceiver.ts:183](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/YouTubeCastReceiver.ts#L183)

***

### getConnectedSenders()

> **getConnectedSenders**(): [`Sender`](Sender.md)[]

#### Returns

[`Sender`](Sender.md)[]

#### Defined in

[src/lib/YouTubeCastReceiver.ts:199](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/YouTubeCastReceiver.ts#L199)

***

### getPairingCodeRequestService()

> **getPairingCodeRequestService**(): [`PairingCodeRequestService`](PairingCodeRequestService.md)

#### Returns

[`PairingCodeRequestService`](PairingCodeRequestService.md)

#### Defined in

[src/lib/YouTubeCastReceiver.ts:195](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/YouTubeCastReceiver.ts#L195)

***

### setLogLevel()

> **setLogLevel**(`value`): `void`

#### Parameters

• **value**: [`LogLevel`](../type-aliases/LogLevel.md)

#### Returns

`void`

#### Defined in

[src/lib/YouTubeCastReceiver.ts:191](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/YouTubeCastReceiver.ts#L191)

***

### setResetPlayerOnDisconnectPolicy()

> **setResetPlayerOnDisconnectPolicy**(`value`): `void`

#### Parameters

• **value**: `ValueOf`\<`object`\>

#### Returns

`void`

#### Defined in

[src/lib/YouTubeCastReceiver.ts:187](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/YouTubeCastReceiver.ts#L187)

***

### start()

> **start**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/YouTubeCastReceiver.ts:133](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/YouTubeCastReceiver.ts#L133)

***

### stop()

> **stop**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/lib/YouTubeCastReceiver.ts:164](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/YouTubeCastReceiver.ts#L164)

## Events

### on()

#### on(event, listener)

> **on**(`event`, `listener`): `this`

Emitted when the `YouTubeApp` instance has terminated due to irrecoverable error.

##### Parameters

• **event**: `"terminate"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.on`

##### Defined in

[src/lib/YouTubeCastReceiver.ts:224](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/YouTubeCastReceiver.ts#L224)

#### on(event, listener)

> **on**(`event`, `listener`): `this`

Emitted when an error has occurred.

##### Parameters

• **event**: `"error"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.on`

##### Defined in

[src/lib/YouTubeCastReceiver.ts:230](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/YouTubeCastReceiver.ts#L230)

#### on(event, listener)

> **on**(`event`, `listener`): `this`

Emitted when a sender has disconnected.

##### Parameters

• **event**: `"senderDisconnect"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.on`

##### Defined in

[src/lib/YouTubeCastReceiver.ts:236](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/YouTubeCastReceiver.ts#L236)

#### on(event, listener)

> **on**(`event`, `listener`): `this`

Emitted when a sender has connected.

##### Parameters

• **event**: `"senderConnect"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.on`

##### Defined in

[src/lib/YouTubeCastReceiver.ts:242](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/YouTubeCastReceiver.ts#L242)
