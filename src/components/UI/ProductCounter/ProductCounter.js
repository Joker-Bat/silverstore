import React from "react";
// Styles
import classes from "./ProductCounter.module.scss";
// Icons
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const ProductCounter = ({ count, increaseCounter, decreaseCounter }) => {
  return (
    <div className={classes.CounterContainer}>
      <button onClick={decreaseCounter}>
        <FaMinus />
      </button>
      <h1 className={classes.Count}>{count}</h1>
      <button onClick={increaseCounter}>
        <FaPlus />
      </button>
    </div>
  );
};

export default ProductCounter;
