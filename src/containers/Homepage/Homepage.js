import React, { useEffect } from "react";

// Components
import Header from "../../components/Homepage/Header/Header";
import FeaturedProducts from "../../components/Homepage/FeaturedProducts/FeaturedProducts";
import RandomProduct from "../../components/Homepage/RandomProduct/RandomProduct";
import PopularBrands from "../../components/Homepage/PopularBrands/PopularBrands";

const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      <Header />
      <FeaturedProducts />
      <RandomProduct />
      <PopularBrands />
    </section>
  );
};

export default Homepage;
