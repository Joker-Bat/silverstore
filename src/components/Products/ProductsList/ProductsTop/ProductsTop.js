import React from "react";

// Styles
import classes from "./ProductsTop.module.scss";

// React Toolkit
// Get Product Count

import { useSelector } from "react-redux";

/*
Main Component
*/
const ProductsTop = () => {
  const { products } = useSelector((state) => state.products);

  return (
    <div className={classes.ProductsTop}>
      <h1 className={classes.ProductsCount}>
        <span className={classes.Count}>{products.length}</span>
        Product{products.length > 1 ? "s " : ""}
        Found
      </h1>
      <hr />
      <div className={classes.ButtonContainer}>
        <button>
          <i className="fas fa-list"></i>
          <span>list view</span>
        </button>
        <button className={classes.Active}>
          <i className="fas fa-th"></i>
          <span>grid view</span>
        </button>
      </div>
    </div>
  );
};

export default ProductsTop;
