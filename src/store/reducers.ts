import { combineReducers } from "redux";

import { bookingReducer } from "./booking";
import { sharedReducer } from "./shared";

export const rootReducer = combineReducers({
  booking: bookingReducer,
  shared: sharedReducer,
});
