import { AirportCode } from "ra-shared";

export class Route {
  constructor(
    public readonly origin: AirportCode = "",
    public readonly destination: AirportCode = "",
  ) {
  }
}
