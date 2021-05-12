import React, { useEffect } from "react";
// Styles
import classes from "./ProductsList.module.scss";
// Data
import data from "../../../data/data";
// Component
import ProductsTop from "./ProductsTop/ProductsTop";
import Product from "../../UI/Product/Product";
// Redux toolkit
import { useSelector, useDispatch } from "react-redux";

// Helper function
import { getFilteredProductsByChoices } from "./model/getFilteredProducts";
import { updateProducts } from "../../../store/products/productsSlice";

const ProductsList = () => {
  // Redux toolkit
  const { categorys, companys, price } = useSelector((state) => state.filter);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  // UseEffect
  useEffect(() => {
    const filteredProductsByPrice = getFilteredProductsByChoices(
      categorys,
      companys,
      price,
      data
    );
    dispatch(updateProducts(filteredProductsByPrice));

    // eslint-disable-next-line
  }, [categorys, companys, price]);

  // Return
  return (
    <div className={classes.ProductsContainer}>
      <ProductsTop />
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
    </div>
  );
};

export default ProductsList;
