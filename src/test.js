import React from "react";
import axios from "./axios";
import Showmore from "./showmore";
import { BrowserRouter, Route } from "react-router-dom";

import { Link } from "react-router-dom";

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false, showUploader: true, filename: "Choose a file" };
    this.clickHandler = this.clickHandler.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log("this.state from handleChange: ", this.state);
  }

  handleChangeGarden(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  clickHandlerGarden(e) {
    e.preventDefault();
    this.setState({ showName: true, showUploader: false });
    console.log("e.taget.name: ", e.target.name);
    if (!this.state.file) {
      this.setState({ error: true, hide: true });
    }
  }

  grabFile(e) {
    this.setState({
      [e.target.name]: e.target.files[0],
      filename: e.target.files[0].name
    });
    console.log("this.state from grabfile: ", this.state);
  }

  clickHandler(e) {
    this.setState({ hide: true, showgif: true });
    var formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("plantName", this.state.plantName);

    if (!this.state.file) {
      this.setState({ error: true, showgif: false });
      return;
    }

    axios
      .post("/garden", formData)
      .then(rowId => {
        let columnId = rowId.data[0].id;
        console.log("rowId: ", rowId);
        axios
          .post("/upload", formData)
          .then(results => {
            console.log("results from postupload: ", results);
            let googleResults = results.data[0];
            let trefleResults = results.data[2];
            console.log("trefleResults: ", trefleResults);
            if (results.data[1].length == 0) {
              this.setState({ noResults: true });
            }
            if (
              trefleResults.main_species.growth.shade_tolerance &&
              trefleResults.main_species.growth.moisture_use &&
              trefleResults.main_species.growth.drought_tolerance &&
              trefleResults.main_species.seed.bloom_period &&
              trefleResults.main_species.specifications.growth_period &&
              trefleResults.common_name
            ) {
              let common_name = trefleResults.common_name;
              let bloom = trefleResults.main_species.seed.bloom_period;
              let drought = trefleResults.main_species.growth.drought_tolerance;
              let moisture = trefleResults.main_species.growth.moisture_use;
              let shade = trefleResults.main_species.growth.shade_tolerance;
              let growth =
                trefleResults.main_species.specifications.growth_period;
              axios
                .post("/updategarden", {
                  columnId,
                  shade,
                  moisture,
                  drought,
                  bloom,
                  growth,
                  common_name
                })
                .then(updategarden => {
                  console.log("updategarden results: ", updategarden);
                })
                .catch(err => {
                  console.log("error from updategarden: ", err);
                });
            }
            this.props.passState(trefleResults);
            this.setState({ showgif: false });
            this.setState({ google: googleResults });
            this.setState({ trefle: [trefleResults] });
          })
          .catch(err => {
            console.log("err: ", err);
            this.setState({ showgif: false });
          });
      })
      .catch(err => {
        console.log("error from garden: ", err);
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
            <h1>How to get the most accurate results?</h1>
            <br />
            <h3>
              You should take a clear picture of your Plant, Flower, Weed.
              <br />
              Try to take a picture without the pot or different items in the
              background.
            </h3>
            <br />
            <br />
            {this.state.showName && (
              <div className="uploader">
                <>
                  <p>Choose a name for your plant</p>
                  <input
                    autoComplete="off"
                    onChange={e => this.handleChangeGarden(e)}
                    type="text"
                    name="plantName"
                  />

                  <br />
                  <button onClick={e => this.clickHandler(e)}>Add name</button>
                  <img className="grassgif-showname" src="grassgif.gif" />
                </>
              </div>
            )}
            {this.state.showUploader && (
              <div className="uploader">
                <h1 style={{ display: "none" }}>Upload your picture</h1>
                <form>
                  <input
                    ref={ref => (this.fileInput = ref)}
                    type="file"
                    name="file"
                    id="file"
                    onChange={e => this.grabFile(e)}
                  />
                  <label
                    className="label"
                    htmlFor="file"
                    value={this.state.filename}
                  >
                    {this.state.filename}
                  </label>
                </form>
                <br />
                <button
                  className="button-uploader"
                  onClick={e => this.clickHandlerGarden(e)}
                >
                  Click Me
                </button>
                <img className="grassgif" src="grassgif.gif" />
              </div>
            )}
          </>
        )}
        {this.state.error && (
          <>
            <img src="/wrong.gif" />
            <p className="error">Something went wrong, please try again.</p>
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
        {this.state.showgif && (
          <img style={{ marginTop: "7%" }} src="/loading.gif" />
        )}
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
                            className="result-img"
                            src={result.images[0].url}
                          />
                        )}
                      </>
                    )}
                    {result.images.length == 0 && (
                      <img className="result-img" src="/default-flower.svg" />
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
