import React from "react";

// Style
import classes from "./Product.module.scss";
// React Router
import { withRouter } from "react-router-dom";
// NumberFormat
import NumberFormat from "react-number-format";
// HelperFunction
import { truncateWords } from "../../../utilities/helperFunctions";

const Product = ({ name, image, price, searchingAnimation, id, history }) => {
  const handleClick = (curID) => {
    history.push(`/products/${curID}`);
  };

  return (
    <div className={classes.Product} onClick={() => handleClick(id)}>
      <div className={classes.ImageContainer}>
        <img src={image} alt={name} />
      </div>
      <div className={classes.ProductDetails}>
        <h1>{truncateWords(name, 18)}</h1>
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

export default withRouter(Product);
