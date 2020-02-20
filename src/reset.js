import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleChange(e) {
    console.log("change");
  }
  handleSubmit(e) {
    console.log("submit");
  }

  render() {
    return (
      <div className="reset">
        <img className="small-logo" src="/planet-earth.svg" />
        <div className="logo-and-text">
          <h1>Welcome to PlantMe</h1>
          <br />
          <h2>Identify Plant, Flower, Weed and more with picture</h2>
          <img className="plant-img" src={"/plant.svg"} />
        </div>
        <div className="restart-inputs">
          <p>Reset your password</p>
          <br />
          <input
            className="email"
            name="email"
            placeholder="Email"
            onChange={e => this.handleChange(e)}
          />
          <br />
          <button
            className="submit-btn-reset"
            onClick={e => this.handleSubmit(e)}
          >
            Reset password
          </button>
        </div>
        <br /> <br /> <br /> <br /> <br />
        <Link to="/login">Click here to Log in!</Link>
      </div>
    );
  }
}
