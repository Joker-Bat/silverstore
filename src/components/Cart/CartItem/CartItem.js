import React from "react";

// Styles
import classes from "./CartItem.module.scss";

// Components
import NumberFormat from "react-number-format";
import DeleteButton from "../../UI/DeleteButton/DeleteButton";
import ProductCounter from "../../UI/ProductCounter/ProductCounter";

// React Router
import { Link } from "react-router-dom";

// Redux toolkit
import { useDispatch, useSelector } from "react-redux";
import {
  removeCartItem,
  increaseProductCount,
  decreaseProductCount,
} from "../../../store/cart/cartSlice";

const CartItem = ({ id, name, image, price, subTotal, slug }) => {
  // Redux toolkit
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.cart);
  const count = products.filter((item) => item.id === id)[0].count;

  // Increase or decrease count in Cart
  const increaseCount = () => dispatch(increaseProductCount(id));
  const decreaseCount = () => dispatch(decreaseProductCount(id));

  return (
    <div className={classes.CartItem}>
      <Link to={`/products/${slug}`} className={classes.CartItemImage}>
        <img
          src={`https://freeestoreapi.herokuapp.com/images/products/${image}`}
          alt={name}
        />
      </Link>
      <div className={classes.CartItemDetails}>
        <h1 className={classes.Title}>{name}</h1>
        <h1 className={classes.Price}>
          <NumberFormat
            displayType={"text"}
            thousandSeparator={true}
            thousandsGroupStyle="lakh"
            prefix={"₹"}
            value={price}
          />
        </h1>

        <div className={classes.CountContainer}>
          <ProductCounter
            count={count}
            increaseCounter={increaseCount}
            decreaseCounter={decreaseCount}
          />
        </div>

        <div className={classes.RemoveItemContainer}>
          <h1 className={classes.SubTotal}>
            <NumberFormat
              displayType={"text"}
              thousandSeparator={true}
              thousandsGroupStyle="lakh"
              prefix={"₹"}
              value={subTotal}
            />
          </h1>
          <DeleteButton clicked={() => dispatch(removeCartItem(id))} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
