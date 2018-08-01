import { PaymentCard } from "ra-payment";
import { Address, PassengerName } from "ra-shared";

export enum BookingActionType {
  ChangePassengerName = "booking/changePassengerName",
  ChangePayment = "booking/changePayment",
}

export type BookingAction =
  ChangePassengerNameAction |
  ChangePaymentAction;

interface ChangePassengerNameAction {
  type: BookingActionType.ChangePassengerName;
  payload: PassengerName;
}

export const changePassengerName = (name: PassengerName): ChangePassengerNameAction => ({
  payload: name,
  type: BookingActionType.ChangePassengerName,
});

interface ChangePaymentAction {
  type: BookingActionType.ChangePayment;
  payload: {
    paymentCard: PaymentCard;
    billingAddress: Address;
  };
}

export const changePayment = (paymentCard: PaymentCard, billingAddress: Address): ChangePaymentAction => ({
  payload: {
    billingAddress,
    paymentCard,
  },
  type: BookingActionType.ChangePayment,
});
