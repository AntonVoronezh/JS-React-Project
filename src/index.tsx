// @ts-ignore
import React from "react";
// @ts-ignore
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./helpers/configs/i18n";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { App } from "./components/app";
import createStore from "./store/store";

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);
serviceWorker.unregister();
