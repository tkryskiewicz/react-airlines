import { combineReducers } from "redux";

import { bookingReducer } from "./booking";
import { paymentsReducer } from "./payments";
import { sharedReducer } from "./shared";

export const rootReducer = combineReducers({
  booking: bookingReducer,
  payments: paymentsReducer,
  shared: sharedReducer,
});
