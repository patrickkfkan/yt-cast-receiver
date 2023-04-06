import EventEmitter from 'events';
import blessed from 'blessed';
import HelpWindow from './HelpWindow.js';
import LogBox from './LogBox.js';
import LogLevelWindow from './LogLevelWindow.js';
import PlayerWindow from './PlayerWindow.js';
import StatusBar from './StatusBar.js';

export default class FakePlayerDemoScreen extends EventEmitter{

  #screen: blessed.Widgets.Screen;
  logBox;
  playerWindow;
  statusBar;
  helpWindow;
  logLevelWindow;

  constructor() {
    super();
    this.#screen = blessed.screen({
      width: '100%',
      height: '100%',
      fullUnicode: true
    });

    this.logBox = new LogBox();
    this.playerWindow = new PlayerWindow();
    this.statusBar = new StatusBar();
    this.helpWindow = new HelpWindow();
    this.logLevelWindow = new LogLevelWindow();

    this.#screen.append(this.logBox.getElement());
    this.#screen.append(this.playerWindow.getElement());
    this.#screen.append(this.statusBar.getElement());
    this.#screen.append(this.helpWindow.getElement());
    this.#screen.append(this.logLevelWindow.getElement());

    this.logBox.on('invalidate', this.render.bind(this));
    this.playerWindow.on('invalidate', this.render.bind(this));
    this.statusBar.on('invalidate', this.render.bind(this));
    this.helpWindow.on('invalidate', this.render.bind(this));
    this.logLevelWindow.on('invalidate', this.render.bind(this));

    this.#screen.on('keypress', (...args) => {
      this.emit('keypress', ...args);
    });
  }

  render() {
    this.#screen.render();
  }

  get element(): blessed.Widgets.Screen {
    return this.#screen;
  }
}
