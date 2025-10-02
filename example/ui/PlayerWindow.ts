import blessed from 'blessed';
import { PLAYER_STATUSES, type Volume } from '../../dist/index.js';
import { type FakeState } from '../FakePlayer.js';
import UIComponent from './UIComponent.js';

export default class PlayerWindow extends UIComponent {

  #element: blessed.Widgets.BoxElement;
  #positionLabel: blessed.Widgets.TextElement;
  #durationLabel: blessed.Widgets.TextElement;
  #seekbar: blessed.Widgets.ProgressBarElement;
  #seekbarWrapper: blessed.Widgets.BoxElement;
  #statusTitleLabel: blessed.Widgets.BoxElement;
  #volumeLabel: blessed.Widgets.BoxElement;

  #seekbarTimer: NodeJS.Timeout | null;

  constructor() {
    super();
    this.#element = blessed.box({
      width: '80%',
      height: 9,
      top: '50%-5',
      left: '10%',
      tags: true,
      border: 'line'
    });

    this.#statusTitleLabel = blessed.box({
      top: 1,
      left: 1,
      align: 'center',
      tags: true,
      content: '{gray-fg}(Idle){/}'
    });

    this.#seekbar = blessed.progressbar({
      orientation: 'horizontal',
      width: '80%',
      height: 3,
      top: 0,
      left: '10%',
      border: {
        type: 'line'
      },
      pch: '▒'
    });

    this.#positionLabel = blessed.box({
      width: '10%-1',
      top: 1,
      left: 0,
      align: 'right',
      content: '-'
    });

    this.#durationLabel = blessed.box({
      width: '10%',
      top: 1,
      right: 0,
      align: 'left',
      content: '-'
    });

    this.#seekbarWrapper = blessed.box({
      top: 2,
      valign: 'middle'
    });

    this.#volumeLabel = blessed.box({
      top: 5,
      left: 1,
      align: 'center',
      tags: true,
      content: '{green-fg}Volume:{/} -'
    });

    this.#seekbarTimer = null;

    this.#seekbarWrapper.append(this.#positionLabel);
    this.#seekbarWrapper.append(this.#seekbar);
    this.#seekbarWrapper.append(this.#durationLabel);

    this.#element.append(this.#statusTitleLabel);
    this.#element.append(this.#seekbarWrapper);
    this.#element.append(this.#volumeLabel);

    this.#element.hide();
  }

  getElement(): blessed.Widgets.BlessedElement {
    return this.#element;
  }

  update(data: FakeState) {
    this.#updateSeekbar(data);
    this.#updateStatusTitle(data);
    this.#updateVolume(data.volume);
  }

  #updateSeekbar(data: { position: number, duration: number }) {
    this.#positionLabel.setText(this.#secondsToString(data.position));
    this.#durationLabel.setText(this.#secondsToString(data.duration));
    this.#seekbar.setProgress(Math.floor((data.position / data.duration) * 100));
    this.invalidate();
  }

  #updateStatusTitle(data: { status: number, videoTitle: string }) {
    let statusTitle: string;
    switch (data.status) {
      case PLAYER_STATUSES.PLAYING:
        statusTitle = `{green-fg}(Playing){/} ${data.videoTitle}`;
        break;
      case PLAYER_STATUSES.LOADING:
        statusTitle = '{yellow-fg}Loading...{/}';
        break;
      case PLAYER_STATUSES.PAUSED:
        statusTitle = `{cyan-fg}(Paused){/} ${data.videoTitle}`;
        break;
      case PLAYER_STATUSES.STOPPED:
        statusTitle = `{blue-fg}(Stopped){/} ${data.videoTitle}`;
        break;
      default:
        statusTitle = '{gray-fg}(Idle){/}';
    }
    this.#statusTitleLabel.setContent(statusTitle);
    this.invalidate();
  }

  #updateVolume(volume: Volume) {
    this.#volumeLabel.setContent(`{green-fg}Volume:{/} ${volume.muted ? '0' : volume.level}${volume.muted ? ' (muted)' : ''}`);
    this.invalidate();
  }

  startSeekbarTimer(fetch: { position: () => Promise<number>, duration: () => Promise<number> }) {
    this.stopSeekbarTimer();
    this.#seekbarTimer = setInterval(() => {
      void (async () => {
        const position = await fetch.position();
        const duration = await fetch.duration();
        this.#updateSeekbar({ position, duration });
      })();
    }, 1000);
  }

  stopSeekbarTimer() {
    if (this.#seekbarTimer) {
      clearInterval(this.#seekbarTimer);
    }
    this.#seekbarTimer = null;
  }

  #secondsToString(s: number) {
    const hh = Math.floor(s / 3600);
    const mm = Math.floor((s % 3600) / 60);
    const ss = (s % 3600) % 60;

    const parts = [
      mm >= 10 || hh === 0 ? `${mm}` : `0${mm}`,
      ss >= 10 ? `${ss}` : `0${ss}`
    ];
    if (hh > 0) {
      parts.unshift(`${hh}`);
    }

    return parts.join(':');
  }
}
