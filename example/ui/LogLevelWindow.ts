import blessed from 'blessed';
import { EOL } from 'os';
import { type LogLevel, LOG_LEVELS } from '../../dist/index.js';

import UIComponent from './UIComponent.js';

const LOG_LEVEL_ENTRIES = {
  [LOG_LEVELS.ERROR]: 'e      Error',
  [LOG_LEVELS.WARN]: 'w      Warn',
  [LOG_LEVELS.INFO]: 'i      Info',
  [LOG_LEVELS.DEBUG]: 'd      Debug',
  [LOG_LEVELS.NONE]: 'n      None'
};

export default class LogLevelWindow extends UIComponent {

  #element: blessed.Widgets.BoxElement;
  #selected: LogLevel;

  constructor() {
    super();
    this.#selected = LOG_LEVELS.DEBUG;

    this.#element = blessed.box({
      width: 24,
      height: 11,
      top: '50%-6',
      left: '50%-12',
      tags: true,
      border: 'line'
    });

    this.updateContent();

    this.#element.hide();
  }

  getElement(): blessed.Widgets.BlessedElement {
    return this.#element;
  }

  setSelected(logLevel: LogLevel) {
    this.#selected = logLevel;
    this.updateContent();
    this.invalidate();
  }

  updateContent() {
    const lines = [ `${EOL}  {underline}{cyan-fg}Log Level{/}${EOL}` ];

    for (const [ level, text ] of Object.entries(LOG_LEVEL_ENTRIES)) {
      let entry;
      if (level === this.#selected) {
        entry = `  {blue-fg}*${text}{/}`;
      }
      else {
        entry = `   ${text}`;
      }
      lines.push(entry);
    }

    this.#element.setContent(lines.join(EOL));
  }
}
