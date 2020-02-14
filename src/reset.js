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
        <div className="logo-and-text">
          <h1>Welcome to PlantMe</h1>
          <br />
          <h2>Identify Plant, Flower, Weed and more</h2>
          <br /> <br /> <br /> <br />
          <br /> <br /> <br />
          <img src={"/plant.png"} />
        </div>
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
        <br />
        <Link style={{ marginBottom: "50px" }} to="/login">
          Click here to Log in!
        </Link>
      </div>
    );
  }
}
