import { CountryData, getCountriesUrl } from "ra-api";

import { Country, PostalCodeType, RegionType } from "./Country";
import { ServiceBase } from "./ServiceBase";

export class CountryService extends ServiceBase {
  public async getAll() {
    const response = await this.http.get<CountryData[]>(getCountriesUrl);

    return response.data.map((i) => new Country(
      i.code,
      i.name,
      i.hasPostalCodes,
      i.postalCodeType as PostalCodeType,
      i.isPostalCodeRequired,
      i.regionType as RegionType,
      i.regions,
    ));
  }
}
