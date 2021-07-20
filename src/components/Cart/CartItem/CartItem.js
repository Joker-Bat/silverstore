import React, { useState, useCallback } from 'react';
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
import {
  setErrorMessage,
  setSuccessMessage,
  removeErrorMessage,
  removeSuccessMessage,
} from '../../../store/notification/notificationSlice';
import ImageLoader from '../../UI/ImageLoader/ImageLoader';

/*
 * Main Conponent
 */

const CartItem = ({ id, name, image, price, subTotal, slug }) => {
  // Redux toolkit
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.cart);
  const count = products.filter((item) => item.id === id)[0].count;

  const [imageLoading, setImageLoading] = useState(true);

  // After image loaded
  const handleImageLoading = () => {
    setImageLoading(false);
  };

  // Success Message
  const successMessageInCart = useCallback(
    (message) => {
      let timer;
      clearTimeout(timer);
      dispatch(setSuccessMessage(message));
      timer = setTimeout(() => {
        dispatch(removeSuccessMessage());
      }, 2000);
    },
    [dispatch]
  );
  // Error Message
  const errorMessageInCart = useCallback(
    (message) => {
      let timer;
      clearTimeout(timer);
      dispatch(setErrorMessage(message));
      timer = setTimeout(() => {
        dispatch(removeErrorMessage());
      }, 2000);
    },
    [dispatch]
  );

  // Increase or decrease count in Cart
  const increaseCount = async () => {
    try {
      await axios.patch(`/api/v1/carts/increase/${id}`);
      dispatch(increaseProductCount(id));
    } catch (err) {
      errorMessageInCart('Something went wrong with connection');
    }
  };
  const decreaseCount = async () => {
    try {
      if (count > 1) {
        await axios.patch(`/api/v1/carts/decrease/${id}`);
        dispatch(decreaseProductCount(id));
      } else {
        errorMessageInCart('Better remove this product from cart');
      }
    } catch (err) {
      errorMessageInCart('Something went wrong with connection');
    }
  };

  // Remove cart item
  const handleRemoveCartItem = async () => {
    try {
      await axios.delete(`/api/v1/carts/remove/${id}`);
      successMessageInCart('Product removed from cart successfully');
      dispatch(removeCartItem(id));
    } catch (err) {
      errorMessageInCart('Something went wrong with connection');
    }
  };

  return (
    <div className={classes.CartItem}>
      <Link to={`/products/${slug}`} className={classes.CartItemImage}>
        {imageLoading && <ImageLoader />}
        <img
          src={`https://freeestoreapi.herokuapp.com/images/products/${image}`}
          alt={name}
          onLoad={handleImageLoading}
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
