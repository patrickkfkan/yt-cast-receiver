/**
 * @internal
 *
 * {@link AsyncTaskQueue} task.
 */
export interface Task {
  run: () => Promise<any>;
  cancel: () => void;
  onError?: (task: Task, error: any) => any;
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
      void this.start();
    }
  }

  push(task: Task) {
    this.#tasks.push(task);
    if (this.#stopped && this.#autostart) {
      void this.start();
    }
  }

  unshift(task: Task) {
    this.#tasks.unshift(task);
  }

  async start() {
    this.#stopped = false;
    let failedTask: any = null;
    while (this.#tasks.length > 0 && !this.#stopped) {
      const task = this.#tasks.shift();
      try {
        if (task) await task.run();
      }
      catch (error) {
        failedTask = { task, error };
        break;
      }
    }
    this.#stopped = true;
    if (failedTask && failedTask.task.onError) {
      failedTask.task.onError(failedTask.task, failedTask.error);
    }
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
