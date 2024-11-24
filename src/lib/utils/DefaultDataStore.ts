import storage from 'node-persist';
import DataStore from './DataStore.js';

/**
 * Default `DataStore` implementation that uses [node-persist](https://github.com/simonlast/node-persist) to persist data.
 */
export default class DefaultDataStore extends DataStore {

  #storage: storage.LocalStorage;

  constructor() {
    super();
    this.#storage = storage.create();
    this.#storage.init().catch((error: unknown) => this.logger.error('[yt-cast-receiver] DefaultDataStore: caught error in storage.init():', error));
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  async set<T>(key: string, value: T): Promise<void> {
    try {
      await this.#storage.set(key, value);
    }
    catch (error) {
      this.logger.error(`[yt-cast-receiver] Failed to set value for key '${key}' in data store:`, error, 'Value:', value);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      return await this.#storage.get(key) as T || null;
    }
    catch (error) {
      this.logger.error(`[yt-cast-receiver] Failed to get value for key '${key}' in data store:`, error);
      return null;
    }
  }

  async clear(): Promise<void> {
    return this.#storage.clear();
  }
}
