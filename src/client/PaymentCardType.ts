export enum SecurityCodeType {
  CVV = "cvv",
  CID = "cid",
}

export class PaymentCardType {
  constructor(
    public readonly code: string,
    public readonly name: string,
    public readonly securityCodeType: SecurityCodeType,
    public readonly securityCodeLength: number,
  ) {
  }
}

export const PaymentCardTypes = [
  new PaymentCardType("AX", "American Express", SecurityCodeType.CID, 4),
  new PaymentCardType("MC", "MasterCard", SecurityCodeType.CVV, 3),
];
