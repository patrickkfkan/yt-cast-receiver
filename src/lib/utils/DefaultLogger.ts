import util from 'util';
import { LOG_LEVELS } from '../Constants.js';
import YouTubeCastReceiverError from './Errors.js';
import Logger, { LogLevel } from './Logger.js';

const LOG_LEVEL_ORDER = [
  LOG_LEVELS.NONE,
  LOG_LEVELS.ERROR,
  LOG_LEVELS.WARN,
  LOG_LEVELS.INFO,
  LOG_LEVELS.DEBUG
];

export default class DefaultLogger implements Logger {

  level: LogLevel;
  color: boolean;

  constructor(color = true) {
    this.level = LOG_LEVELS.INFO;
    this.color = color;
  }

  error(...msg: any[]): void {
    this.process(LOG_LEVELS.ERROR, msg);
  }

  warn(...msg: any[]): void {
    this.process(LOG_LEVELS.WARN, msg);
  }

  info(...msg: any[]): void {
    this.process(LOG_LEVELS.INFO, msg);
  }

  debug(...msg: any[]): void {
    this.process(LOG_LEVELS.DEBUG, msg);
  }

  setLevel(value: LogLevel): void {
    this.level = value;
  }

  checkLevel(targetLevel: LogLevel) {
    return LOG_LEVEL_ORDER.indexOf(targetLevel) <= LOG_LEVEL_ORDER.indexOf(this.level);
  }

  process(targetLevel: LogLevel, msg: any[]) {
    if (this.checkLevel(targetLevel)) {
      this.toOutput(this.toStrings(msg));
    }
  }

  toStrings(msg: any[]): string[] {
    return msg.reduce((result, m) => {
      if (m instanceof YouTubeCastReceiverError) {
        [ m, ...m.getCauses() ].forEach((e, i) => {
          const p = (i > 0 ? `${'---'.repeat(i)}>` : '');
          result.push(`${p}(${e.name}) ${e.message}`);
          if (e.info) {
            const p2 = (i > 0 ? `${'   '.repeat(i)} ` : '');
            result.push(`${p2}Error info: ${util.inspect(e.info, false, null, this.color)}`);
          }
        });
        if (m.stack) {
          result.push('Stack trace:');
          result.push(m.stack);
        }
      }
      else if (m instanceof Error) {
        result.push(`(${m.name}) ${m.message}`);
        if (m.stack) {
          result.push(m.stack);
        }
      }
      else if (typeof m === 'object') {
        result.push(util.inspect(m, false, null, this.color));
      }
      else {
        result.push(m);
      }

      return result;
    }, []);
  }

  toOutput(msg: string[]) {
    console.log(...msg);
  }
}
