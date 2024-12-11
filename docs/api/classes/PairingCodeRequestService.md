[**yt-cast-receiver**](../README.md) • **Docs**

***

[yt-cast-receiver](../README.md) / PairingCodeRequestService

# Class: PairingCodeRequestService

Fetches pairing code for manual pairing (aka 'Link with TV code').
A pairing code is refreshed every 5 minutes. Results are returned through
the `response` event.

### Usage

```
const service = receiver.getPairingCodeRequestService();

service.on('request', () => {...});  // Event when request is being made
service.on('response', (code) => {...}); // Event when code is obtained
service.on('error', (error) => {...}); // Event when error occurs

service.start();
...

service.stop();
```

Note that the service stops on `error` event.

## Extends

- `EventEmitter`

## Accessors

### status

#### Get Signature

> **get** **status**(): `"stopped"` \| `"running"`

Service status

##### Returns

`"stopped"` \| `"running"`

#### Defined in

[src/lib/app/PairingCodeRequestService.ts:159](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/PairingCodeRequestService.ts#L159)

## Methods

### start()

> **start**(): `void`

Starts the service.

#### Returns

`void`

#### Defined in

[src/lib/app/PairingCodeRequestService.ts:53](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/PairingCodeRequestService.ts#L53)

***

### stop()

> **stop**(): `void`

Stops the service.

#### Returns

`void`

#### Defined in

[src/lib/app/PairingCodeRequestService.ts:65](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/PairingCodeRequestService.ts#L65)

## Events

### on()

#### on(event, listener)

> **on**(`event`, `listener`): `this`

Emitted when service is requesting pairing code.

##### Parameters

• **event**: `"request"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.on`

##### Defined in

[src/lib/app/PairingCodeRequestService.ts:140](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/PairingCodeRequestService.ts#L140)

#### on(event, listener)

> **on**(`event`, `listener`): `this`

Emitted when service has obtained pairing code.

##### Parameters

• **event**: `"response"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.on`

##### Defined in

[src/lib/app/PairingCodeRequestService.ts:146](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/PairingCodeRequestService.ts#L146)

#### on(event, listener)

> **on**(`event`, `listener`): `this`

Emitted when service encountered error. The service stops on this event.

##### Parameters

• **event**: `"error"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.on`

##### Defined in

[src/lib/app/PairingCodeRequestService.ts:152](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/PairingCodeRequestService.ts#L152)
