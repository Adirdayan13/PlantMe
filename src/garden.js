import React from "react";
import axios from "./axios";
import Showmore from "./showmore";
import Tooltip from "react-tooltip-lite";
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
      <div className="garden-div-wrapper">
        <p>My garden</p>
        <div className="garden-div">
          {this.state.myGarden && (
            <>
              {this.state.myGarden.length == 0 && (
                <>
                  <br />
                  <br />
                  <p>
                    You dont have nothing in your garden yet.
                    <br />
                    Upload your first plant
                  </p>
                </>
              )}
            </>
          )}
          {this.state.myGarden && (
            <>
              {this.state.myGarden.length > 0 && (
                <>
                  {this.state.myGarden.map((plant, item) => (
                    <div key={item} className="garden-results">
                      <p>{plant.name}</p>
                      <div className="small-logos">
                        {plant.growth && (
                          <Tooltip content={`I am grow in ${plant.growth}`}>
                            <img style={{ width: "40px" }} src="/growth.svg" />
                          </Tooltip>
                        )}
                        {plant.bloom && (
                          <Tooltip content={`I am bloom in ${plant.bloom}`}>
                            <img style={{ width: "40px" }} src="/bloom.svg" />
                          </Tooltip>
                        )}
                        {plant.shade && (
                          <Tooltip
                            content={`My shade tolerance is ${plant.shade}`}
                          >
                            <img style={{ width: "40px" }} src="/sun.svg" />
                          </Tooltip>
                        )}
                        {plant.drought && (
                          <Tooltip
                            content={`My drought level is ${plant.drought}`}
                          >
                            <img style={{ width: "40px" }} src="/drought.svg" />
                          </Tooltip>
                        )}
                        {plant.moisture && (
                          <Tooltip
                            content={`I love ${plant.moisture} humid level`}
                          >
                            <img
                              style={{ width: "40px" }}
                              src="/humidity.svg"
                            />
                          </Tooltip>
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
            </>
          )}
        </div>
      </div>
    );
  }
}
