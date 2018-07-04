import { CountryCode } from "./Country";

export class Address {
  constructor(
    public addressLine1: string = "",
    public addressLine2: string = "",
    public city: string = "",
    public postalCode: string = "",
    public country: CountryCode = "",
  ) {
  }
}
