import { CountryCode } from "./Country";

export class Address {
  constructor(
    public addressLine1: string = "",
    public addressLine2: string = "",
    public city: string = "",
    public postalCode: string = "",
    public country: CountryCode = "",
    public region: string = "",
  ) {
  }

  public clone() {
    return new Address(
      this.addressLine1,
      this.addressLine2,
      this.city,
      this.postalCode,
      this.country,
      this.region,
    );
  }
}
