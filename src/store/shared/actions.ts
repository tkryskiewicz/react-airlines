import { Dispatch } from "redux";

import { Airport, AirportService, Country, CountryService } from "ra-shared";

export enum SharedActionType {
  LoadCountriesRequest = "shared/loadCountriesRequest",
  LoadCountriesSuccess = "shared/loadCountriesSuccess",
  LoadCountriesFailure = "shared/loadCountriesFailure",
  LoadAirportsRequest = "shared/loadAirportsRequest",
  LoadAirportsSuccess = "shared/loadAirportsSuccess",
  LoadAirportsFailure = "shared/loadAirportsFailure",
}

export type SharedAction =
  LoadCountriesAction |
  LoadAirportsAction;

type LoadCountriesAction =
  LoadCountriesRequestAction |
  LoadCountriesSuccessAction |
  LoadCountriesFailureAction;

export interface LoadCountriesRequestAction {
  type: SharedActionType.LoadCountriesRequest;
}

const loadCountriesRequest = (): LoadCountriesRequestAction => ({
  type: SharedActionType.LoadCountriesRequest,
});

export interface LoadCountriesSuccessAction {
  type: SharedActionType.LoadCountriesSuccess;
  payload: Country[];
}

const loadCountriesSuccess = (countries: Country[]): LoadCountriesSuccessAction => ({
  payload: countries,
  type: SharedActionType.LoadCountriesSuccess,
});

export interface LoadCountriesFailureAction {
  type: SharedActionType.LoadCountriesFailure;
  error: string;
}

const loadCountriesFailure = (error: string): LoadCountriesFailureAction => ({
  error,
  type: SharedActionType.LoadCountriesFailure,
});

export const loadCountries = async (dispatch: Dispatch<LoadCountriesAction>) => {
  dispatch(loadCountriesRequest());

  try {
    const service = new CountryService();

    const countries = await service.getAll();

    return dispatch(loadCountriesSuccess(countries));
  } catch (error) {
    return dispatch(loadCountriesFailure(error.toString()));
  }
};

type LoadAirportsAction =
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

export const loadAirports = async (dispatch: Dispatch<LoadAirportsAction>) => {
  dispatch(loadAirportsRequest());

  try {
    const service = new AirportService();

    const airports = await service.getAll();

    dispatch(loadAirportsSuccess(airports));
  } catch (error) {
    dispatch(loadAirportsFailure(error.toString()));
  }
};
