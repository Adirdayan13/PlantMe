import React from "react";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import Test from "./test";
import Test2 from "./test2";
import Garden from "./garden";
import Showmore from "./showmore";
import Guest from "./guest";
import Info from "./info";
import Webcam from "react-webcam";
const WebcamComponent = () => <Webcam />;
import { Link } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
    console.log("this.state from app: ", this.state);
    console.log("this.props from app: ", this.props);
  }

  imgae() {
    this.setState({ image: image, hideAll: false });
  }

  render() {
    // if (!this.state.id) {
    //   return "Loading...";
    // }
    console.log("this.state from app render: ", this.state);

    return (
      <div className="app">
        <BrowserRouter>
          <header className="header">
            <img className="small-logo" src="/planet-earth.svg" />
            <p></p>
            <p></p>
            <p>PlantMe</p>
            <div>
              <a className="upload-header" href="/">
                <p className="upload-header-p" style={{ marginRight: "5px" }}>
                  Upload
                </p>
                <img className="upload-logo" src="/upload.svg" />
              </a>
            </div>
            <div>
              <Link className="garden-header" to="/garden">
                <p style={{ marginRight: "5px" }}>My Garden</p>
                <img className="garden-logo" src="/garden.svg" />
              </Link>
            </div>
            <div>
              <Link className="info-header" to="/info">
                <p style={{ marginRight: "5px" }}>Info</p>
                <img className="info-logo" src="/info.svg" />
              </Link>
            </div>
          </header>
          <Route
            exact
            path="/"
            render={() => (
              <Test passState={trefle => this.setState({ trefle })} />
            )}
          />
          <Route
            path="/garden"
            render={() => (
              <Garden
                // plantName={plantName => this.setState({ plantName: plantName })}
                trefle={this.state.trefle}
              />
            )}
          />
          <Route exact path="/info" render={() => <Info />} />
        </BrowserRouter>
      </div>
    );
  }
}

// <Route
// exact
// path="/guest"
// render={() => (
//     <Guest passState={trefle => this.setState({ trefle })} />
// )}
// />
