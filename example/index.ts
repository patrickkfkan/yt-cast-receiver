import YouTubeCastReceiver, { Player, Logger, PairingCodeRequestService, PLAYER_STATUSES, LOG_LEVELS, LogLevel, STATUSES } from '../dist/mjs/index.js';
import FakePlayer from './FakePlayer.js';
import FakePlayerDemoLogger from './FakePlayerDemoLogger.js';
import FakePlayerDemoScreen from './ui/FakePlayerDemoScreen.js';

/**
 * Demo application showing usage of the `yt-cast-receiver` library.
 */
class FakePlayerDemo {

  #player: Player;
  #screen: FakePlayerDemoScreen | null;
  #logger: Logger;
  #receiver: YouTubeCastReceiver;
  #autoShowPlayer: boolean;
  #pairingCodeRequestService: PairingCodeRequestService;

  constructor() {
    // Check if UI disabled
    const noUI = process.argv.includes('--no-ui');

    // Create our own player instance
    const player = this.#player = new FakePlayer();

    // Create UI (if not disabled)
    const screen = this.#screen = !noUI ? new FakePlayerDemoScreen() : null;

    // If UI enabled, create our own logger instance, telling it to output to the `LogBox` UI component.
    const screenLogger = screen ? new FakePlayerDemoLogger(screen.logBox) : null;

    // Create `YouTubeCastReceiver` instance, specifying our own player implementation.
    const receiver = this.#receiver = new YouTubeCastReceiver(player, {
      dial: { port: 8099 }, // DIAL server port
      logger: screenLogger || undefined, // Our own logger implementation (if UI enabled)
      logLevel: 'debug' // Ouput debug messages
    });

    // `DefaultLogger` if UI disabled; otherwise this will be our custom `screenLogger`
    this.#logger = receiver.logger;

    // Listen to `YouTubeCastReceiver` events.
    receiver.on('senderConnect', (sender) => {
      const log = `Connected to ${sender.name} (${sender.client?.name}). Total connected senders: ${receiver.getConnectedSenders().length}`;
      if (screen) {
        screen.statusBar.setContent(log);
      }
      else {
        this.#logger.info(log);
      }
    });
    receiver.on('senderDisconnect', (sender) => {
      const log = `Disconnected from ${sender.name} (${sender.client?.name}). Remaining connected senders: ${receiver.getConnectedSenders().length}`;
      if (screen) {
        screen.statusBar.setContent(log);
      }
      else {
        this.#logger.info(log);
      }
    });
    receiver.on('error', (error) => {
      this.#logger.error('[FakePlayerDemo] Error occurred:', error);
    });
    // The `terminate` event essentially means `YouTubeCastReceiver` has crashed with error.
    // Note that `error` in this case gets emitted once and only once in the `terminate` event.
    receiver.on('terminate', (error) => {
      this.#logger.error('!!!! YouTubeCastReceiver has crashed !!! Reason:', error);
    });

    // Only if UI not disabled
    if (screen) {
      // `fakeState` event emitted by `FakePlayer` on player state change. Update UI with `data`.
      player.on('fakeState', (data: { status: number, videoTitle: string, position: number, duration: number, volume: number }) => {
        screen.playerWindow.update(data);
        if (data.status === PLAYER_STATUSES.PLAYING) {
          // Tell the `PlayerWindow` UI component to start moving its seekbar at intervals,
          // Hence giving the impression that our FakePlayer is playing something.
          screen.playerWindow.startSeekbarTimer({
            position: () => player.getPosition(),
            duration: () => player.getDuration()
          });
          if (this.#autoShowPlayer && !screen.playerWindow.visible) {
            screen.playerWindow.show();
          }
        }
        else {
          screen.playerWindow.stopSeekbarTimer();
        }
      });

      // Listen to UI keypress events
      this.#registerKeyPressListener();
      // Show `PlayerWindow` automatically when playback starts
      this.#autoShowPlayer = true;
    }

    // Service for fetching pairing code for manual pairing (aka Link with TV code)
    this.#pairingCodeRequestService = receiver.getPairingCodeRequestService();
  }


  #registerKeyPressListener() {
    if (!this.#screen) {
      // Return if UI disabled (i.e. screen not available)
      return;
    }

    this.#screen.on('keypress', async (ch, key: {ch: string, name: string, shift: boolean, ctrl: boolean}) => {
      if (!this.#screen) {
        return;
      }
      if (this.#screen.logLevelWindow.visible) {
        let targetLogLevel: LogLevel | null = null;
        switch (key.name?.toLowerCase()) {
          case 'e':
            targetLogLevel = LOG_LEVELS.ERROR;
            break;
          case 'w':
            targetLogLevel = LOG_LEVELS.WARN;
            break;
          case 'i':
            targetLogLevel = LOG_LEVELS.INFO;
            break;
          case 'd':
            targetLogLevel = LOG_LEVELS.DEBUG;
            break;
          case 'n':
            targetLogLevel = LOG_LEVELS.NONE;
            break;
          case 'escape':
          case 'l':
            this.#screen.logLevelWindow.hide();
            break;
        }
        if (targetLogLevel) {
          this.#logger.info(`[FakePlayerDemo] Setting log level to: ${targetLogLevel}`);
          this.#logger.setLevel(targetLogLevel);
          this.#screen.logLevelWindow.setSelected(targetLogLevel);
          this.#screen.logLevelWindow.hide();
        }
        return;
      }

      if (key.name?.toLowerCase() === 'q') {
        this.exit();
      }
      else if (key.name?.toLowerCase() === 'r') {
        if (this.#receiver.status === STATUSES.RUNNING) {
          await this.stop();
        }
        else if (this.#receiver.status === STATUSES.STOPPED) {
          await this.start();
        }
      }
      else if (key.name === 'tab') {
        this.#autoShowPlayer = false;
        this.#screen.playerWindow.toggleVisibility();
      }
      else if (key.name?.toLowerCase() === 'h') {
        this.#screen.helpWindow.toggleVisibility();
      }
      else if (key.name?.toLowerCase() === 'l') {
        this.#screen.logLevelWindow.toggleVisibility();
      }
      else if (key.name === 'space') {
        if (this.#player.status === PLAYER_STATUSES.PLAYING) {
          await this.#player.pause();
        }
        else if (this.#player.status === PLAYER_STATUSES.PAUSED) {
          await this.#player.resume();
        }
      }
      else if (key.ch === '<') {
        if (this.#player.queue.hasPrevious) {
          await this.#player.previous();
        }
      }
      else if (key.ch === '>') {
        if (this.#player.queue.hasNext) {
          await this.#player.next();
        }
      }
      else if (key.name === 'left') {
        const position = await this.#player.getPosition();
        await this.#player.seek(Math.max(position - 10, 0));
      }
      else if (key.name === 'right') {
        const position = await this.#player.getPosition();
        const duration = await this.#player.getDuration();
        await this.#player.seek(Math.min(position + 10, duration));
      }
      else if (key.ch === '+') {
        const volume = await this.#player.getVolume();
        const newVolume = Math.min(volume + 5, 100);
        await this.#player.setVolume(newVolume);
      }
      else if (key.ch === '-') {
        const volume = await this.#player.getVolume();
        const newVolume = Math.max(volume - 5, 0);
        await this.#player.setVolume(newVolume);
      }
      else if (key.name === 'up') {
        this.#screen.logBox.scroll(-1);
      }
      else if (key.name === 'down') {
        this.#screen.logBox.scroll(1);
      }
      else if (key.name === 'pageup') {
        this.#screen.logBox.pageUp();
      }
      else if (key.name === 'pagedown') {
        this.#screen.logBox.pageDown();
      }
      else if (key.name === 'home' && key.ctrl) {
        this.#screen.logBox.scrollToBeginning();
      }
      else if (key.name === 'end' && key.ctrl) {
        this.#screen.logBox.scrollToEnd();
      }
      else if (key.name === 'escape') {
        if (this.#screen.helpWindow.visible) {
          this.#screen.helpWindow.hide();
        }
        else if (this.#screen.playerWindow.visible) {
          this.#screen.playerWindow.hide();
        }
      }
    });
  }

  async start() {
    try {
      // Start `YouTubeCastReceiver` instance
      await this.#receiver.start();
    }
    catch (error) {
      // Catch errors to prevent application from crashing right back into the console
      this.#logger.error('[FakePlayerDemo] Error occurred while starting receiver:', error);
      return;
    }
    this.#logger.info('[FakePlayerDemo] YouTubeCastReceiver started.');

    if (this.#screen) {
      // UI stuff - not important for purpose of this demo.
      this.#screen.render();
      // Trick to enable text selection + mouse wheel scrolling:
      // https://github.com/chjj/blessed/issues/263
      // - Seems we need to do this after `render()` to have effect
      this.#screen.element.program.disableMouse();

      // Receiver may already have connected senders when started. This happens
      // when it was stopped previously without disconnecting senders first (usually
      // due to a crash). When receiver restarts, senders that are still connected
      // are reinstated.
      const senders = this.#receiver.getConnectedSenders();
      if (senders.length > 0) {
        const log = `Connected to ${senders[senders.length - 1].name}. Total connected senders: ${senders.length}`;
        this.#screen.statusBar.setContent(log);
      }
    }

    // Start service to obtain manual pairing code and listen to events.
    this.#pairingCodeRequestService.on('request', () => {
      // `request` event: request is being made
      this.#logger.debug('[FakePlayerDemo] Obtaining code for manual pairing...');
    });
    this.#pairingCodeRequestService.on('response', (code) => {
      // `response` event: pairing code obtained
      this.#logger.info(`[FakePlayerDemo] Code for manual pairing (aka Link with TV code): ${code}`);
    });
    this.#pairingCodeRequestService.on('error', (error) => {
      // Service automatically stops on `error` event
      this.#logger.error('[FakePlayerDemo] Error occurred while obtaining code for manual pairing:', error);
    });
    this.#pairingCodeRequestService.start();
  }

  async stop() {
    try {
      // Stop `YouTubeCastReceiver` instance
      await this.#receiver.stop();
    }
    catch (error) {
      // Again, like `start()`, we catch errors to prevent application from crashing back into console.
      this.#logger.error('[FakePlayerDemo] Error occurred while stopping receiver:', error);
      return;
    }

    this.#pairingCodeRequestService.removeAllListeners();
    this.#pairingCodeRequestService.stop();
    this.#logger.info('[FakePlayerDemo] YouTubeCastReceiver stopped.');
  }

  async exit() {
    try {
      await this.stop();
    }
    catch (error) {
      this.#logger.warn('[FakePlayerDemo] Error occurred while stopping receiver. Exiting uncleanly...');
    }
    this.#logger.info('[FakePlayerDemo] Bye!');
    process.exit(0);
  }
}

const demo = new FakePlayerDemo();
demo.start();
