import * as Moment from "moment";

import { Price } from "ra-shared";

export class Flight {
  private _duration: Moment.Duration;

  constructor(
    public readonly id: string,
    public readonly code: string,
    public readonly origin: string,
    public readonly destination: string,
    public readonly departureDate: Moment.Moment,
    public readonly arrivalDate: Moment.Moment,
    public readonly farePrice: Price,
  ) {
    this._duration = Moment.duration(arrivalDate.diff(departureDate));
  }

  public get duration() {
    return this._duration;
  }
}
