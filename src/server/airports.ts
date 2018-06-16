import * as Express from "express";

import { AirportData, getAirportsUrl } from "ra-api";

import { Airport } from "./Airport";

export const registerAirportsApi = (app: Express.Express) => {
  app.get("/api/airports/init", async (req, res) => {
    const airports = [
      new Airport("WRO", "Wroclaw", ["ATL", "STN"]),
      new Airport("ATL", "Atlanta", ["WRO", "STN"]),
      new Airport("STN", "London Stansted", ["WRO", "ATL"]),
    ];

    airports.forEach(async (a) => {
      await req.documentSession.store(a);

      await req.documentSession.saveChanges();
    });

    res.sendStatus(200);
  });

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
