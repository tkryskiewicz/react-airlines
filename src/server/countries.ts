import * as Express from "express";

import { CountryData, getCountriesUrl } from "ra-api";
import { Country } from "ra-document-store";

export const registerCountriesApi = (app: Express.Express) => {
  app.get(getCountriesUrl, async (req, res) => {
    const documents = await req.documentSession.query<Country>(Country).all();

    const countries: CountryData[] = documents.map((d): CountryData => ({
      code: d.code,
      hasPostalCodes: d.hasPostalCodes,
      isPostalCodeRequired: d.isPostalCodeRequired,
      name: d.name,
      regionType: d.regionType,
      regions: d.regions,
    }));

    res.send(countries);
  });
};
