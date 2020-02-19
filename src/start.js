import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import Guest from "./guest";
import App from "./app";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;

if (location.pathname == "/guestlog") {
  elem = <Guest />;
} else if (location.pathname == "/welcome") {
  elem = <Welcome />;
} else {
  elem = (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

ReactDOM.render(elem, document.querySelector("main"));
