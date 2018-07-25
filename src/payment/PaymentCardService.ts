import { getPaymentCardTypes, PaymentCardTypeData } from "ra-api";
import { ServiceBase } from "ra-core";

import { PaymentCardType, SecurityCodeType } from "./PaymentCardType";

export class PaymentCardService extends ServiceBase {
  public async getAllCardTypes() {
    const response = await this.http.get<PaymentCardTypeData[]>(getPaymentCardTypes);

    return response.data.map((i) => new PaymentCardType(
      i.code,
      i.name,
      i.cardNumberLength,
      new RegExp(i.cardNumberPattern),
      i.securityCodeType as SecurityCodeType,
      i.securityCodeLength,
    ));
  }
}
