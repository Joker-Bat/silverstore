import React, { useState } from "react";

// Styles
import classes from "./ProductCounter.module.scss";

const ProductCounter = () => {
  const [count, setCount] = useState(1);

  const increaseCounter = () => {
    setCount((prev) => prev + 1);
  };

  const decreaseCounter = () => {
    setCount((prev) => {
      if (prev > 1) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  };

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
