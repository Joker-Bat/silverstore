import React, { useState, useEffect } from "react";

// data
import data from "../../../data/data";

// Style
import classes from "./FeaturedProducts.module.scss";

// Components
import Title from "../../UI/Title/Title";
import Product from "../../UI/Product/Product";
import Button from "../../UI/Button/Button";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  const getListOfProducts = () => {
    const listOfProducts = [];
    data.forEach((item) => {
      item.name === "Infinix Zero 8i" && listOfProducts.push(item);
      item.name === "SAMSUNG Galaxy M30" && listOfProducts.push(item);
      item.name === "APPLE MacBook Air" && listOfProducts.push(item);
    });
    setProducts(listOfProducts);
  };

  useEffect(() => {
    getListOfProducts();
    //eslint-disable-next-line
  }, []);

  return (
    <section className={classes.FeaturedProducts}>
      <Title name="featured products" />
      <div className={classes.ProductsContainer}>
        {products.map((item) => {
          return (
            <Product
              key={"FeaturedProduct" + item.id}
              image={item.images[0]}
              name={item.name}
              price={item.price}
            />
          );
        })}
      </div>
      <Button name="all products" route="/products" large uppercase />
    </section>
  );
};

export default FeaturedProducts;
