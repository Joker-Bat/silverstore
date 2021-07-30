import React, { useState, useCallback } from 'react';
import axios from 'axios';
// Styles
import classes from './PriceCard.module.scss';
// Components
import NumberFormat from 'react-number-format';
import Button from '../../Button/Button';
// React redux
import { useDispatch } from 'react-redux';
import { removeAllCartItem } from '../../../store/cart/cartSlice';
import {
  setSuccessMessage,
  removeSuccessMessage,
  setErrorMessage,
  removeErrorMessage,
} from '../../../store/notification/notificationSlice';

/*
Main Component
*/

const PriceCard = ({ totalPrice, totalProducts }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

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

  const checkoutCart = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await axios.delete('/api/v1/carts/checkout');
      successMessageInCart(res.data.message);
      setLoading(false);
      dispatch(removeAllCartItem());
    } catch (err) {
      setLoading(false);
      errorMessageInCart('Something went wrong');
    }
  };

  return (
    <div className={classes.PriceCard}>
      <div className={classes.TotalProducts}>
        <p>no of products:</p>
        <p className={classes.Count}>{totalProducts}</p>
      </div>
      <div className={classes.TotalPrice}>
        <p>total price:</p>
        <p className={classes.Price}>
          <NumberFormat
            value={totalPrice}
            displayType={'text'}
            prefix={'₹'}
            thousandSeparator={true}
            thousandsGroupStyle="lakh"
          />
        </p>
      </div>
      <Button
        name="continue"
        clicked={checkoutCart}
        loading={loading}
        uppercase
        large
        shine
        fixedWidth
      />
    </div>
  );
};

export default PriceCard;
