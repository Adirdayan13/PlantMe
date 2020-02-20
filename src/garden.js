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
    console.log("componentDidMount");
    this.mount();
  }
  mount() {
    axios
      .get("/garden.json")
      .then(results => {
        console.log("results from GET garden: ", results);
        let myGarden = results.data;
        myGarden.map((item, index) => {
          if (
            !item.moisture &&
            !item.drought &&
            !item.shade &&
            !item.bloom &&
            !item.growth
          ) {
            item.marginBottom = "50px";
          }
        });
        console.log("my garden after looop: ", myGarden);
        this.setState({ myGarden });
      })
      .catch(err => {
        console.log("error from GET garden: ", err);
      });
  }
  editTrue() {
    this.setState({
      edit: true
    });
  }
  editFalse() {
    this.setState({
      edit: false
    });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submit(id) {
    let plantName = this.state.plantName;
    axios
      .post("/updategardenname", { plantId: id, plantName: plantName })
      .then(results => {
        let plantName = this.state.plantName;
        let plantId = this.state.plantId;
        // this.setState({ myGarden[plantId]: plantName })
        location.replace("/garden");
      })
      .catch(err => console.log("error from updateGardenName: ", err));
  }
  deletePic(plantId) {
    console.log("plantId:", plantId);
    axios
      .post("/deleteGarden", { plantId: plantId })
      .then(results => {
        this.mount();
      })
      .catch(err => console.log("error from deleteGarden: ", err));
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
                      <div className="edit-delete">
                        <img
                          onClick={() => this.setState({ plantId: plant.id })}
                          style={{ width: "20px" }}
                          src="pencil.svg"
                        />
                        <img
                          onClick={plantId => this.deletePic(plant.id)}
                          style={{ width: "20px" }}
                          src="trash.svg"
                        />
                      </div>
                      {this.state.plantId != plant.id && (
                        <p style={{ marginBottom: plant.marginBottom }}>
                          {plant.name}
                        </p>
                      )}
                      {this.state.plantId == plant.id && (
                        <div className="editplantname">
                          <p
                            key={item}
                            style={{ marginBottom: plant.meginBottom }}
                          >
                            <input
                              className="plant-name-input"
                              name="plantName"
                              onChange={e => this.handleChange(e)}
                              defaultValue={plant.name}
                              type="text"
                            />
                          </p>
                          <button
                            style={{ width: "70px" }}
                            onClick={nameAndId => this.submit(plant.id)}
                          >
                            Submit
                          </button>
                        </div>
                      )}
                      <div className="small-logos">
                        {plant.growth && (
                          <Tooltip content={`I grow in ${plant.growth}`}>
                            <img style={{ width: "40px" }} src="/growth.svg" />
                          </Tooltip>
                        )}
                        {plant.bloom && (
                          <Tooltip content={`I bloom in ${plant.bloom}`}>
                            <img style={{ width: "40px" }} src="/bloom.svg" />
                          </Tooltip>
                        )}
                        {plant.shade && (
                          <>
                            {plant.shade == "Intolerant" && (
                              <Tooltip content={`I love the sun`}>
                                <img style={{ width: "40px" }} src="/sun.svg" />
                              </Tooltip>
                            )}
                            {plant.shade == "Intermediate" && (
                              <Tooltip content={`I love not too hot sun`}>
                                <img style={{ width: "40px" }} src="/sun.svg" />
                              </Tooltip>
                            )}
                          </>
                        )}
                        {plant.drought && (
                          <>
                            {plant.drought == "High" && (
                              <Tooltip content={`I dont need a lot of water`}>
                                <img
                                  style={{ width: "40px" }}
                                  src="/drought.svg"
                                />
                              </Tooltip>
                            )}

                            {plant.drought == "Low" && (
                              <Tooltip content={`I need a lot of water`}>
                                <img
                                  style={{ width: "40px" }}
                                  src="/water.svg"
                                />
                              </Tooltip>
                            )}

                            {plant.drought == "Medium" && (
                              <Tooltip
                                content={`I need normal amount of water`}
                              >
                                <img
                                  style={{ width: "40px" }}
                                  src="/drought.svg"
                                />
                              </Tooltip>
                            )}
                          </>
                        )}

                        {plant.moisture == "Low" && (
                          <Tooltip content={`I dont like humid`}>
                            <img
                              style={{ width: "40px" }}
                              src="/humidity.svg"
                            />
                          </Tooltip>
                        )}
                        {plant.moisture == "High" && (
                          <Tooltip content={`I love a lot of humid`}>
                            <img
                              style={{ width: "40px" }}
                              src="/humidity.svg"
                            />
                          </Tooltip>
                        )}
                        {plant.moisture == "Medium" && (
                          <Tooltip content={`I love a bit humid`}>
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
                        key={plant.id}
                        src={plant.picture}
                        onClick={e => this.info(plant.picture)}
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
