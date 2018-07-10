export type CountryCode = string;

export enum PostalCodeType {
  PostalCode = "postalCode",
  ZipCode = "zipCode",
}

export enum RegionType {
  State = "state",
  Province = "province",
}

export interface CountryRegion {
  code: string;
  name: string;
}

export class Country {
  constructor(
    public code: CountryCode,
    public name: string,
    public hasPostalCodes: boolean = false,
    public postalCodeType?: PostalCodeType,
    public isPostalCodeRequired: boolean = false,
    public regionType?: RegionType,
    public regions: CountryRegion[] = [],
  ) {
  }

  public get hasRegions() {
    return this.regions.length !== 0;
  }
}
