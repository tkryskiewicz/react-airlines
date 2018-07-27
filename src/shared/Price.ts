export type CurrencyCode = string;

export class Price {
  constructor(
    public readonly amount: number,
    public readonly currency: CurrencyCode,
  ) {
  }
}
