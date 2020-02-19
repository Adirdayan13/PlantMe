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
  submit(e) {
    console.log("button clicked");
    e.preventDefault();
    axios
      .post("/register", {
        first: this.state.first,
        last: this.state.last,
        email: this.state.email,
        password: this.state.password
      })
      .then(({ data }) => {
        console.log("data: ", data);
        if (data.success) {
          console.log("post register worked");
          location.replace("/");
        } else {
          console.log("post register didnt worked");
          this.setState({
            error: true
          });
        }
      })
      .catch(err => {
        console.log("error from POST register: ", err);
        this.setState({
          error: true
        });
      });
  }
  guest(e) {
    e.preventDefault();
    axios
      .post("/guest")
      .then(results => {
        if (results.data.guest) {
          location.replace("/guestlog");
        }
      })
      .catch(err => console.log("error from guest:", err));
  }

  render() {
    return (
      <div className="register">
        <img className="small-logo" src="/planet-earth.svg" />
        <div className="logo-and-text">
          <h1>Welcome to PlantMe</h1>
          <br />
          <h2>Identify Plant, Flower, Weed and more with picture</h2>
          <img className="plant-img" src={"/plant.svg"} />
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
          <button className="submit-btn-register" onClick={e => this.submit(e)}>
            Register
          </button>
          <br></br>
          <Link to="/login">Click here to Log in!</Link>
          <p onClick={e => this.guest(e)}>Click here to log in as a guest!</p>
        </div>
      </div>
    );
  }
}
