import * as Express from "express";

import { AirportData, getAirportsUrl } from "ra-api";
import { Airport } from "ra-document-store";

export const registerAirportsApi = (app: Express.Express) => {
  app.get(getAirportsUrl, async (req, res) => {
    const airportDocuments = await req.documentSession.query<Airport>(Airport).all();

    const airports: AirportData[] = airportDocuments.map((d) => ({
      code: d.code,
      name: d.name,
      routes: d.routes,
    }));

    res.send(airports);
  });
};
