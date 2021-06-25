import React, { useEffect } from "react";

// Axios
import axios from "../../axios-base";

// Helper function
import {
  getRandomThree,
  arrayToObjectState,
} from "../../utilities/helperFunctions";

// Redux Toolkit
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  setBannerImages,
  setFeaturedProducts,
} from "../../store/products/productsSlice";
import { setCategory, setPrice } from "../../store/filter/filterSlice";

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

  const { bannerImages } = useSelector((state) => state.products);

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

  // Get Category State
  const getProductsPageDetails = (products) => {
    // Categorys
    const categroryList = [...new Set(products.map((item) => item.type))];
    const categoryState = arrayToObjectState(categroryList, false);
    //Max price
    const maxPrice = Math.max(...products.map((item) => +item.price));
    const minPrice = Math.min(...products.map((item) => +item.price));
    dispatch(setPrice({ maxPrice, minPrice }));
    dispatch(setCategory(categoryState));
  };

  useEffect(() => {
    if (bannerImages.length === 0) {
      const fetchData = async () => {
        const res = await axios.get("/api/v1/products");
        const products = await res.data.data.products;
        getBannerImages(products);
        getRandomThreeProducts(products);
        // For Products page
        dispatch(setProducts(products));
        getProductsPageDetails(products);
      };
      fetchData();
    }

    // Scroll to top
    window.scrollTo(0, 0);
    // eslint-disable-next-line
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
