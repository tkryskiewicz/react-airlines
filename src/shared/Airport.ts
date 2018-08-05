import { AirportCode } from "./AirportCode";

export class Airport {
  constructor(
    public code: AirportCode,
    public name: string,
    public routes: AirportCode[],
  ) {
  }

  public hasRouteTo(airport: AirportCode) {
    return this.routes.indexOf(airport) !== -1;
  }
}
