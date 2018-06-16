import { AirportCode } from "./Airport";

export class Route {
  constructor(
    public readonly origin: AirportCode = "",
    public readonly destination: AirportCode = "",
  ) {
  }
}
