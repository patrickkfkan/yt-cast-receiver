import { DefaultLogger, type LogLevel } from '../dist/mjs/index.js';
import type LogBox from './ui/LogBox.js';

/**
 * Custom implementation of {@link Logger} for use with {@link FakePlayerDemo}.
 */
export default class FakePlayerDemoLogger extends DefaultLogger {

  #box: LogBox;

  /**
   *
   * @param logBox - The UI component for outputting log messages.
   */
  constructor(logBox: LogBox) {
    super();
    this.#box = logBox;
  }

  // Overrides
  toOutput(targetLevel: LogLevel, msg: string[]): void {
    // Instead of outputting to console, we output to `LogBox` UI component.
    this.#box.pushLine(msg);
  }
}
