import { AirportData, getAirportsUrl } from "ra-api";

import { Airport } from "./Airport";
import { ServiceBase } from "./ServiceBase";

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
