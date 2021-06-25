import React, { useEffect } from "react";

// axios
import axios from "../../axios-base";

// Helper function
import { arrayToObjectState } from "../../utilities/helperFunctions";

// components
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import Products from "../../components/Products/Products";

// Redux toolkit
import { useDispatch, useSelector } from "react-redux";
import {
  resetFilter,
  setPrice,
  setCategory,
} from "../../store/filter/filterSlice";
import { resetProducts, setProducts } from "../../store/products/productsSlice";

const ProductsPage = () => {
  const dispatch = useDispatch();

  const { productRef } = useSelector((state) => state.products);

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

  // Make a request if its not done in homepage
  useEffect(() => {
    if (Object.keys(productRef).length === 0) {
      const fetchData = async () => {
        const res = await axios.get("/api/v1/products");
        const products = await res.data.data.products;
        // Set Products
        dispatch(setProducts(products));
        getProductsPageDetails(products);
      };

      fetchData();
    }

    // eslint-disable-next-line
  }, []);

  // Reseting stuff
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(resetFilter());
    dispatch(resetProducts());
    //eslint-disable-next-line
  }, []);

  return (
    <section>
      <BreadCrumb title="products" />
      <Products />
    </section>
  );
};

export default ProductsPage;
