[**yt-cast-receiver**](../README.md) • **Docs**

***

[yt-cast-receiver](../README.md) / Playlist

# Class: Playlist

Representation of the player queue.

## Extends

- `EventEmitter`

## Accessors

### autoplay

#### Get Signature

> **get** **autoplay**(): `null` \| [`Video`](../interfaces/Video.md)

##### Returns

`null` \| [`Video`](../interfaces/Video.md)

#### Defined in

[src/lib/app/Playlist.ts:332](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/Playlist.ts#L332)

***

### autoplayMode

#### Get Signature

> **get** **autoplayMode**(): [`AutoplayMode`](../type-aliases/AutoplayMode.md)

##### Returns

[`AutoplayMode`](../type-aliases/AutoplayMode.md)

#### Defined in

[src/lib/app/Playlist.ts:343](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/Playlist.ts#L343)

***

### current

#### Get Signature

> **get** **current**(): `null` \| [`Video`](../interfaces/Video.md)

##### Returns

`null` \| [`Video`](../interfaces/Video.md)

#### Defined in

[src/lib/app/Playlist.ts:339](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/Playlist.ts#L339)

***

### hasNext

#### Get Signature

> **get** **hasNext**(): `boolean`

##### Returns

`boolean`

#### Defined in

[src/lib/app/Playlist.ts:356](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/Playlist.ts#L356)

***

### hasPrevious

#### Get Signature

> **get** **hasPrevious**(): `boolean`

##### Returns

`boolean`

#### Defined in

[src/lib/app/Playlist.ts:352](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/Playlist.ts#L352)

***

### id

#### Get Signature

> **get** **id**(): `null` \| `string`

Id of the playlist.

##### Returns

`null` \| `string`

#### Defined in

[src/lib/app/Playlist.ts:272](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/Playlist.ts#L272)

***

### isLast

#### Get Signature

> **get** **isLast**(): `boolean`

##### Returns

`boolean`

#### Defined in

[src/lib/app/Playlist.ts:347](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/Playlist.ts#L347)

***

### isUpdating

#### Get Signature

> **get** **isUpdating**(): `boolean`

##### Returns

`boolean`

#### Defined in

[src/lib/app/Playlist.ts:363](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/Playlist.ts#L363)

***

### length

#### Get Signature

> **get** **length**(): `number`

The number of videos in the playlist.

##### Returns

`number`

#### Defined in

[src/lib/app/Playlist.ts:286](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/Playlist.ts#L286)

***

### videoIds

#### Get Signature

> **get** **videoIds**(): `string`[]

The Ids of the videos in the playlist.

##### Returns

`string`[]

#### Defined in

[src/lib/app/Playlist.ts:279](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/Playlist.ts#L279)

## Methods

### getState()

> **getState**(): [`PlaylistState`](../interfaces/PlaylistState.md)

#### Returns

[`PlaylistState`](../interfaces/PlaylistState.md)

#### Defined in

[src/lib/app/Playlist.ts:310](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/Playlist.ts#L310)

***

### on()

#### on(event, listener)

> **on**(`event`, `listener`): `this`

Adds the `listener` function to the end of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName` and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
const myEE = new EventEmitter();
myEE.on('foo', () => console.log('a'));
myEE.prependListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

##### Parameters

• **event**: `"autoplayModeChange"`

• **listener**

The callback function

##### Returns

`this`

##### Since

v0.1.101

##### Overrides

`EventEmitter.on`

##### Defined in

[src/lib/app/Playlist.ts:374](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/Playlist.ts#L374)

#### on(event, listener)

> **on**(`event`, `listener`): `this`

##### Parameters

• **event**: `"playlistUpdated"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.on`

##### Defined in

[src/lib/app/Playlist.ts:375](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/Playlist.ts#L375)

#### on(event, listener)

> **on**(`event`, `listener`): `this`

##### Parameters

• **event**: `"playlistCleared"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.on`

##### Defined in

[src/lib/app/Playlist.ts:376](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/Playlist.ts#L376)

#### on(event, listener)

> **on**(`event`, `listener`): `this`

##### Parameters

• **event**: `"videoSelected"` \| `"videoAdded"` \| `"videoRemoved"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.on`

##### Defined in

[src/lib/app/Playlist.ts:377](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/Playlist.ts#L377)

#### on(event, listener)

> **on**(`event`, `listener`): `this`

##### Parameters

• **event**: `"playlistSet"` \| `"playlistAdded"`

• **listener**

##### Returns

`this`

##### Overrides

`EventEmitter.on`

##### Defined in

[src/lib/app/Playlist.ts:378](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/Playlist.ts#L378)
