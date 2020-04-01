import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";
import { createStore, applyMiddleware } from "redux";

let elem;

if (location.pathname == "/welcome") {
  elem = <Welcome />;
} else {
  elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));
