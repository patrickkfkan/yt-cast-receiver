/**
 * @internal
 *
 * {@link AsyncTaskQueue} task.
 */
export interface Task {
  run(): Promise<any>;
  cancel(): void;
}

/**
 * @internal
 *
 * A queue that takes {@link Task} objects and executes them in the same
 * order as they are added.
 */
export default class AsyncTaskQueue {

  #tasks: Task[];
  #stopped: boolean;
  #autostart: boolean;

  constructor() {
    this.#stopped = true;
    this.#tasks = [];
    this.#autostart = true;
  }

  setAutoStart(value: boolean) {
    this.#autostart = value;
    if (value && this.#tasks.length > 0) {
      this.start();
    }
  }

  push(task: Task) {
    this.#tasks.push(task);
    if (this.#stopped && this.#autostart) {
      this.start();
    }
  }

  async start() {
    this.#stopped = false;
    while (this.#tasks.length > 0 && !this.#stopped) {
      const task = this.#tasks.shift();
      try {
        task && await task.run();
      }
      catch (error) {
        // Ignore error and continue
      }
    }
    this.#stopped = true;
  }

  clear() {
    if (!this.#stopped) {
      this.#stopped = true;
    }
    this.#tasks.forEach((task) => task.cancel());
    this.#tasks = [];
  }

  stop() {
    this.#stopped = true;
  }

  forEach(callbackfn: (value: Task, index: number, array: Task[]) => void, thisArg?: any): void {
    return this.#tasks.forEach(callbackfn, thisArg);
  }
}
