import * as Express from "express";

import { getPaymentCardTypes, PaymentCardTypeData } from "ra-api";
import { PaymentCardType } from "ra-document-store";

export const registerPaymentCardsApi = (app: Express.Express) => {
  app.get(getPaymentCardTypes, async (req, res) => {
    const documents = await req.documentSession.query<PaymentCardType>(PaymentCardType).all();

    const cardTypes: PaymentCardTypeData[] = documents.map((d): PaymentCardTypeData => ({
      cardNumberLength: d.cardNumberLength,
      cardNumberPattern: d.cardNumberPattern,
      code: d.code,
      name: d.name,
      securityCodeLength: d.securityCodeLength,
      securityCodeType: d.securityCodeType,
    }));

    res.send(cardTypes);
  });
};
