import type Logger from './Logger.js';

export default abstract class DataStore {

  #logger: Logger;

  setLogger(logger: Logger) {
    this.#logger = logger;
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  abstract set<T>(key: string, value: T): Promise<void>;
  abstract get<T>(key: string): Promise<T | null>;

  get logger(): Logger {
    return this.#logger;
  }
}
