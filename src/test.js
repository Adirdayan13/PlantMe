import React from "react";
import axios from "./axios";
import Showmore from "./showmore";
import { BrowserRouter, Route } from "react-router-dom";

import { Link } from "react-router-dom";

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.clickHandler = this.clickHandler.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  grabFile(e) {
    this.setState({
      [e.target.name]: e.target.files[0]
    });
    console.log("this.state from grabfile: ", this.state);
  }

  clickHandler(e) {
    this.setState({ hide: true, showgif: true });
    var formData = new FormData();
    formData.append("file", this.state.file);
    axios
      .post("/upload", formData)
      .then(results => {
        console.log("results from postupload: ", results);
        let googleResults = results.data[0];
        let trefleResults = results.data[2];
        if (results.data[1].length == 0) {
          this.setState({ noResults: true });
        }
        this.setState({ showgif: false });
        this.setState({ google: googleResults });
        this.setState({ trefle: [trefleResults] });
      })
      .catch(err => {
        console.log("err: ", err);
        this.setState({ showgif: false });
      });
  }
  showGoogleResults(e) {
    this.setState({ showGoogleResults: true });
  }

  render() {
    console.log("this.state from test: ", this.state);
    return (
      <div className="test">
        {!this.state.hide && (
          <>
            <br />
            <h1>How to get the most accurate results ?</h1>
            <br />
            <h3>
              You should take a clear picture of your Plant, Flower, Weed,
              <br />
              try to take a picture without the pot or different items in the
              background
            </h3>
            <div className="uploader">
              <br />
              <br />
              <h1>Upload your picture</h1>
              <br />
              <form>
                <input
                  ref={ref => (this.fileInput = ref)}
                  type="file"
                  name="file"
                  id="file"
                  onChange={e => this.grabFile(e)}
                />
              </form>
              <button onClick={e => this.clickHandler(e)}>Click Me</button>
            </div>
          </>
        )}
        {this.state.noResults && (
          <div className="no-results">
            <br /> <br />
            <p>We dont have any results for you, please try again.</p>
            <br /> <br />
            <img src="/no-results.gif" />
          </div>
        )}
        {this.state.showgif && <img src="/loading.gif" />}
        <br />
        <br />
        {this.state.trefle && (
          <div>
            <br />
            {this.state.trefle.map((result, key) => (
              <div className="result" key={key}>
                {result && (
                  <>
                    <p> We have the exact results for you !</p>
                    <br />
                    <p style={{ fontFamily: "orange", fontSize: "45px" }}>
                      {result.common_name}
                    </p>
                    <br />
                    {result.images.length > 0 && (
                      <>
                        {result.images[0].url && (
                          <img
                            style={{ width: "400px" }}
                            src={result.images[0].url}
                          />
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            ))}
            {this.state.trefle[0] != undefined && (
              <div>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    color: "white"
                  }}
                  onClick={() => this.setState({ show: true })}
                >
                  Click here for more info
                </p>
                {this.state.show && (
                  <Showmore
                    state={this.state}
                    clickHandler={() =>
                      this.setState({
                        sun: true
                      })
                    }
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
