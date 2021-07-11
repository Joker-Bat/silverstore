import React from "react";
// Components
import Filters from "./Filters/Filters";
import ProductsList from "./ProductsList/ProductsList";
// Styles
import classes from "./Products.module.scss";
// Redux toolkit
import { useDispatch } from "react-redux";
import { toggleFilter } from "../../store/filter/filterSlice";
// Icons
import { FaFilter } from "react-icons/fa";

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
        <FaFilter />
      </button>
    </div>
  );
};

export default Products;
