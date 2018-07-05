import * as Express from "express";

import { CountryData, getCountriesUrl } from "ra-api";
import { Country } from "ra-document-store";

export const registerCountriesApi = (app: Express.Express) => {
  app.get(getCountriesUrl, async (req, res) => {
    const documents = await req.documentSession.query<Country>(Country).all();

    const countries: CountryData[] = documents.map((d) => ({
      code: d.code,
      name: d.name,
    }));

    res.send(countries);
  });
};
