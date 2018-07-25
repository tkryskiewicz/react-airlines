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

export const PaymentCardTypes = [
  new PaymentCardType("AX", "American Express", 15, /^3[0-9]{14}$/, SecurityCodeType.CID, 4),
  new PaymentCardType("MC", "MasterCard", 16, /^[2,5][0-9]{15}$/, SecurityCodeType.CVV, 3),
];
