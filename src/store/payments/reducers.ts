import { Reducer } from "redux";

import { PaymentsAction, PaymentsActionType } from "./actions";
import { PaymentsState } from "./state";

const initialState: PaymentsState = {
  cardTypes: [],
};

export const paymentsReducer: Reducer<PaymentsState, PaymentsAction> = (state = initialState, action: PaymentsAction) => {
  if (action.type === PaymentsActionType.LoadCardTypesSuccess) {
    const cardTypes = action.payload.sort((a, b) => a.name.localeCompare(b.name));

    return {
      ...state,
      cardTypes,
    };
  }

  return state;
};
