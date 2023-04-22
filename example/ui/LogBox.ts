import blessed from 'blessed';
import UIComponent from './UIComponent.js';

export default class LogBox extends UIComponent {

  #element: blessed.Widgets.Log;

  constructor() {
    super();
    this.#element = blessed.log({
      width: '100%',
      height: '100%-1',
      top: 0,
      left: 0,
      mouse: true,
      scrollOnInput: false
    });
  }

  getElement(): blessed.Widgets.BlessedElement {
    return this.#element;
  }

  pushLine(lines: string | string[]) {
    this.#element.pushLine(lines);
    this.invalidate();
  }

  pageUp() {
    const height = this.#element.height as number;
    this.#element.scroll(-(height / 2 | 0) || -1);
    this.invalidate();
  }

  pageDown() {
    const height = this.#element.height as number;
    this.#element.scroll(height / 2 | 0 || 1);
    this.invalidate();
  }

  scroll(offset: number) {
    this.#element.scroll(offset);
    this.invalidate();
  }

  scrollToBeginning() {
    this.#element.scrollTo(0);
    this.invalidate();
  }

  scrollToEnd() {
    this.#element.scrollTo(this.#element.getScrollHeight());
    this.invalidate();
  }
}
