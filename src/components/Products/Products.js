import React from "react";

// Components
import Filters from "./Filters/Filters";
import ProductsList from "./ProductsList/ProductsList";

// Styles
import classes from "./Products.module.scss";

const Products = (props) => {
  return (
    <div className={classes.Products}>
      <Filters />
      <ProductsList />
    </div>
  );
};

export default Products;
