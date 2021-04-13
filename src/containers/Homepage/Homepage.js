import React, { Component } from "react";

// Test
import data from "../../data/data";

export class Homepage extends Component {
  // componentDidMount() {
  //   console.log(data[0].images[0]);
  // }

  render() {
    return (
      <div>
        <h1>Homepage</h1>
        <div style={{ width: "200px", height: "200px" }}>
          <img src={data[5].images[0]} alt="img" />
        </div>
      </div>
    );
  }
}

export default Homepage;
