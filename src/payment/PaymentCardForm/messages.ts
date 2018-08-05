import { defineMessages } from "react-intl";

import { messages } from "ra-shared";

export const paymentCardFormMessages = defineMessages({
  cardNumberEmptyError: {
    ...messages.emptyError,
    id: "paymentCardForm.cardNumber.error.empty",
  },
  cardNumberLabel: {
    defaultMessage: "Card number",
    id: "paymentCardForm.cardNumber.label",
  },
  cardNumberLengthError: {
    ...messages.lengthError,
    id: "paymentCardForm.cardNumber.error.length",
  },
  cardNumberPatternError: {
    defaultMessage: "Not a valid {name} card number",
    id: "paymentCardForm.cardNumber.error.pattern",
  },
  cardNumberPlaceholder: {
    defaultMessage: "Enter card number",
    id: "paymentCardForm.cardNumber.placeholder",
  },
  cardTypeEmptyError: {
    ...messages.emptyError,
    id: "paymentCardForm.cardType.error.empty",
  },
  cardTypeLabel: {
    defaultMessage: "Card type",
    id: "paymentCardForm.cardType.label",
  },
  cardTypeNoData: {
    defaultMessage: "No card types",
    id: "paymentCardForm.cardType.noData",
  },
  cardTypePlaceholder: {
    defaultMessage: "Please select",
    id: "paymentCardForm.cardType.placeholder",
  },
  cardholdersNameEmptyError: {
    ...messages.emptyError,
    id: "paymentCardForm.cardholdersName.error.empty",
  },
  cardholdersNameLabel: {
    defaultMessage: "Cardholder's name",
    id: "paymentCardForm.cardholdersName.label",
  },
  cardholdersNamePlaceholder: {
    defaultMessage: "e.g. John Smith",
    id: "paymentCardForm.cardholdersName.placeholder",
  },
  expiryDateEmptyError: {
    ...messages.emptyError,
    id: "paymentCardForm.expiryDate.error.empty",
  },
  expiryDateLabel: {
    defaultMessage: "Expiry date",
    id: "paymentCardForm.expiryDate.label",
  },
  expiryDatePlaceholder: {
    defaultMessage: "Select month",
    id: "paymentCardForm.expiryDate.placeholder",
  },
  securityCodeEmptyError: {
    ...messages.emptyError,
    id: "paymentCardForm.securityCode.error.empty",
  },
  securityCodeLabel: {
    defaultMessage: "Security code",
    id: "paymentCardForm.securityCode.label",
  },
  securityCodeLengthError: {
    ...messages.lengthError,
    id: "paymentCardForm.securityCode.error.length",
  },
  securityCodePlaceholder: {
    defaultMessage: "CVV",
    id: "paymentCardForm.securityCode.placeholder",
  },
});
