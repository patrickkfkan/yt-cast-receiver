import blessed from 'blessed';
import UIComponent from './UIComponent.js';

export default class StatusBar extends UIComponent {

  #element: blessed.Widgets.BoxElement;

  constructor() {
    super();
    this.#element = blessed.box({
      width: '100%',
      height: 1,
      bottom: 0,
      left: 0,
      tags: true,
      bg: 'lightgray',
      fg: 'black',
      content: 'Not connected'
    });

    const helpLabel = blessed.text({
      right: 0,
      bg: 'lightgray',
      fg: 'black',
      content: '(H)elp'
    });

    this.#element.append(helpLabel);
  }

  getElement(): blessed.Widgets.BlessedElement {
    return this.#element;
  }

  setContent(value: string) {
    this.#element.setContent(value);
    this.invalidate();
  }
}
