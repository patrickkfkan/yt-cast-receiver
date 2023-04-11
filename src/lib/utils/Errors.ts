export default class YouTubeCastReceiverError extends Error {

  cause?: any;
  info?: Record<string, any>;

  constructor(message: string, cause?: any, info?: Record<string, any>) {
    super(message);
    this.name = 'YouTubeCastReceiverError';
    if (cause) {
      this.cause = cause;
    }
    if (info) {
      this.info = info;
    }
  }

  getCauses(): Array<any> {
    const causes = [];
    let c = this.cause;
    while (c) {
      causes.push(c);
      c = c instanceof YouTubeCastReceiverError ? c.cause : null;
    }
    return causes;
  }
}

export class ConnectionError extends YouTubeCastReceiverError {
  constructor(message: string, url: string, cause?: any) {
    super(message, cause, { url });
    this.name = 'ConnectionError';
  }
}

export class AbortError extends YouTubeCastReceiverError {
  constructor(message: string, url: string) {
    super(message, undefined, { url });
    this.name = 'AbortError';
  }
}

export class BadResponseError extends YouTubeCastReceiverError {
  constructor(message: string, url: string, response: {status: number, statusText: string}) {
    super(message, undefined, {url, response});
    this.name = 'BadResponseError';
  }
}

export class DataError extends YouTubeCastReceiverError {
  constructor(message: string, cause?: any, data?: any) {
    super(message, cause, { data });
    this.name = 'DataError';
  }
}

export class IncompleteAPIDataError extends YouTubeCastReceiverError {
  constructor(message: string, missing?: string[]) {
    super(message, undefined, { missing });
    this.name = 'IncompleteAPIDataError';
  }
}

export class SessionError extends YouTubeCastReceiverError {
  constructor(message: string, cause?: any) {
    super(message, cause);
    this.name = 'SessionError';
  }
}

export class AppError extends YouTubeCastReceiverError {
  constructor(message: string, cause?: any) {
    super(message, cause);
    this.name = 'AppError';
  }
}

export class DialServerError extends YouTubeCastReceiverError {
  constructor(message: string, cause?: any) {
    super(message, cause);
    this.name = 'DialServerError';
  }
}

export class SenderConnectionError extends YouTubeCastReceiverError {
  constructor(message: string, cause?: any, action?: 'connect' | 'disconnect') {
    super(message, cause, { action: action || 'connect' });
    this.name = 'SenderConnectionError';
  }
}
