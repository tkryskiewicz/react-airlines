import * as Express from "express";
import * as Moment from "moment";

import { getDepartureDatesUrlFormat } from "ra-api";
import { Flight } from "ra-document-store";

export const registerTimetableApi = (app: Express.Express) => {
  app.get(getDepartureDatesUrlFormat, async (req, res) => {
    if (!req.params.origin || !req.params.destination) {
      res.sendStatus(400);
    }

    const fromDate = Moment();
    const toDate = fromDate.clone().add(3, "M");

    const dates = await req.documentSession.query<Flight>(Flight)
      .whereEquals("origin", req.params.origin)
      .whereEquals("destination", req.params.destination)
      .whereBetween("departureDate", fromDate.toDate(), toDate.toDate())
      .selectFields<Date>("departureDate")
      .all();

    const uniqueDates = dates
      .map((d) => Moment(d).startOf("d"))
      .filter((d, i, a) => i === a.findIndex((dd) => dd.isSame(d)));

    res.send(uniqueDates.map((d) => d.toISOString()));
  });
};
