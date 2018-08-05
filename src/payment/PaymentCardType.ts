export enum SecurityCodeType {
  CVV = "cvv",
  CID = "cid",
}

export class PaymentCardType {
  constructor(
    public readonly code: string,
    public readonly name: string,
    public readonly cardNumberLength: number,
    public readonly cardNumberPattern: RegExp,
    public readonly securityCodeType: SecurityCodeType,
    public readonly securityCodeLength: number,
  ) {
  }
}
