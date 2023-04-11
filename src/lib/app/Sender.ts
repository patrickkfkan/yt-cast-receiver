import { DataError } from '../utils/Errors.js';

/**
 * A `Sender` object holds information about a sender.
 */
export default class Sender {
  id: string;
  name: string;
  app: string | null;
  capabilities: string[];
  device: Record<string, any>;

  /** @internal */
  constructor(data: Record<string, any>) {
    this.id = data.id;
    this.name = data.name || data.clientName;
    this.capabilities = data.capabilities?.split(',') || [];
    this.app = data.app || null;
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
    if (!data?.id || (!data?.name && !data?.clientName)) {
      throw new DataError('Invalid data', undefined, data);
    }

    return new Sender(data);
  }

  supportsAutoplay(): boolean {
    return this.capabilities.includes('atp');
  }
}
