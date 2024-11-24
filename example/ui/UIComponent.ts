import type blessed from 'blessed';
import EventEmitter from 'events';

export default abstract class UIComponent extends EventEmitter {

  abstract getElement(): blessed.Widgets.BlessedElement;

  invalidate() {
    this.emit('invalidate');
  }

  show() {
    if (!this.visible) {
      this.getElement().show();
      this.invalidate();
    }
  }

  hide() {
    if (this.visible) {
      this.getElement().hide();
      this.invalidate();
    }
  }

  toggleVisibility() {
    if (this.visible) {
      this.hide();
    }
    else {
      this.show();
    }
  }

  get visible(): boolean {
    return this.getElement().visible;
  }

}
