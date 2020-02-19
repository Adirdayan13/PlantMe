import React from "react";
import axios from "./axios";
import Showmore from "./showmore";
import { BrowserRouter, Route } from "react-router-dom";

import { Link } from "react-router-dom";

export default class Garden extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
  render() {
    console.log("this.props. from garden: ", this.props);
    console.log("this.state from garden: ", this.state);
    return (
      <div className="garden-div">
        {this.state.myGarden && (
          <>
            {this.state.myGarden.map((plant, item) => (
              <div key={item} className="garden-results">
                {this.props.tefle && (
                  <>
                    {this.props.trefle.main_species.growth.shade_tolerance ==
                      "Intolerant" && (
                      <>
                        <br />
                        <img style={{ width: "400px" }} src="/sun.svg" />
                      </>
                    )}
                    )}
                  </>
                )}
                <p>{plant.name}</p>
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
