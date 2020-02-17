import React from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";

import { Link } from "react-router-dom";

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        // console.log("results from post upload: ", results);
        // var parsedResults = JSON.parse(results.data);
        // console.log("trefle: ", results.data[1]);
        // console.log("google: ", results.data[0]);
        this.setState({ google: results.data[0] });
        this.setState({ trefle: results.data[1] });
        this.fileInput.value = "";
      })
      .catch(err => {
        console.log("err: ", err);
      });
  }
  showGoogleResults(e) {
    this.setState({ showGoogleResults: true });
  }
  resultHandler(e) {
    console.log("e.taret.innerHTML: ", e.target.innerHTML);
    let result = e.target.innerHTML;
    axios
      .post("/upload", result)
      .then(results => {
        // console.log("results from post upload: ", results);
        // var parsedResults = JSON.parse(results.data);
        // console.log("trefle: ", results.data[1]);
        // console.log("google: ", results.data[0]);
        this.setState({ google: results.data[0] });
        this.setState({ trefle: results.data[1] });
        this.fileInput.value = "";
      })
      .catch(err => {
        console.log("err: ", err);
      });
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
              <p className="no-results">We have no results for you, sorry.</p>
            )}
            <br />
            <p
              className="did-you-mean"
              onClick={e => this.showGoogleResults(e)}
            >
              Did you mean something else ?<br />
              Click here
            </p>
            <br />
            {this.state.showGoogleResults && (
              <div className="google-results">
                {this.state.google.map((result, key) => {
                  return (
                    <p
                      key={key}
                      name={result.description}
                      onClick={e => this.resultHandler(e)}
                    >
                      {result.description}
                    </p>
                  );
                })}
              </div>
            )}
            {this.state.trefle.map((result, key) => (
              <div className="result" key={key}>
                {result.allResults && (
                  <>
                    <p>{result.common_name}</p>
                    {result.allResults.images[0].url && (
                      <img
                        style={{ width: "400px" }}
                        src={result.allResults.images[0].url}
                      />
                    )}
                    {!result.allResults.images[0].url && (
                      <p>We didnt find any pictures, sorry.</p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
