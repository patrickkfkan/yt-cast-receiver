import { CLIENTS } from '../Constants.js';
import { DataError } from '../utils/Errors.js';
import Client from './Client.js';

/**
 * A `Sender` object holds information about a sender.
 */
export default class Sender {
  id: string;
  name: string;
  app: string | null;
  client: Client | null;
  capabilities: string[];
  device: Record<string, any>;

  /** @internal */
  constructor(data: any) {
    this.id = data.id;
    this.name = data.name || data.clientName;
    this.capabilities = data.capabilities?.split(',') || [];
    this.app = data.app || null;
    this.client = Object.values(CLIENTS).find((client) => client.theme === data.theme) || null;
    try {
      this.device = data.device ? JSON.parse(data.device) : {};
    }
    catch (error) {
      this.device = {};
    }
  }

  /**
   * @internal
   *
   * Parses `data` and returns a `Sender` object.
   * @param data - Payload of incoming `remoteConnected` or `remoteDisconnected` message.
   * @throws {@link DataError} if `data` is invalid.
   */
  static parse(data: any): Sender {
    const themes = Object.values(CLIENTS).map((client) => client.theme);
    if (!data?.id || (!data?.name && !data?.clientName) || !themes.includes(data?.theme)) {
      throw new DataError('Invalid data', undefined, data);
    }

    return new Sender(data);
  }

  supportsAutoplay(): boolean {
    return this.capabilities.includes('atp');
  }

  supportsVolumeMute(): boolean {
    // Sender app is 'youtube.m-desktop' or 'youtube-desktop'
    return this.app?.endsWith('-desktop') || false;
  }
}
