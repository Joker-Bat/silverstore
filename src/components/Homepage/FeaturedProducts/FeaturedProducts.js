import React from "react";

// Style
import classes from "./FeaturedProducts.module.scss";

// Components
import Title from "../../UI/Title/Title";
import Product from "../../UI/Product/Product";
import Button from "../../UI/Button/Button";

const FeaturedProducts = ({ featuredProducts }) => {
  return (
    <section className={classes.FeaturedProducts}>
      <Title name="featured products" />
      <div className={classes.ProductsContainer}>
        {featuredProducts.map((item) => {
          return (
            <Product
              key={"FeaturedProduct" + item.id}
              id={item.id}
              image={`https://freeestoreapi.herokuapp.com/images/products/${item.images[0]}`}
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
