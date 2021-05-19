import React from "react";

// Styles
import classes from "./Cart.module.scss";
// Components
import CartItem from "./CartItem/CartItem";
import PriceCard from "./PriceCard/PriceCard";

// Redux Toolkit
import { useSelector } from "react-redux";

const Cart = () => {
  const { products } = useSelector((state) => state.cart);
  return (
    <div className={classes.Cart}>
      <div className={classes.CartItemsContainer}>
        {products.map((item, index) => {
          return <CartItem key={`CartItem${index}`} {...item} />;
        })}
      </div>
      <div className={classes.PriceContainer}>
        <PriceCard />
      </div>
    </div>
  );
};

export default Cart;
