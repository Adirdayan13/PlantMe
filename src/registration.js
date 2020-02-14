import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log("change !");
  }
  submit() {
    console.log("button clicked");
  }

  render() {
    return (
      <div className="register">
        <div className="logo-and-text">
          <h1>Welcome to PlantMe</h1>
          <br />
          <h2>Identify Plant, Flower, Weed and more</h2>
          <br /> <br /> <br /> <br />
          <br /> <br /> <br />
          <img src={"/plant.png"} />
        </div>
        <div className="register-inputs">
          <input
            className="first"
            name="first"
            placeholder="First name"
            onChange={e => this.handleChange(e)}
          />

          <input
            className="last"
            name="last"
            placeholder="Last name"
            onChange={e => this.handleChange(e)}
          />

          <input
            className="email"
            name="email"
            placeholder="Email"
            onChange={e => this.handleChange(e)}
          />

          <input
            className="password"
            name="password"
            placeholder="Password"
            type="password"
            onChange={e => this.handleChange(e)}
          />
          <button className="submit-btn-register" onClick={() => this.submit()}>
            Register
          </button>
          <br></br>
          <Link to="/login">Click here to Log in!</Link>
        </div>
      </div>
    );
  }
}
