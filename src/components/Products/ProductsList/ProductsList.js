import React from "react";

// Styles
import classes from "./ProductsList.module.scss";

// Data
import data from "../../../data/data";

// Component
import Product from "../../UI/Product/Product";

const ProductsList = () => {
  return (
    <div className={classes.ProductsList}>
      {data.map((item) => {
        return (
          <Product
            key={"ProductsList" + item.id}
            name={item.name}
            image={item.images[0]}
            price={item.price}
          />
        );
      })}
    </div>
  );
};

export default ProductsList;
