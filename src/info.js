import React from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";

import { Link } from "react-router-dom";

export default class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <p>My final project</p>
        <p>INFO ON MY FINAL PROJECT</p>
      </div>
    );
  }
}
