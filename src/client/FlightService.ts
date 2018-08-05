import * as Moment from "moment";

import { Price } from "ra-shared";

import { Flight } from "./Flight";
import { Route } from "./Route";

export class FlightService {
  public async get(route: Route, date: Moment.Moment) {
    return [
      new Flight(
        "flight/1",
        "RA0001",
        route.origin,
        route.destination,
        date.clone().hour(15),
        date.clone().hour(16).minute(45),
        new Price(54, "PLN"),
      ),
      new Flight(
        "flight/2",
        "RA0002",
        route.origin,
        route.destination,
        date.clone().hour(21),
        date.clone().hour(21).minute(55),
        new Price(77, "PLN"),
      ),
    ];
  }
}
