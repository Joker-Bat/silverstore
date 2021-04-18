import React, { Component } from "react";

// Test
// import data from "../../data/data";

// Components
// import CarouselSet from "../../components/Homepage/Carousel/Carousel";
import FeaturedProducts from "../../components/Homepage/FeaturedProducts/FeaturedProducts";

import Header from "../../components/Homepage/Header/Header";

export class Homepage extends Component {
  // componentDidMount() {
  //   console.log(data[0].images[0]);
  // }

  render() {
    return (
      <div>
        <Header />
        <FeaturedProducts />
      </div>
    );
  }
}

export default Homepage;
