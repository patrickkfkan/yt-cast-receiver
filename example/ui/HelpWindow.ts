import blessed from 'blessed';
import UIComponent from './UIComponent.js';

export default class HelpWindow extends UIComponent {

  #element: blessed.Widgets.BoxElement;

  constructor() {
    super();
    this.#element = blessed.box({
      width: 64,
      height: 21,
      top: '50%-11',
      left: '50%-32',
      tags: true,
      border: 'line'
    });

    const content =
      `
      {underline}{cyan-fg}General{/}
      <tab>           Show / hide player window
      h               Show / hide help (this window)
      r               Start / stop YouTubeCastReceiver
      q               Exit demo

      {underline}{cyan-fg}Playback{/}
      <space>         Pause / resume playback
      < / >           Previous / next video (if available)
      ← / →           Seek backwards / forward
      + / - / m       Volume up / down / toggle mute

      {underline}{cyan-fg}Log{/}
      l               Choose log level
      ↑ / ↓           Scroll (single line)
      PgUp / PgDn     Scroll (page)
      Ctrl+Home/End   Scroll to beginning / end
      `;

    this.#element.setContent(content);
    this.#element.hide();
  }

  getElement(): blessed.Widgets.BlessedElement {
    return this.#element;
  }
}
