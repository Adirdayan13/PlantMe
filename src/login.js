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
      <img className="small-logo" src="/planet-earth.svg" />
      <div className="logo-and-text">
        <h1>Welcome to PlantMe</h1>
        <br />
        <h2>Identify Plant, Flower, Weed and more with picture</h2>
        <img className="plant-img" src={"/plant.svg"} />
      </div>
      <div className="login-inputs">
        <input
          name="email"
          className="email"
          type="text"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          name="password"
          className="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Submit</button>
        <br />
        <Link to="/">Click here to register!</Link>
        <Link to="/reset/start">Forgot your password ? Click here!</Link>
      </div>
    </div>
  );
}
