export class PaymentCardType {
  constructor(
    public readonly code: string,
    public readonly name: string,
    public readonly cardNumberLength: number,
    public readonly cardNumberPattern: string,
    public readonly securityCodeType: string,
    public readonly securityCodeLength: number,
  ) {
  }
}
