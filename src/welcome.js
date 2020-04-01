import React from "react";
import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <HashRouter>
        <>
          <Route exact path="/" component={Registration} />
          <Route exact path="/login" component={Login} />
        </>
      </HashRouter>
    );
  }
}
