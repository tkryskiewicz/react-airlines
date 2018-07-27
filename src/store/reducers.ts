import { combineReducers } from "redux";

import { sharedReducer } from "./shared";

export const rootReducer = combineReducers({
  shared: sharedReducer,
});
