import React, { Component } from "react";

// Test
// import data from "../../data/data";

// Components
import Header from "../../components/Homepage/Header/Header";
import FeaturedProducts from "../../components/Homepage/FeaturedProducts/FeaturedProducts";
import RandomProduct from "../../components/Homepage/RandomProduct/RandomProduct";

export class Homepage extends Component {
  // componentDidMount() {
  //   console.log(data[0].images[0]);
  // }

  render() {
    return (
      <>
        <Header />
        <FeaturedProducts />
        <RandomProduct />
      </>
    );
  }
}

export default Homepage;
