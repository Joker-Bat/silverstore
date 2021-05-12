import React from "react";

// NumberFormat
import NumberFormat from "react-number-format";

// Style
import classes from "./Product.module.scss";

const Product = ({ name, image, price, searchingAnimation, id }) => {
  const truncateWord = (word) => {
    return word.length > 18 ? word.substring(0, 15) + "..." : word;
  };

  return (
    <div className={classes.Product}>
      <div className={classes.ImageContainer}>
        <img src={image} alt={name} />
      </div>
      <div className={classes.ProductDetails}>
        <h1>{truncateWord(name)}</h1>
        <h3>
          <NumberFormat
            displayType={"text"}
            thousandSeparator={true}
            thousandsGroupStyle="lakh"
            prefix={"₹"}
            value={price}
          />
        </h3>
      </div>
      {searchingAnimation && (
        <div className={classes.SearchingAnimation}>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default Product;
