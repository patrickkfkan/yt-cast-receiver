import { v4 as uuidv4 } from 'uuid';
import queryString from 'query-string';
import { type LoungeToken, type MDXContext } from './Session.js';
import type Message from './Message.js';
import { IncompleteAPIDataError } from '../utils/Errors.js';

/** @internal */
export interface DeviceInfo {
  brand: string;
  model: string;
  year: number;
  os: string;
  osVersion: string;
  chipset: string;
  clientName: string;
  dialAdditionalDataSupportLevel: string;
  mdxDialServerType: string;
}

/** @internal */
export interface BindParamsInitOptions {
  theme: string;
  deviceId: string;
  screenName: string;
  screenApp: string;
  brand: string;
  model: string;
}

/** @internal */
const DEFAULT_DEVICE_INFO: Omit<DeviceInfo, 'brand' | 'model'> = {
  year: 0,
  os: 'Windows',
  osVersion: '10.0',
  chipset: '',
  clientName: 'TVHTML5',
  dialAdditionalDataSupportLevel: 'unsupported',
  mdxDialServerType: 'MDX_DIAL_SERVER_TYPE_UNKNOWN'
};

/**
 * @internal
 *
 * A `BindParams` object holds data required for constructing the query string
 * component of URLs for:
 * 1. Establishing sessions;
 * 2. Sending messages; and
 * 3. Listening for incoming messages.
 *
 * @see {@link Session}
 * @see {@link RPCConnection}
 */
export default class BindParams {

  device: string; // 'LOUNGE_SCREEN'

  /** Device Id */
  id: string; // Device Id

  obfuscatedGaiaId: string;

  /** Screen name */
  name: string; // Screen name

  /** Screen app */
  app: string;

  theme: string;
  capabilities: string;
  cst: string;
  mdxVersion: number;
  loungeIdToken?: string;
  VER: number;
  v: number;
  deviceInfo: DeviceInfo;
  SID?: string;
  RID: number;
  CVER: number;
  AID: number;
  gsessionid?: string;
  zx: string;
  t: number;

  constructor(options: BindParamsInitOptions) {
    this.device = 'LOUNGE_SCREEN';
    this.id = options.deviceId;
    this.obfuscatedGaiaId = '';
    this.name = options.screenName;
    this.app = options.screenApp;
    this.theme = options.theme;
    this.capabilities = 'dsp,mic,dpa,ntb';
    this.cst = 'm';
    this.mdxVersion = 2;
    this.VER = 8;
    this.v = 2;
    this.deviceInfo = {
      ...DEFAULT_DEVICE_INFO,
      brand: options.brand,
      model: options.model
    };
    this.CVER = 1;
    this.zx = this.#generateZX();
    this.t = 1;

    this.RID = this.#generateRID();
    this.AID = 3;
  }

  reset() {
    delete this.SID;
    delete this.loungeIdToken;
    delete this.gsessionid;
    this.RID = this.#generateRID();
    this.AID = 3;
  }

  updateWithMdxContext(context: MDXContext) {
    if (context.deviceId) {
      this.id = context.deviceId;
    }
  }

  updateWithLoungeToken(token: LoungeToken) {
    this.loungeIdToken = token.loungeToken;
  }

  updateWithMessage(cmd: Message | Message[]) {
    if (Array.isArray(cmd)) {
      for (const c of cmd) {
        this.updateWithMessage(c);
      }
      return ;
    }

    switch (cmd.name) {
      case 'c':
        // E.g.: [0, ["c", "SID here", "", 8]]
        this.SID = cmd.payload[0];
        break;

      case 'S':
        // E.g.: [1, ["S", "gsessionid here"]]
        this.gsessionid = cmd.payload;
        break;

      default:
    }

    if (cmd.AID) {
      this.AID = Math.max(this.AID, cmd.AID);
    }
  }

  /**
   * Constructs query string for specified action type.
   * @param type - The type of action to be performed.
   * @param AID - Action identifier associated with the action.
   * @returns Query string
   * @throws {@link IncompleteAPIDataError} if data needed to construct the query string is missing.
   */
  toQueryString(type: 'initSession' | 'sendMessage' | 'rpc', AID?: number | null): string {
    const missing = [];
    if (!this.loungeIdToken) {
      missing.push('loungeIdToken');
    }
    if (type === 'sendMessage' || type === 'rpc') {
      if (!this.SID) {
        missing.push('SID');
      }
      if (!this.gsessionid) {
        missing.push('gsessionid');
      }
    }
    if (missing.length > 0) {
      throw new IncompleteAPIDataError('Missing data required to construct query string from bind params', missing);
    }

    const commonParams = {
      device: this.device,
      id: this.id,
      obfuscatedGaiaId: this.obfuscatedGaiaId,
      name: this.name,
      app: this.app,
      theme: this.theme,
      capabilities: this.capabilities,
      cst: this.cst,
      mdxVersion: this.mdxVersion,
      loungeIdToken: this.loungeIdToken,
      VER: this.VER,
      v: this.v,
      zx: this.#generateZX(),
      t: this.t
    };

    let params;
    switch (type) {
      case 'initSession':
        params = {
          ...commonParams,
          deviceInfo: JSON.stringify(this.deviceInfo),
          RID: this.RID,
          CVER: this.CVER
        };
        this.RID++;
        break;

      case 'sendMessage':
        this.AID = AID && this.AID ?
          Math.max(AID, this.AID) : AID || this.AID;
        params = {
          ...commonParams,
          deviceInfo: JSON.stringify(this.deviceInfo),
          SID: this.SID,
          RID: this.RID,
          AID: this.AID,
          gsessionid: this.gsessionid
        };
        if (!AID) {
          this.AID++;
        }
        this.RID++;
        break;

      case 'rpc':
        params = {
          ...commonParams,
          RID: 'rpc',
          SID: this.SID,
          CI: 0,
          AID: this.AID,
          gsessionid: this.gsessionid,
          TYPE: 'xmlhttp'
        };
        break;

      default:
    }

    return params ? queryString.stringify(params) : '';
  }

  #generateZX() {
    return uuidv4().replace(/-/g, '').substring(0, 12);
  }

  #generateRID() {
    const min = 41000;
    const max = 49999;
    return Math.round(Math.random() * (max - min) + min);
  }
}
