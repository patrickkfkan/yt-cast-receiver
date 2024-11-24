import {type ClientKey} from './app/Client';
import type Client from './app/Client';

const YOUTUBE_BASE_URL = 'https://www.youtube.com';

/**
 * @internal
 */
export const URLS = {
  YOUTUBE_BASE: YOUTUBE_BASE_URL,
  GENERATE_SCREEN_ID: `${YOUTUBE_BASE_URL}/api/lounge/pairing/generate_screen_id`,
  GET_LOUNGE_TOKEN_BATCH: `${YOUTUBE_BASE_URL}/api/lounge/pairing/get_lounge_token_batch`,
  REGISTER_PAIRING_CODE: `${YOUTUBE_BASE_URL}/api/lounge/pairing/register_pairing_code`,
  GET_PAIRING_CODE: `${YOUTUBE_BASE_URL}/api/lounge/pairing/get_pairing_code?ctx=pair`,
  BIND: `${YOUTUBE_BASE_URL}/api/lounge/bc/bind`
};

export const CONF_DEFAULTS = {
  SCREEN_APP: 'ytcr',
  BRAND: 'Generic',
  MODEL: 'SmartTV'
} as const;

export const AUTOPLAY_MODES = {
  ENABLED: 'ENABLED',
  DISABLED: 'DISABLED',
  UNSUPPORTED: 'UNSUPPORTED'
} as const;

export const PLAYER_STATUSES = {
  IDLE: -1,
  PLAYING: 1,
  PAUSED: 2,
  LOADING: 3,
  STOPPED: 4
} as const;

export const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
  NONE: 'none'
} as const;

export const STATUSES = {
  STOPPED: 'stopped',
  STOPPING: 'stopping',
  STARTING: 'starting',
  RUNNING: 'running'
} as const;

export const CLIENTS = {
  YT: {
    key: 'YT',
    theme: 'cl',
    name: 'YouTube'
  },
  YTMUSIC: {
    key: 'YTMUSIC',
    theme: 'm',
    name: 'YouTube Music'
  }
} as Record<ClientKey, Client>;

export const MUTE_POLICIES = {
  ZERO_VOLUME_LEVEL: 'zeroLevel',
  PRESERVE_VOLUME_LEVEL: 'preserveLevel',
  AUTO: 'auto'
} as const;

export const RESET_PLAYER_ON_DISCONNECT_POLICIES = {
  ALL_EXPLICITLY_DISCONNECTED: 'allExplicitlyDisconnected',
  ALL_DISCONNECTED: 'allDisconnected'
} as const;

/**
 * @hidden
 */
export default {
  URLS,
  CONF_DEFAULTS,
  AUTOPLAY_MODES,
  PLAYER_STATUSES,
  LOG_LEVELS,
  STATUSES,
  CLIENTS,
  MUTE_POLICIES,
  RESET_PLAYER_ON_DISCONNECT_POLICIES
};
