import { Airport, AirportService } from "ra-shared";

export enum SharedActionType {
  LoadAirportsRequest = "loadAirportsRequest",
  LoadAirportsSuccess = "loadAirportsSuccess",
  LoadAirportsFailure = "loadAirportsFailure",
}

export type SharedAction =
  LoadAirportsRequestAction |
  LoadAirportsSuccessAction |
  LoadAirportsFailureAction;

export interface LoadAirportsRequestAction {
  type: SharedActionType.LoadAirportsRequest;
}

const loadAirportsRequest = (): LoadAirportsRequestAction => ({
  type: SharedActionType.LoadAirportsRequest,
});

export interface LoadAirportsSuccessAction {
  type: SharedActionType.LoadAirportsSuccess;
  payload: Airport[];
}

const loadAirportsSuccess = (airports: Airport[]): LoadAirportsSuccessAction => ({
  payload: airports,
  type: SharedActionType.LoadAirportsSuccess,
});

export interface LoadAirportsFailureAction {
  type: SharedActionType.LoadAirportsFailure;
  error: string;
}

const loadAirportsFailure = (error: string): LoadAirportsFailureAction => ({
  error,
  type: SharedActionType.LoadAirportsFailure,
});

export const loadAirports = async (dispatch: any) => {
  dispatch(loadAirportsRequest());

  try {
    const service = new AirportService();

    const airports = await service.getAll();

    dispatch(loadAirportsSuccess(airports));
  } catch (error) {
    dispatch(loadAirportsFailure(error.toString()));
  }
};
