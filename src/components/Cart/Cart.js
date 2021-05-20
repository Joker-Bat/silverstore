import React from "react";

// Styles
import classes from "./Cart.module.scss";
// Components
import CartItem from "./CartItem/CartItem";
import PriceCard from "./PriceCard/PriceCard";
import EmptyCart from "./EmptyCart/EmptyCart";

// Redux Toolkit
import { useSelector } from "react-redux";

const Cart = () => {
  const { products } = useSelector((state) => state.cart);

  const totalPrice = products.reduce((acc, item) => {
    return (acc += item.subTotal);
  }, 0);

  const totalProducts = products.reduce((acc, item) => {
    return (acc += item.count);
  }, 0);

  const Component = (
    <div className={classes.Cart}>
      <div className={classes.CartItemsContainer}>
        {products.map((item, index) => {
          return <CartItem key={`CartItem${index}`} {...item} />;
        })}
      </div>
      <div className={classes.PriceContainer}>
        <PriceCard totalPrice={totalPrice} totalProducts={totalProducts} />
      </div>
    </div>
  );

  return products.length !== 0 ? Component : <EmptyCart />;
};

export default Cart;
