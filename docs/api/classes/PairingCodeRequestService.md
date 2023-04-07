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

## Hierarchy

- `EventEmitter`

  ↳ **`PairingCodeRequestService`**

## Table of contents

### Accessors

- [status](PairingCodeRequestService.md#status)

### Events

- [on](PairingCodeRequestService.md#on)

### Methods

- [start](PairingCodeRequestService.md#start)
- [stop](PairingCodeRequestService.md#stop)

## Accessors

### status

• `get` **status**(): ``"stopped"`` \| ``"running"``

Service status

#### Returns

``"stopped"`` \| ``"running"``

#### Defined in

[lib/app/PairingCodeRequestService.ts:160](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/app/PairingCodeRequestService.ts#L160)

## Events

### on

▸ **on**(`event`, `listener`): [`PairingCodeRequestService`](PairingCodeRequestService.md)

Emitted when service is requesting pairing code.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"request"`` |
| `listener` | () => `void` |

#### Returns

[`PairingCodeRequestService`](PairingCodeRequestService.md)

#### Overrides

EventEmitter.on

#### Defined in

[lib/app/PairingCodeRequestService.ts:141](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/app/PairingCodeRequestService.ts#L141)

▸ **on**(`event`, `listener`): [`PairingCodeRequestService`](PairingCodeRequestService.md)

Emitted when service has obtained pairing code.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"response"`` |
| `listener` | (`code`: `string`) => `void` |

#### Returns

[`PairingCodeRequestService`](PairingCodeRequestService.md)

#### Overrides

EventEmitter.on

#### Defined in

[lib/app/PairingCodeRequestService.ts:147](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/app/PairingCodeRequestService.ts#L147)

▸ **on**(`event`, `listener`): [`PairingCodeRequestService`](PairingCodeRequestService.md)

Emitted when service encountered error. The service stops on this event.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`error`: `Error`) => `void` |

#### Returns

[`PairingCodeRequestService`](PairingCodeRequestService.md)

#### Overrides

EventEmitter.on

#### Defined in

[lib/app/PairingCodeRequestService.ts:153](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/app/PairingCodeRequestService.ts#L153)

## Methods

### start

▸ **start**(): `void`

Starts the service.

#### Returns

`void`

#### Defined in

[lib/app/PairingCodeRequestService.ts:54](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/app/PairingCodeRequestService.ts#L54)

___

### stop

▸ **stop**(): `void`

Stops the service.

#### Returns

`void`

#### Defined in

[lib/app/PairingCodeRequestService.ts:66](https://github.com/patrickkfkan/yt-cast-receiver/blob/a8d5090/src/lib/app/PairingCodeRequestService.ts#L66)
