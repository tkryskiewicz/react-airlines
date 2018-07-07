export type CountryCode = string;

export interface CountryRegion {
  code: string;
  name: string;
}

export class Country {
  constructor(
    public code: CountryCode,
    public name: string,
    public regions: CountryRegion[] = [],
  ) {
  }

  public get hasRegions() {
    return this.regions.length !== 0;
  }
}
