import React from "react";
import axios from "./axios";
import Showmore from "./showmore";
import { BrowserRouter, Route } from "react-router-dom";

import { Link } from "react-router-dom";

export default class Garden extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.showPopUp = this.showPopUp.bind(this);
    this.removePopUP = this.removePopUP.bind(this);
  }
  componentDidMount() {
    axios
      .get("/garden.json")
      .then(results => {
        console.log("results from GET garden: ", results);
        let myGarden = results.data;
        this.setState({ myGarden: results.data });
      })
      .catch(err => {
        console.log("error from GET garden: ", err);
      });
  }

  showPopUp() {
    this.setState({ showHumidPopup: true });
  }
  removePopUP() {
    this.setState({ showHumidPopup: false });
  }
  render() {
    console.log("this.props. from garden: ", this.props);
    console.log("this.state from garden: ", this.state);
    return (
      <div className="garden-div">
        {this.state.myGarden && (
          <>
            {this.state.myGarden.map((plant, item) => (
              <div key={item} className="garden-results">
                <p>{plant.name}</p>
                <div className="small-logos">
                  {this.state.showHumidPopup && (
                    <div className="humidPopup">
                      <p>I love humid !</p>
                    </div>
                  )}
                  {plant.shade == "Intolerant" && (
                    <img style={{ width: "40px" }} src="/sun.svg" />
                  )}
                  {plant.drought == "Medium" && (
                    <img style={{ width: "40px" }} src="/drought.svg" />
                  )}
                  {plant.moisture == "Medium" && (
                    <>
                      <img
                        onMouseEnter={this.showPopUp}
                        onMouseLeave={this.removePopUP}
                        style={{ width: "40px" }}
                        src="/humidity.svg"
                      />
                    </>
                  )}
                </div>
                <img
                  style={{
                    width: "300px",
                    height: "300px",
                    borderRadius: "20px"
                  }}
                  src={plant.picture}
                />
              </div>
            ))}
          </>
        )}
      </div>
    );
  }
}
