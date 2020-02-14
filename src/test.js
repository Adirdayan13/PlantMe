import React from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";

import { Link } from "react-router-dom";

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // console.log("this.props from Profile : ", this.props);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  grabFile(e) {
    this.setState({
      [e.target.name]: e.target.files[0]
    });
    console.log("this.state from grabfile: ", this.state);
  }

  clickHandler() {
    // let image = this.state.picture;
    // console.log("file: ", this.state.file);
    // console.log("image: ", image);
    // axios.post("/click").then(results => {
    //   // console.log("Restuls: ", results);
    //   this.setState({ done: true });
    //   var results = results.data;
    //   var parsedResults = JSON.parse(results);
    //   console.log("parsedResults: ", parsedResults);
    //   this.setState({ parsedResults: parsedResults });
    //   // this.props.editTest(parsedResults[0]);
    // });

    var formData = new FormData();
    formData.append("file", this.state.file);
    axios
      .post("/upload", formData)
      .then(results => {
        console.log("results from post click: ", results);
        var parsedResults = JSON.parse(results.data);
        console.log("parsedResults: ", parsedResults.result.tags);
        this.setState({ parsedResults: parsedResults.result.tags });
      })
      .catch(err => {
        console.log("err: ", err);
      });
  }

  render() {
    console.log("this.state from test: ", this.state);
    return (
      <div className="test">
        <h1>I am from test</h1>
        <br />
        <form>
          <input
            type="file"
            name="file"
            id="file"
            onChange={e => this.grabFile(e)}
          />
        </form>
        <button onClick={this.clickHandler.bind(this)}>Click Me</button>
        {this.state.done && <div>done</div>}
        {this.state.parsedResults && (
          <div>
            {" "}
            {this.state.parsedResults.map((result, key) => (
              <div key={key}>
                {result.confidence && (
                  <ul>
                    <li>
                      {result.confidence} {result.tag.en}
                    </li>
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
