[yt-cast-receiver](../README.md) / AppOptions

# Interface: AppOptions

## Table of contents

### Properties

- [brand](AppOptions.md#brand)
- [dataStore](AppOptions.md#datastore)
- [enableAutoplayOnConnect](AppOptions.md#enableautoplayonconnect)
- [logger](AppOptions.md#logger)
- [model](AppOptions.md#model)
- [mutePolicy](AppOptions.md#mutepolicy)
- [playlistRequestHandler](AppOptions.md#playlistrequesthandler)
- [screenApp](AppOptions.md#screenapp)
- [screenName](AppOptions.md#screenname)

## Properties

### brand

• `Optional` **brand**: `string`

**`Default`**

CONF_DEFAULTS.BRAND

#### Defined in

[src/lib/app/YouTubeApp.ts:29](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/app/YouTubeApp.ts#L29)

___

### dataStore

• **dataStore**: ``null`` \| [`DataStore`](../classes/DataStore.md)

#### Defined in

[src/lib/app/YouTubeApp.ts:47](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/app/YouTubeApp.ts#L47)

___

### enableAutoplayOnConnect

• `Optional` **enableAutoplayOnConnect**: `boolean`

**`Default`**

true

#### Defined in

[src/lib/app/YouTubeApp.ts:37](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/app/YouTubeApp.ts#L37)

___

### logger

• **logger**: [`Logger`](Logger.md)

#### Defined in

[src/lib/app/YouTubeApp.ts:49](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/app/YouTubeApp.ts#L49)

___

### model

• `Optional` **model**: `string`

**`Default`**

CONF_DEFAULTS.MODEL

#### Defined in

[src/lib/app/YouTubeApp.ts:33](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/app/YouTubeApp.ts#L33)

___

### mutePolicy

• `Optional` **mutePolicy**: `ValueOf`<{ `AUTO`: ``"auto"`` = 'auto'; `PRESERVE_VOLUME_LEVEL`: ``"preserveLevel"`` = 'preserveLevel'; `ZERO_VOLUME_LEVEL`: ``"zeroLevel"`` = 'zeroLevel' }\>

**`Default`**

MUTE_POLICIES.AUTO

#### Defined in

[src/lib/app/YouTubeApp.ts:41](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/app/YouTubeApp.ts#L41)

___

### playlistRequestHandler

• `Optional` **playlistRequestHandler**: [`PlaylistRequestHandler`](../classes/PlaylistRequestHandler.md)

**`Default`**

`DefaultPlaylistRequestHandler` instance

#### Defined in

[src/lib/app/YouTubeApp.ts:45](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/app/YouTubeApp.ts#L45)

___

### screenApp

• `Optional` **screenApp**: `string`

**`Default`**

CONF_DEFAULTS.SCREEN_APP

#### Defined in

[src/lib/app/YouTubeApp.ts:25](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/app/YouTubeApp.ts#L25)

___

### screenName

• **screenName**: `string`

#### Defined in

[src/lib/app/YouTubeApp.ts:21](https://github.com/patrickkfkan/yt-cast-receiver/blob/91904fb/src/lib/app/YouTubeApp.ts#L21)
