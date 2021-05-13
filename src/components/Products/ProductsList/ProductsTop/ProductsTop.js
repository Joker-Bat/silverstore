import React, { useEffect } from "react";

// Styles
import classes from "./ProductsTop.module.scss";

// React Toolkit
import {
  setListView,
  removeListView,
} from "../../../../store/filter/filterSlice";
// Get Product Count
import { useSelector, useDispatch } from "react-redux";

/*
Main Component
*/
const ProductsTop = () => {
  // Redux toolkit
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { listView } = useSelector((state) => state.filter);

  // useEffect
  useEffect(() => {
    const isListView = localStorage.getItem("listView");
    if (isListView === "true") {
      dispatch(setListView());
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className={classes.ProductsTop}>
      <h1 className={classes.ProductsCount}>
        <span className={classes.Count}>{products.length}</span>
        Product{products.length > 1 ? "s " : " "}
        Found
      </h1>
      <hr />
      <div className={classes.ButtonContainer}>
        <button
          className={listView ? classes.Active : ""}
          onClick={() => {
            localStorage.setItem("listView", true);
            dispatch(setListView());
          }}
        >
          <i className="fas fa-list"></i>
          <span>list view</span>
        </button>
        <button
          className={listView ? "" : classes.Active}
          onClick={() => {
            localStorage.setItem("listView", false);
            dispatch(removeListView());
          }}
        >
          <i className="fas fa-th"></i>
          <span>grid view</span>
        </button>
      </div>
    </div>
  );
};

export default ProductsTop;
