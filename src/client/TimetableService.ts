import * as Moment from "moment";

import { getDepartureDatesUrl } from "ra-api";
import { ServiceBase } from "ra-core";
import { Route } from "ra-shared";

export class TimetableService extends ServiceBase {
  public async getDepartureDates(route: Route) {
    const response = await this.http.get<string[]>(getDepartureDatesUrl(route.origin, route.destination));

    return response.data.map((d) => Moment(d));
  }
}
