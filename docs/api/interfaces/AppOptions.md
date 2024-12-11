[**yt-cast-receiver**](../README.md) • **Docs**

***

[yt-cast-receiver](../README.md) / AppOptions

# Interface: AppOptions

## Properties

### brand?

> `optional` **brand**: `string`

#### Default

```ts
CONF_DEFAULTS.BRAND
```

#### Defined in

[src/lib/app/YouTubeApp.ts:30](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/YouTubeApp.ts#L30)

***

### dataStore

> **dataStore**: `null` \| [`DataStore`](../classes/DataStore.md)

#### Defined in

[src/lib/app/YouTubeApp.ts:52](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/YouTubeApp.ts#L52)

***

### enableAutoplayOnConnect?

> `optional` **enableAutoplayOnConnect**: `boolean`

#### Default

```ts
true
```

#### Defined in

[src/lib/app/YouTubeApp.ts:38](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/YouTubeApp.ts#L38)

***

### logger

> **logger**: [`Logger`](Logger.md)

#### Defined in

[src/lib/app/YouTubeApp.ts:54](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/YouTubeApp.ts#L54)

***

### model?

> `optional` **model**: `string`

#### Default

```ts
CONF_DEFAULTS.MODEL
```

#### Defined in

[src/lib/app/YouTubeApp.ts:34](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/YouTubeApp.ts#L34)

***

### mutePolicy?

> `optional` **mutePolicy**: `ValueOf`\<`object`\>

#### Type declaration

##### AUTO

> `readonly` **AUTO**: `"auto"` = `'auto'`

##### PRESERVE\_VOLUME\_LEVEL

> `readonly` **PRESERVE\_VOLUME\_LEVEL**: `"preserveLevel"` = `'preserveLevel'`

##### ZERO\_VOLUME\_LEVEL

> `readonly` **ZERO\_VOLUME\_LEVEL**: `"zeroLevel"` = `'zeroLevel'`

#### Default

```ts
MUTE_POLICIES.AUTO
```

#### Defined in

[src/lib/app/YouTubeApp.ts:42](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/YouTubeApp.ts#L42)

***

### playlistRequestHandler?

> `optional` **playlistRequestHandler**: [`PlaylistRequestHandler`](../classes/PlaylistRequestHandler.md)

#### Default

`DefaultPlaylistRequestHandler` instance

#### Defined in

[src/lib/app/YouTubeApp.ts:50](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/YouTubeApp.ts#L50)

***

### resetPlayerOnDisconnectPolicy?

> `optional` **resetPlayerOnDisconnectPolicy**: `ValueOf`\<`object`\>

#### Type declaration

##### ALL\_DISCONNECTED

> `readonly` **ALL\_DISCONNECTED**: `"allDisconnected"` = `'allDisconnected'`

##### ALL\_EXPLICITLY\_DISCONNECTED

> `readonly` **ALL\_EXPLICITLY\_DISCONNECTED**: `"allExplicitlyDisconnected"` = `'allExplicitlyDisconnected'`

#### Default

```ts
RESET_PLAYER_ON_DISCONNECT_POLICIES.ALL_DISCONNECTED
```

#### Defined in

[src/lib/app/YouTubeApp.ts:46](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/YouTubeApp.ts#L46)

***

### screenApp?

> `optional` **screenApp**: `string`

#### Default

```ts
CONF_DEFAULTS.SCREEN_APP
```

#### Defined in

[src/lib/app/YouTubeApp.ts:26](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/YouTubeApp.ts#L26)

***

### screenName

> **screenName**: `string`

#### Defined in

[src/lib/app/YouTubeApp.ts:22](https://github.com/patrickkfkan/yt-cast-receiver/blob/bd89142d74e28aee740c2fbc2ea3a853e286e8db/src/lib/app/YouTubeApp.ts#L22)
