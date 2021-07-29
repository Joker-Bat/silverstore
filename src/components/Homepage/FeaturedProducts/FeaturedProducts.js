import React from 'react';
// Style
import classes from './FeaturedProducts.module.scss';
// Components
import Title from '../../UI/Title/Title';
import Product from '../../UI/Product/Product';
import Button from '../../Button/Button';
// React Redux
import { useSelector } from 'react-redux';

const FeaturedProducts = () => {
  const { featuredProducts } = useSelector((state) => state.products);

  return (
    <section className={classes.FeaturedProducts}>
      <Title name="featured products" />
      {featuredProducts.length === 0 ? (
        <h1>Loading</h1>
      ) : (
        <div className={classes.ProductsContainer}>
          {featuredProducts.map((item) => {
            return (
              <Product
                key={'FeaturedProduct' + item.id}
                id={item.slug}
                image={`https://freeestoreapi.herokuapp.com/images/products/${item.images[0]}`}
                name={item.name}
                price={item.price}
              />
            );
          })}
        </div>
      )}

      <Button name="all products" route="/products" large uppercase shine />
    </section>
  );
};

export default FeaturedProducts;
