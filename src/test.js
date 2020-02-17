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
    var formData = new FormData();
    formData.append("file", this.state.file);
    axios
      .post("/upload", formData)
      .then(results => {
        let googleResults = results.data[0];
        let trefleResults = results.data[1];
        this.setState({ google: googleResults });
        this.setState({ trefle: trefleResults });
        let bingResults = [];

        // Make request to bing only if no results from trefle
        if (trefleResults.length == 0) {
          googleResults.slice(0, 3).forEach(result => {
            console.log("result: ", result.description);
            axios
              .post("/result/" + result.description)
              .then(results => {
                bingResults.push(results.data);
                this.setState({ bing: bingResults });
                this.fileInput.value = "";
              })
              .catch(err => {
                console.log("err: ", err);
              });
          });
        }
        // this.setState({ google: results.data[0] });
        // this.setState({ trefle: results.data[1] });
        this.fileInput.value = "";
      })
      .catch(err => {
        console.log("err: ", err);
      });
  }
  showGoogleResults(e) {
    this.setState({ showGoogleResults: true });
  }

  render() {
    console.log("this.state from test: ", this.state);
    return (
      <div className="test">
        <h1>Upload your picture to get results</h1>
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
        <br />
        <br />
        {this.state.trefle && (
          <div>
            {this.state.trefle.length == 0 && (
              <div className="google-results">
                <p className="no-results">
                  We are not sure about your picture, this is the alternative we
                  found.
                </p>
                {this.state.google.slice(0, 3).map((googleResult, key) => {
                  return (
                    <p key={key} name={googleResult.description}>
                      {googleResult.description}
                    </p>
                  );
                })}
                {this.state.bing && (
                  <div>
                    {this.state.bing.map((result, key) => {
                      return (
                        <>
                          <img style={{ width: "200px" }} src={result} />
                        </>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            <br />

            {this.state.trefle.map((result, key) => (
              <div className="result" key={key}>
                {result.allResults && (
                  <>
                    <p>{result.common_name}</p>
                    <br />
                    {result.allResults.images[0].url && (
                      <img
                        style={{ width: "400px" }}
                        src={result.allResults.images[0].url}
                      />
                    )}
                  </>
                )}
              </div>
            ))}
            {this.state.trefle.length != 0 && (
              <div>
                <p
                  style={{ textAlign: "center", fontSize: "20px" }}
                  onClick={() => this.setState({ show: true })}
                >
                  Click here for more info
                </p>
                {this.state.show && <Showmore state={this.state} />}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
