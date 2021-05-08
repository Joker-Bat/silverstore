import React, { useState } from "react";

// Data
import data from "../../../data/data";

// Style
import classes from "./RandomProduct.module.scss";

// Components
import Title from "../../UI/Title/Title";
import Product from "../../UI/Product/Product";
import Button from "../../UI/Button/Button";

const RandomProduct = () => {
  const [product, setProduct] = useState(data[8]);
  const [searching, setSearching] = useState(false);
  const totalProducts = data.length;

  const getRandomProduct = () => {
    let searchTimer;
    let loadingTimer;
    setSearching(true);
    for (let i = 0; i <= 10; i++) {
      searchTimer = setTimeout(() => {
        const randomNumberFromList = Math.floor(Math.random() * totalProducts);
        const currentProduct = data[randomNumberFromList];
        setProduct(currentProduct);
      }, i * 100);
      loadingTimer = setTimeout(() => {
        setSearching(false);
      }, 1000);
    }
    clearTimeout(searchTimer);
    clearTimeout(loadingTimer);
  };

  return (
    <section className={classes.RandomProduct}>
      <Title name={"dont know where to start"} />
      <Product
        image={product.images[0]}
        name={product.name}
        price={product.price}
        searchingAnimation={searching}
      />
      <Button name={"get random"} clicked={getRandomProduct} large uppercase />
    </section>
  );
};

export default RandomProduct;
