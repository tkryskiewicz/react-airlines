import { Dispatch } from "redux";

import { PaymentCardService, PaymentCardType } from "ra-payment";

export enum PaymentsActionType {
  LoadCardTypesRequest = "payments/loadCardTypesRequest",
  LoadCardTypesSuccess = "payments/loadCardTypesSuccess",
  LoadCardTypesFailure = "payments/loadCardTypesFailure",
}

export type PaymentsAction =
  LoadCardTypesAction;

type LoadCardTypesAction =
  LoadCardTypesRequestAction |
  LoadCardTypesSuccessAction |
  LoadCardTypesFailureAction;

interface LoadCardTypesRequestAction {
  type: PaymentsActionType.LoadCardTypesRequest;
}

const loadCardTypesRequest = (): LoadCardTypesRequestAction => ({
  type: PaymentsActionType.LoadCardTypesRequest,
});

interface LoadCardTypesSuccessAction {
  type: PaymentsActionType.LoadCardTypesSuccess;
  payload: PaymentCardType[];
}

const loadCardTypesSuccess = (cardTypes: PaymentCardType[]): LoadCardTypesSuccessAction => ({
  payload: cardTypes,
  type: PaymentsActionType.LoadCardTypesSuccess,
});

interface LoadCardTypesFailureAction {
  type: PaymentsActionType.LoadCardTypesFailure;
  error: string;
}

const loadCardTypesFailure = (error: string): LoadCardTypesFailureAction => ({
  error,
  type: PaymentsActionType.LoadCardTypesFailure,
});

export const loadCardTypes = async (dispatch: Dispatch<LoadCardTypesAction>) => {
  dispatch(loadCardTypesRequest());

  try {
    const service = new PaymentCardService();

    const cardTypes = await service.getAllCardTypes();

    return dispatch(loadCardTypesSuccess(cardTypes));
  } catch (error) {
    return dispatch(loadCardTypesFailure(error.toString()));
  }
};
