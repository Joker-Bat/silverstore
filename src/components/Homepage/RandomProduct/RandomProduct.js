import React, { useState, useEffect } from "react";

// Axios
import axios from "../../../axios-base";

// Style
import classes from "./RandomProduct.module.scss";

// Components
import Title from "../../UI/Title/Title";
import Product from "../../UI/Product/Product";
import SimpleButton from "../../UI/SimpleButton/SimpleButton";

const RandomProduct = () => {
  const [product, setProduct] = useState("");
  const [searching, setSearching] = useState(false);

  const getRandomProduct = async () => {
    setSearching(true);
    const res = await axios.get("/api/v1/products/random");
    setProduct(res.data.data.product[0]);
    setSearching(false);
  };

  useEffect(() => {
    getRandomProduct();
  }, []);

  return (
    <section className={classes.RandomProduct}>
      <Title name={"dont know where to start"} />
      {product ? (
        <Product
          id={product.id}
          image={`https://freeestoreapi.herokuapp.com/images/products/${product.images[0]}`}
          name={product.name}
          price={product.price}
          searchingAnimation={searching}
        />
      ) : null}
      <SimpleButton
        name={"get random"}
        clicked={getRandomProduct}
        large
        uppercase
      />
    </section>
  );
};

export default RandomProduct;

// const getRandomProduct = () => {

//   let searchTimer;
//   let loadingTimer;
//   setSearching(true);
//   for (let i = 0; i <= 10; i++) {
//     searchTimer = setTimeout(() => {
//       const randomNumberFromList = Math.floor(Math.random() * totalProducts);
//       const currentProduct = data[randomNumberFromList];
//       setProduct(currentProduct);
//     }, i * 100);
//     loadingTimer = setTimeout(() => {
//       setSearching(false);
//     }, 1000);
//   }
//   clearTimeout(searchTimer);
//   clearTimeout(loadingTimer);
// };
