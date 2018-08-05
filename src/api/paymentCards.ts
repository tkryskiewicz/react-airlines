export const getPaymentCardTypes = "/api/paymentCardTypes";

export interface PaymentCardTypeData {
  code: string;
  name: string;
  cardNumberLength: number;
  cardNumberPattern: string;
  securityCodeType: string;
  securityCodeLength: number;
}
