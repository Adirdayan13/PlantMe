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
  }
  submit(e) {
    e.preventDefault();
    axios
      .post("/register", {
        first: this.state.first,
        last: this.state.last,
        email: this.state.email,
        password: this.state.password
      })
      .then(({ data }) => {
        if (data.success) {
          location.replace("/garden");
        } else {
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
        <img className="small-logo-register" src="/planet-earth3.svg" />
        <div className="logo-and-text">
          <h1>Welcome to PlantMe</h1>
          <br />
          <h2>Identify Plant, Flower, Weed and more with picture</h2>
          <img className="plant-img" src={"/plant.svg"} />
        </div>
        {!this.state.error && (
          <div className="register-inputs">
            <input
              autoComplete="off"
              className="first"
              name="first"
              placeholder="First name"
              onChange={e => this.handleChange(e)}
            />

            <input
              autoComplete="off"
              className="last"
              name="last"
              placeholder="Last name"
              onChange={e => this.handleChange(e)}
            />

            <input
              autoComplete="off"
              className="email"
              name="email"
              placeholder="Email"
              onChange={e => this.handleChange(e)}
            />

            <input
              autoComplete="off"
              className="password"
              name="password"
              placeholder="Password"
              type="password"
              onChange={e => this.handleChange(e)}
            />
            <button
              className="submit-btn-register"
              onClick={e => this.submit(e)}
            >
              Register
            </button>
            <br></br>
            <Link className="login-link" to="/login">
              Click here to Log in!
            </Link>
          </div>
        )}

        {this.state.error && (
          <div className="register-inputs">
            <input
              className="first-error"
              name="first"
              placeholder="First name"
              onChange={e => this.handleChange(e)}
            />

            <input
              className="last-error"
              name="last"
              placeholder="Last name"
              onChange={e => this.handleChange(e)}
            />

            <input
              className="email-error"
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
            <button
              className="submit-btn-register"
              onClick={e => this.submit(e)}
            >
              Register
            </button>
            <br></br>
            <Link className="login-link" to="/login">
              Click here to Log in!
            </Link>
          </div>
        )}
      </div>
    );
  }
}

// <p onClick={e => this.guest(e)}>Click here to log in as a guest!</p>
