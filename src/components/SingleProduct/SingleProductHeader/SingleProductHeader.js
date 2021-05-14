import React from "react";

// Style
import classes from "./SingleProductHeader.module.scss";

// Components
import SingleProductImage from "./SingleProductImage/SingleProductImage";
import SingleProductDetails from "./SingleProductDetails/SingleProductDetails";

const SingleProductHeader = (props) => {
  return (
    <header className={classes.SingleProductHeader}>
      <SingleProductImage name={props.name} images={props.images} />
      <SingleProductDetails name={props.name} />
    </header>
  );
};

export default SingleProductHeader;
