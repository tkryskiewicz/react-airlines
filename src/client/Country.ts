export type CountryCode = string;

export class Country {
  constructor(
    public code: CountryCode,
    public name: string,
  ) {
  }
}
