import React, { useEffect, useCallback } from "react";
// Styles
import classes from "./ProductsList.module.scss";
// Data
import data from "../../../data/data";
// Component
import Product from "../../UI/Product/Product";
// Redux toolkit
import { useSelector, useDispatch } from "react-redux";

// Helper function
// import { getFilteredProductsByCategory } from "./filteredProducts";
import { updateProducts } from "../../../store/products/productsSlice";

const ProductsList = () => {
  // Redux toolkit
  const { categorys, companys } = useSelector((state) => state.filter);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  // Functions
  const getFilteredProductsByCategory = useCallback((categorys, data) => {
    const selectedCategorys = Object.keys(categorys)
      .map((item) => {
        return categorys[item] ? item : undefined;
      })
      .filter((item) => item !== undefined);
    if (selectedCategorys.length === 0) {
      return data;
    }
    const filteredProducts = data.filter((item) => {
      return selectedCategorys.includes(item.type);
    });
    return filteredProducts;
  }, []);

  const getFilteredProductsByCompany = useCallback(
    (categorys, companys, data) => {
      const selectedCompanys = Object.keys(companys)
        .map((item) => {
          return companys[item] ? item : undefined;
        })
        .filter((item) => item !== undefined);

      const selectedCategorys = Object.keys(categorys)
        .map((item) => {
          return categorys[item] ? item : undefined;
        })
        .filter((item) => item !== undefined);
      if (companys.length === 0) {
        return data;
      }
      const filteredProducts = data.filter((item) => {
        return (
          selectedCompanys.includes(item.brand) &&
          selectedCategorys?.includes(item.type)
        );
      });
      return filteredProducts;
    },
    []
  );

  // UseEffect
  useEffect(() => {
    const filteredProductsByCategory = getFilteredProductsByCategory(
      categorys,
      data
    );
    dispatch(updateProducts(filteredProductsByCategory));
    const filteredProductsByCompany = getFilteredProductsByCompany(
      categorys,
      companys,
      data
    );

    if (filteredProductsByCompany.length !== 0) {
      dispatch(updateProducts(filteredProductsByCompany));
    }

    // eslint-disable-next-line
  }, [categorys, companys]);

  // Return
  return (
    <div className={classes.ProductsList}>
      {products.map((item) => {
        return (
          <Product
            key={"ProductsList" + item.id}
            name={item.name}
            image={item.images[0]}
            price={item.price}
          />
        );
      })}
    </div>
  );
};

export default ProductsList;
