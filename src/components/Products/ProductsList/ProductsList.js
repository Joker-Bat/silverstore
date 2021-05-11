import React, { useEffect } from "react";
// Styles
import classes from "./ProductsList.module.scss";
// Data
import data from "../../../data/data";
// Component
import Product from "../../UI/Product/Product";
// Redux toolkit
import { useSelector, useDispatch } from "react-redux";

// Helper function
import {
  getFilteredProductsByCategory,
  getFilteredProductsByCompany,
} from "./model/getFilteredProducts";
import { updateProducts } from "../../../store/products/productsSlice";

const ProductsList = () => {
  // Redux toolkit
  const { categorys, companys } = useSelector((state) => state.filter);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

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
