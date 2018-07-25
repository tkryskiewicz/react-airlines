import * as Express from "express";

import { getPaymentCardTypes, PaymentCardTypeData } from "ra-api";
import { PaymentCardType } from "ra-document-store";

export const registerPaymentCardsApi = (app: Express.Express) => {
  app.get(getPaymentCardTypes, async (req, res) => {
    const documents = await req.documentSession.query<PaymentCardType>(PaymentCardType).all();

    const cardTypes: PaymentCardTypeData[] = documents.map((d): PaymentCardTypeData => ({
      ...d,
    }));

    res.send(cardTypes);
  });
};
