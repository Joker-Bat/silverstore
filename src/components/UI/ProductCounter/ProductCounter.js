import React from "react";

// Styles
import classes from "./ProductCounter.module.scss";

const ProductCounter = ({ count, increaseCounter, decreaseCounter }) => {
  return (
    <div className={classes.CounterContainer}>
      <button onClick={decreaseCounter}>
        <i className="fas fa-minus"></i>
      </button>
      <h1 className={classes.Count}>{count}</h1>
      <button onClick={increaseCounter}>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default ProductCounter;
