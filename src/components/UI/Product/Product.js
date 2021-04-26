import React from "react";

// Style
import classes from "./Product.module.scss";

const Product = (props) => {
  return (
    <div className={classes.Product}>
      <img src={props.image} alt={props.name} />
      <h1>{props.name}</h1>
      {props.searchingAnimation && (
        <div className={classes.SearchingAnimation}>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default Product;
