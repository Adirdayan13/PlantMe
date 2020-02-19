import React from "react";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import Test from "./test";
import Test2 from "./test2";
import Garden from "./garden";
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
    this.setState({ image: image, hideAll: false });
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
            <Link to="/garden">
              <img className="garden-logo" src="/garden.svg" />
            </Link>
          </header>
          <Route path="/garden" component={Garden} />
          <Route exact path="/" component={Test} />
        </BrowserRouter>
      </div>
    );
  }
}
