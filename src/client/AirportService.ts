import { AirportData, getAirportsUrl } from "ra-api";

import { ServiceBase } from "ra-core";

import { Airport } from "./Airport";

export class AirportService extends ServiceBase {
  public async getAll() {
    const response = await this.http.get<AirportData[]>(getAirportsUrl);

    return response.data.map((i) => new Airport(
      i.code,
      i.name,
      i.routes,
    ));
  }
}
