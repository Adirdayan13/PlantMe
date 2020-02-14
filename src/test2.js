import React from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Webcam from "react-webcam";

export default class Test2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  cameraOn() {
    this.setState({ cameraOn: true });
  }
  fn() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };

    const WebcamCapture = () => {
      const webcamRef = React.useRef(null);

      const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
      }, [webcamRef]);
    };
  }

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };

    const WebcamCapture = () => {
      const webcamRef = React.useRef(null);

      const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
      }, [webcamRef]);
    };
    return (
      <div className="test2">
        <button onClick={this.cameraOn.bind(this)}>Button from test2</button>
        {this.state.cameraOn && <Webcam />}
      </div>
    );
  }
}
