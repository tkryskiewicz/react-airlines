export type CountryCode = string;

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
    public regionType?: RegionType,
    public regions: CountryRegion[] = [],
  ) {
  }

  public get hasRegions() {
    return this.regions.length !== 0;
  }
}
