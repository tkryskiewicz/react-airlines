import { PaymentCard } from "ra-payment";
import { Address, Flight, PassengerName } from "ra-shared";

export enum BookingActionType {
  ChangeFlight = "booking/changeFlight",
  ChangePassengerName = "booking/changePassengerName",
  ChangePayment = "booking/changePayment",
}

export type BookingAction =
  ChangeFlightAction |
  ChangePassengerNameAction |
  ChangePaymentAction;

interface ChangeFlightAction {
  type: BookingActionType.ChangeFlight;
  payload: Flight;
}

export const changeFlight = (flight: Flight): ChangeFlightAction => ({
  payload: flight,
  type: BookingActionType.ChangeFlight,
});

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
