import React, { Component } from "react";

// Test
// import data from "../../data/data";

// Components
import CarouselSet from "../../components/Homepage/Carousel/Carousel";
import FeaturedProducts from "../../components/Homepage/FeaturedProducts/FeaturedProducts";

export class Homepage extends Component {
  // componentDidMount() {
  //   console.log(data[0].images[0]);
  // }

  render() {
    return (
      <div>
        <CarouselSet />
        <FeaturedProducts />
      </div>
    );
  }
}

export default Homepage;
