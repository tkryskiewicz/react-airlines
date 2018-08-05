interface Region {
  code: string;
  name: string;
}

export class Country {
  constructor(
    public code: string,
    public name: string,
    public hasPostalCodes: boolean = false,
    public postalCodeType?: string,
    public isPostalCodeRequired: boolean = false,
    public regionType?: string,
    public regions: Region[] = [],
  ) {
  }
}
