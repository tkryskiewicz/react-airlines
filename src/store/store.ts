import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";

import { rootReducer } from "./reducers";

const composeEnhancers = composeWithDevTools({});

export const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(
    ReduxThunk,
  ),
));
