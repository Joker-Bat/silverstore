import React from "react";

// Styles
import classes from "./Cart.module.scss";
// Components
import CartItem from "./CartItem/CartItem";

// Redux Toolkit
import { useSelector } from "react-redux";

const Cart = () => {
  const { products } = useSelector((state) => state.cart);
  return (
    <div className={classes.Cart}>
      <div className={classes.CartItemsContainer}>
        {products.map((item) => {
          return <CartItem {...item} />;
        })}
      </div>
      <div className={classes.PriceContainer}></div>
    </div>
  );
};

export default Cart;
