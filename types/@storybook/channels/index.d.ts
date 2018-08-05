type Listener = (...args: any[]) => void;

export default class Channel {
  constructor(args: { transport: any });

  public addListener(type: string, listener: Listener): void;
  public addPeerListener(type: string, listener: Listener): void;
  public emit(type: string, ...args: any[]): void;
  public eventNames(): string[];
  public listenerCount(type: string): number;
  public listeners(type: string): Listener[];
  public on(type: string, listener: Listener): void;
  public once(type: string, listener: Listener): void;
  public prependListener(type: string, listener: Listener): void;
  public prependOnceListener(type: string, listener: Listener): void;
  public removeAllListeners(type: string): void;
  public removeListener(type: string, listener: Listener): void;
}
