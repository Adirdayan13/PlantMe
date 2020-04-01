import React from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";

import { Link } from "react-router-dom";

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="information">
        <p className="about-title">PlantMe project</p>
        <br />
        <br />
        <p className="about-text">
          My name is Adir Dayan, Web developer from Berlin.
          <br />
          I always had a passion for plants, flowers, trees, and everything that
          grows naturally.
          <br />
          I found myself in a lot of situations, especially when I am traveling,
          <br />
          I see a very beatiful plant or a tree and never know what
          <br />
          I am actually looking at and that's always disturb me.
          <br />
          So I decided to make a website to help myself and other people
          <br />
          to be able to know more about these plants.
          <br />
          All you need to do is to take a picture of the plant / flower / tree,
          <br />
          give it a name, upload it, get the results and discover what is it.
          <br />
          You always can go to "your garden" and see your upload history.
        </p>
      </div>
    );
  }
}
