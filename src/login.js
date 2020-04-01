import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { useStatefulFields } from "./hooks/useStatefulFields";
import { useAuthSubmit } from "./hooks/useAuthSubmit";

export default function Login() {
  const [values, handleChange] = useStatefulFields();
  const [error, handleSubmit] = useAuthSubmit("/login", values);

  return (
    <div className="login">
      <img className="small-logo-login" src="/pics/planet-earth3.svg" />
      <div className="logo-and-text">
        <h1>Welcome to PlantMe</h1>
        <br />
        <h2>Identify Plant, Flower, Weed and more with picture</h2>
        <img className="plant-img" src={"/pics/plant.svg"} />
      </div>
      {!error && (
        <div className="login-inputs">
          <p className="login-text">Please login</p>
          <br />
          <input
            autoComplete="off"
            name="email"
            className="email"
            type="text"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            autoComplete="off"
            name="password"
            className="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <br />
          <button onClick={handleSubmit}>Submit</button>
          <br />
          <br />
          <Link className="register-link" to="/">
            Click here to register!
          </Link>
        </div>
      )}
      {error && (
        <div className="login-inputs">
          <input
            name="email"
            className="email-error"
            type="text"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            name="password"
            className="password-error"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Submit</button>
          <br />
          <Link className="register-link" to="/">
            Click here to register!
          </Link>
        </div>
      )}
    </div>
  );
}
