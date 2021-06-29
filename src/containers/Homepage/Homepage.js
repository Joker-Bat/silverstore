import React, { useEffect } from "react";

// Helper function
import { getRandomThree } from "../../utilities/helperFunctions";

// Redux Toolkit
import { useDispatch, useSelector } from "react-redux";
import {
  setBannerImages,
  setFeaturedProducts,
} from "../../store/products/productsSlice";

// Components
import Header from "../../components/Homepage/Header/Header";
import FeaturedProducts from "../../components/Homepage/FeaturedProducts/FeaturedProducts";
import RandomProduct from "../../components/Homepage/RandomProduct/RandomProduct";
import PopularBrands from "../../components/Homepage/PopularBrands/PopularBrands";

/*
  Main Component
*/

const Homepage = () => {
  const dispatch = useDispatch();

  const { bannerImages, productRef } = useSelector((state) => state.products);

  // Get banner images
  const getBannerImages = (products) => {
    const listOfBanners = [];
    products.forEach((item) => {
      item.bannerImage && listOfBanners.push(item);
    });
    dispatch(setBannerImages(listOfBanners));
  };

  // Random three products for featured
  const getRandomThreeProducts = (products) => {
    const randomThreeProducts = getRandomThree(products);
    dispatch(setFeaturedProducts(randomThreeProducts));
  };

  useEffect(() => {
    if (bannerImages.length === 0) {
      const fetchData = () => {
        getBannerImages(productRef);
        getRandomThreeProducts(productRef);
      };
      fetchData();
    }

    // Scroll to top
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [productRef]);

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
