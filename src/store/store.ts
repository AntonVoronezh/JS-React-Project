import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { apiMiddleware } from "redux-api-middleware";

import rootReducer from "./rootReducer";

let middleware;

if (process.env.NODE_ENV === "development") {
  middleware = applyMiddleware(apiMiddleware, thunk, logger);
} else {
  middleware = applyMiddleware(apiMiddleware, thunk);
}

export default () => createStore(rootReducer, middleware);
