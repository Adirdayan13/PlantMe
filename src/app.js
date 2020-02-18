import React from "react";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import Test from "./test";
import Test2 from "./test2";
import Showmore from "./showmore";
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
    this.setState({ image: image });
  }

  render() {
    // if (!this.state.id) {
    //   return "Loading...";
    // }
    console.log("this.state from app render: ", this.state.data);

    return (
      <div className="app">
        <BrowserRouter>
          <header className="header">
            <img className="small-logo" src="/planet-earth.svg" />
            <p>PlantMe</p>
            <a href="/">
              <img className="upload-logo" src="/upload.svg" />
            </a>
          </header>
          <Test />
          <Route
            exact
            path="/test"
            render={() => (
              <Test editTest={results => this.setState({ data: [results] })} />
            )}
          />
          {this.state.data && (
            <h1>
              {this.state.data.map((item, key) => (
                <div key={key}>{item}</div>
              ))}
            </h1>
          )}
          <Route
            exact
            path="/test2"
            render={() => (
              <Test2
                editTest2={results => this.setState({ data2: [results] })}
              />
            )}
          />
        </BrowserRouter>
      </div>
    );
  }
}
