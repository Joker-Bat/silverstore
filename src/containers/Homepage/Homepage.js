import React, { useState, useEffect } from "react";

// Axios
import axios from "../../axios-base";

// Helper function
import { getRandomThree } from "../../utilities/helperFunctions";

// Components
import Header from "../../components/Homepage/Header/Header";
import FeaturedProducts from "../../components/Homepage/FeaturedProducts/FeaturedProducts";
import RandomProduct from "../../components/Homepage/RandomProduct/RandomProduct";
import PopularBrands from "../../components/Homepage/PopularBrands/PopularBrands";

const Homepage = () => {
  const [bannerImages, setBannerImages] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // Get banner images
  const getBannerImages = (products) => {
    const listOfBanners = [];
    products.forEach((item) => {
      item.bannerImage && listOfBanners.push(item);
    });
    setBannerImages(listOfBanners);
  };

  // Random three products for featured
  const getRandomThreeProducts = (products) => {
    const randomThreeProducts = getRandomThree(products);
    setFeaturedProducts(randomThreeProducts);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/v1/products");
      const products = await res.data.data.products;
      getBannerImages(products);
      getRandomThreeProducts(products);
    };
    fetchData();

    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      <Header bannerImages={bannerImages} />
      <FeaturedProducts featuredProducts={featuredProducts} />
      <RandomProduct />
      <PopularBrands />
    </section>
  );
};

export default Homepage;
