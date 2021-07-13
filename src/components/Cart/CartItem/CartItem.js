import React from 'react';
// Styles
import classes from './CartItem.module.scss';
// Axios
import axios from 'axios';
// Components
import NumberFormat from 'react-number-format';
import DeleteButton from '../../UI/DeleteButton/DeleteButton';
import ProductCounter from '../../UI/ProductCounter/ProductCounter';
// React Router
import { Link } from 'react-router-dom';
// Redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import {
  removeCartItem,
  increaseProductCount,
  decreaseProductCount,
} from '../../../store/cart/cartSlice';

/*
 * Main Conponent
 */

const CartItem = ({ id, name, image, price, subTotal, slug }) => {
  // Redux toolkit
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.cart);
  const count = products.filter((item) => item.id === id)[0].count;

  // Increase or decrease count in Cart
  const increaseCount = async () => {
    try {
      await axios.patch(`/api/v1/carts/increase/${id}`);
      dispatch(increaseProductCount(id));
    } catch (err) {
      console.log(err.response);
    }
  };
  const decreaseCount = async () => {
    try {
      if (count > 1) {
        await axios.patch(`/api/v1/carts/decrease/${id}`);
        dispatch(decreaseProductCount(id));
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  // Remove cart item
  const handleRemoveCartItem = async () => {
    try {
      await axios.delete(`/api/v1/carts/remove/${id}`);
      dispatch(removeCartItem(id));
    } catch (err) {
      console.log(err.response);
    }
  };

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
            displayType={'text'}
            thousandSeparator={true}
            thousandsGroupStyle="lakh"
            prefix={'₹'}
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
              displayType={'text'}
              thousandSeparator={true}
              thousandsGroupStyle="lakh"
              prefix={'₹'}
              value={subTotal}
            />
          </h1>
          <DeleteButton clicked={handleRemoveCartItem} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
