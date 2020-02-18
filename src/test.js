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
        console.log("trefleResults: ", trefleResults);
        this.setState({ showgif: false });
        this.setState({ google: googleResults });
        this.setState({ trefle: [trefleResults] });
        // let bingResults = [];

        // Make request to bing only if no results from trefle
        if (trefleResults == undefined) {
          console.log("no results from trefle");
          let dynamicIndex = 0;
          googleResults.slice(0, 3).forEach(result => {
            // post to bing if there is no results from trefle
            axios
              .post("/result/" + result.description)
              .then(results => {
                console.log("results from bing: ", results);
                this.setState({ showgif: false });
                let googleCopy = [...this.state.google];
                googleCopy[dynamicIndex].bing = results.data;
                console.log("googleCopy: ", googleCopy);
                dynamicIndex++;
                // bingResults.push(results.data);
                this.setState({ google: googleCopy });
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
  userChoise(e) {
    console.log(e.target.innerHTML);
    let userChoise = e.target.innerHTML;
    // window.open(`/https://www.thespruce.com/search?q=${userChoise}`, "_blank");
    // location.replace(`/https://www.thespruce.com/search?q=${userChoise}`);
    // axios
    //   .post("/userchoise/" + userChoise)
    //   .then(results => {
    //     console.log("results from userChoise: ", results);
    //   })
    //   .catch(err => {
    //     console.log("error from userChoise: ", err);
    //   });
  }

  render() {
    console.log("this.state from test: ", this.state);
    return (
      <div className="test">
        {!this.state.hide && (
          <div className="uploader">
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
          </div>
        )}
        {this.state.hide && (
          <div>
            <a href="/test">Click here to upload new image.</a>
          </div>
        )}
        {this.state.showgif && <img src="/loading.gif" />}
        <br />
        <br />
        {this.state.trefle && (
          <div>
            {this.state.trefle.length == 0 && (
              <div className="google-results">
                <p className="no-results">
                  We are not sure about your picture,
                  <br /> these are the alternative we found.
                </p>
                {this.state.google.slice(0, 3).map((googleResult, key) => {
                  return (
                    <a
                      style={{ color: "white", margin: "75px" }}
                      href={
                        "https://www.thespruce.com/search?q=/" +
                        googleResult.description
                      }
                      target="_blank"
                    >
                      {googleResult.description}
                      <img src={googleResult.bing} />
                    </a>
                  );
                })}
                {this.state.bing && (
                  <div>
                    <br />
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
                {result && (
                  <>
                    <p>{result.common_name}</p>
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
        {this.state.google && (
          <>
            {this.state.google[0].bing && (
              <img src={this.state.google[0].bing} />
            )}
            {this.state.google[1].bing && (
              <img src={this.state.google[1].bing} />
            )}
            {this.state.google[2].bing && (
              <img src={this.state.google[2].bing} />
            )}
          </>
        )}
      </div>
    );
  }
}
