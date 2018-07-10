export const getCountriesUrl = "/api/countries";

export interface CountryRegionData {
  code: string;
  name: string;
}

export interface CountryData {
  code: string;
  name: string;
  hasPostalCodes?: boolean;
  isPostalCodeRequired?: boolean;
  regionType?: string;
  regions?: CountryRegionData[];
}
