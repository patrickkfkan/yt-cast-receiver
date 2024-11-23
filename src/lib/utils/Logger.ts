import { type LOG_LEVELS } from '../Constants';
import { type ValueOf } from './Type';

/**
 * One of the values in {@link LOG_LEVELS}.
 */
export type LogLevel = ValueOf<typeof LOG_LEVELS>;

interface Logger {
  error(...msg: any[]): void;
  warn(...msg: any[]): void;
  info(...msg: any[]): void;
  debug(...msg: any[]): void;
  setLevel(value: LogLevel): void;
}

export default Logger;
