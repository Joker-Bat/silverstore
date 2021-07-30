import React from 'react';
// Styles
import classes from './EmptyCart.module.scss';
// Components
import Button from '../../Button/Button';

const EmptyCart = () => {
  return (
    <section className={classes.EmptyCart}>
      <h1>Your cart is empty</h1>
      <Button name="start shoping" capitalize large route="/products" shine />
    </section>
  );
};

export default EmptyCart;
