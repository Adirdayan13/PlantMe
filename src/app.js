import React from "react";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import Main from "./main";
import Garden from "./garden";
import PlantInfo from "./plantinfo";
import About from "./about";
import { Link } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {}

  imgae() {
    this.setState({ image: image, hideAll: false });
  }

  logout() {
    axios
      .post("/logout")
      .then(() => {
        location.replace("/");
      })
      .catch(err => console.log("error from logout: ", err));
  }
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <header className="header">
            <img className="small-logo" src="/pics/planet-earth.svg" />
            <img
              onClick={this.logout}
              className="logout-header"
              src="/pics/logout.svg"
            />
            <div>
              <p className="plantme-header">PlantMe</p>
            </div>
            <div>
              <a className="upload-header" href="/">
                <p className="upload-header-p" style={{ marginRight: "5px" }}>
                  Upload
                </p>
                <img className="upload-logo" src="/pics/upload.svg" />
              </a>
            </div>
            <div>
              <Link className="garden-header" to="/garden">
                <p style={{ marginRight: "5px" }}>My Garden</p>
                <img className="garden-logo" src="/pics/garden.svg" />
              </Link>
            </div>
            <div>
              <Link className="info-header" to="/info">
                <p style={{ marginRight: "5px" }}>About</p>
                <img className="info-logo" src="/pics/info.svg" />
              </Link>
            </div>
          </header>
          <Route exact path="/" render={() => <Main />} />
          <Route path="/garden" render={() => <Garden />} />
          <Route exact path="/info" render={() => <About />} />
        </BrowserRouter>
      </div>
    );
  }
}
