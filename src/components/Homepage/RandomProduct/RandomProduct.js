import React from "react";

// Data
import data from "../../../data/data";

// Style
import classes from "./RandomProduct.module.scss";

// Components
import Title from "../../UI/Title/Title";
import Product from "../../UI/Product/Product";
import Button from "../../UI/Button/Button";

const RandomProduct = () => {
  return (
    <section className={classes.RandomProduct}>
      <Title name={"dont know where to start"} />
      <Product image={data[19].images[0]} name={data[0].name} />
      <Button name={"get random"} large uppercase />
    </section>
  );
};

export default RandomProduct;
