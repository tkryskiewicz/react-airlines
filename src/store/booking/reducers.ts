import { Reducer } from "redux";

import { PaymentCard } from "ra-payment";
import { Address, PassengerName } from "ra-shared";

import { BookingAction, BookingActionType } from "./actions";
import { BookingState } from "./state";

const initialState: BookingState = {
  billingAddress: new Address(),
  passengerName: new PassengerName(),
  paymentCard: new PaymentCard(),
};

export const bookingReducer: Reducer<BookingState, BookingAction> = (state = initialState, action: BookingAction) => {
  if (action.type === BookingActionType.ChangeFlight) {
    return {
      ...state,
      flight: action.payload,
    };
  } else if (action.type === BookingActionType.ChangePassengerName) {
    return {
      ...state,
      passengerName: action.payload,
    };
  } else if (action.type === BookingActionType.ChangePayment) {
    const { paymentCard, billingAddress } = action.payload;

    return {
      ...state,
      billingAddress,
      paymentCard,
    };
  }

  return state;
};
