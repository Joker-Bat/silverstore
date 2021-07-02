import React, { useEffect, useCallback } from "react";
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
import Loading from "../../components/UI/Loading/Loading";

/*
  Main Component
*/

const Homepage = () => {
  const dispatch = useDispatch();

  const { bannerImages, productRef, globalLoading } = useSelector(
    (state) => state.products
  );

  // Get banner images
  const getBannerImages = useCallback(
    (products) => {
      const listOfBanners = [];
      products.forEach((item) => {
        item.bannerImage && listOfBanners.push(item);
      });
      dispatch(setBannerImages(listOfBanners));
    },
    [dispatch]
  );

  // Random three products for featured
  const getRandomThreeProducts = useCallback(
    (products) => {
      const randomThreeProducts = getRandomThree(products);
      dispatch(setFeaturedProducts(randomThreeProducts));
    },
    [dispatch]
  );

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
  }, [
    productRef,
    getRandomThreeProducts,
    getBannerImages,
    bannerImages.length,
  ]);

  return (
    <section>
      {globalLoading ? <Loading /> : null}
      <Header />
      <FeaturedProducts />
      <RandomProduct />
      <PopularBrands />
    </section>
  );
};

export default Homepage;
