import React from "react";

// Styles
import classes from "./EmptyCart.module.scss";

// Components
import Button from "../../UI/Button/Button";

const EmptyCart = () => {
  return (
    <section className={classes.EmptyCart}>
      <h1>Your cart is empty</h1>
      <Button name="start shoping" capitalize large route="/products" />
    </section>
  );
};

export default EmptyCart;
