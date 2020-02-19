import React from "react";
import axios from "./axios";
import Showmore from "./showmore";
import { BrowserRouter, Route } from "react-router-dom";

import { Link } from "react-router-dom";

export default class Guest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false, showUploader: false };
  }

  render() {
    return (
      <>
        <p>I am from guest</p>
      </>
    );
  }
}
