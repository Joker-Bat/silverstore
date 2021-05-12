import React from "react";

// Components
import Filters from "./Filters/Filters";
import ProductsList from "./ProductsList/ProductsList";

// Styles
import classes from "./Products.module.scss";

// Redux toolkit
import { useDispatch } from "react-redux";
import { toggleFilter } from "../../store/filter/filterSlice";

const Products = (props) => {
  // Redux toolkit
  const dispatch = useDispatch();
  return (
    <div className={classes.Products}>
      <Filters />
      <ProductsList />
      <button
        className={classes.FilterIcon}
        onClick={() => dispatch(toggleFilter())}
      >
        <i className="fas fa-filter"></i>
      </button>
    </div>
  );
};

export default Products;
