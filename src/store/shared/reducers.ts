import { Reducer } from "redux";

import { SharedAction, SharedActionType } from "./actions";
import { SharedState } from "./state";

const initialState: SharedState = {
  airports: [],
  countries: [],
};

export const sharedReducer: Reducer<SharedState, SharedAction> = (state = initialState, action: SharedAction) => {
  if (action.type === SharedActionType.LoadCountriesSuccess) {
    const countries = action.payload.sort((a, b) => a.name.localeCompare(b.name));

    return {
      ...state,
      countries,
    };
  } else if (action.type === SharedActionType.LoadAirportsSuccess) {
    // FIXME: should sorting happen here or in component?
    const airports = action.payload.sort((a, b) => a.name.localeCompare(b.name));

    return {
      ...state,
      airports,
    };
  }

  return state;
};
