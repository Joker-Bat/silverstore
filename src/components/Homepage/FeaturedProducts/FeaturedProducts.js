import React from 'react';
// Style
import classes from './FeaturedProducts.module.scss';
// Components
import Title from '../../UI/Title/Title';
import Product from '../../UI/Product/Product';
import Button from '../../Button/Button';
// React Redux
import { useSelector } from 'react-redux';
import { getImageUrl } from '../../../utilities/helperFunctions';

const FeaturedProducts = () => {
  const skeletonFillup = Array(3).fill(0);
  const { featuredProducts } = useSelector((state) => state.products);

  return (
    <section className={classes.FeaturedProducts}>
      <Title name="featured products" />
      <div className={classes.ProductsContainer}>
        {/* Before loading images */}
        {featuredProducts.length === 0
          ? skeletonFillup.map((_, index) => {
              return <Product key={'SkeletonFillUp' + index} skeleton />;
            })
          : featuredProducts.map((item) => {
              return (
                <Product
                  key={'FeaturedProduct' + item.id}
                  id={item.slug}
                  image={getImageUrl(`/images/products/${item.images[0]}`)}
                  name={item.name}
                  price={item.price}
                />
              );
            })}
      </div>

      <Button name="all products" route="/products" large uppercase shine />
    </section>
  );
};

export default FeaturedProducts;
