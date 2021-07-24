import { Obsimian, ObsimianData } from "./Obsimian";
import { ObsimianApp } from "./ObsimianApp";

/** Simulates an Obsidian {@code Plugin}. */
export class ObsimianPlugin extends Obsimian {
  _app: ObsimianApp;

  constructor(data: ObsimianData) {
    super(data);

    this._app = new ObsimianApp(data);
  }

  get app(): ObsimianApp {
    return this._app;
  }
}
