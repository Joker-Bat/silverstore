import React, { useState, useCallback } from 'react';
// Styles
import classes from './SingleProductDetails.module.scss';
// React Router
import { withRouter } from 'react-router-dom';
// Components
import NumberFormat from 'react-number-format';
import Stars from './Stars/Stars';
import ProductCounter from '../../../UI/ProductCounter/ProductCounter';
import ButtonWithLoader from '../../../UI/ButtonWithLoader/ButtonWithLoader';
//Redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../../../../store/cart/cartSlice';
import {
  setErrorMessage,
  removeErrorMessage,
  setSuccessMessage,
  removeSuccessMessage,
} from '../../../../store/notification/notificationSlice';
// Axios
import axios from 'axios';

/*
Main Component
*/

const SingleProductDetails = (props) => {
  // Redux toolkit
  const dispatch = useDispatch();
  const { currentProduct } = useSelector((state) => state.singleProduct);
  const { authToken } = useSelector((state) => state.auth);
  // Counter for a product
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);

  // Success Message
  const successMessageInProduct = useCallback(
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
  const errorMessageInProduct = useCallback(
    (message, path) => {
      let timer;
      clearTimeout(timer);
      dispatch(setErrorMessage(message));
      timer = setTimeout(() => {
        dispatch(removeErrorMessage());
        props.history.push(path);
      }, 2000);
    },
    [dispatch, props.history]
  );

  const increaseCounter = () => {
    setCount((prev) => prev + 1);
  };

  const decreaseCounter = () => {
    setCount((prev) => {
      if (prev > 1) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  };

  const noOfRatings = currentProduct.ratings.length;
  const averageRating =
    currentProduct.ratings
      .map((item) => item.stars)
      .reduce((acc, cur) => {
        return (acc += cur);
      }, 0) / noOfRatings;

  const discountPercentage = Math.round(
    ((currentProduct.realPrice - currentProduct.price) /
      currentProduct.realPrice) *
      100
  );

  // Add products to cart
  const addToCart = async () => {
    if (authToken) {
      const currentProductState = { id: currentProduct.id, count };
      try {
        setLoading(true);
        await axios.post('/api/v1/carts/add', {
          productId: currentProduct.id,
          count,
        });
        dispatch(addCartItem(currentProductState));
        setLoading(false);
        // Below lines for showing message to user
        successMessageInProduct('Cart added successfully');
        // Reset count in product page
        setCount(1);
      } catch (err) {
        setLoading(false);
        // For message
        errorMessageInProduct('Something went wrong with connection');
      }
    } else {
      // For message and redirect
      errorMessageInProduct('Something went wrong with connection', '/login');
    }
  };

  return (
    <div className={classes.SingleProductDetails}>
      {/* Product Title */}
      <h1 className={classes.SingleProductTitle}>{currentProduct.name}</h1>
      {/* Rating and no of Reviews */}
      <div className={classes.RatingContainer}>
        <Stars averageRating={averageRating} />
        <div className={classes.RatingCount}>
          <p>({noOfRatings} Ratings)</p>
        </div>
      </div>
      {/* Price and Realprice and Discount percentage */}
      <div className={classes.PriceContainer}>
        <div className={classes.CurrentPrice}>
          <h1>
            <NumberFormat
              displayType={'text'}
              thousandSeparator={true}
              thousandsGroupStyle={'lakh'}
              prefix={'₹'}
              value={currentProduct.price}
            />
          </h1>
        </div>
        <div className={classes.RealPrice}>
          <p>
            <NumberFormat
              displayType={'text'}
              thousandSeparator={true}
              thousandsGroupStyle={'lakh'}
              prefix={'₹'}
              value={currentProduct.realPrice}
            />
          </p>
        </div>
        <div className={classes.PercentageDiscount}>
          <p>{discountPercentage}% off</p>
        </div>
      </div>

      {/* Available and Brand of Product */}
      <div className={classes.ExtraDetailsContainer}>
        <div className={classes.Available}>
          <h1>Available :</h1>
          <p>in stock</p>
        </div>
        <div className={classes.Type}>
          <h1>Type :</h1>
          <p>{currentProduct.type}</p>
        </div>
        <div className={classes.Brand}>
          <h1>Brand :</h1>
          <p>{currentProduct.brand}</p>
        </div>
      </div>
      {/* Counter for product */}
      <div className={classes.ProductCounterContainer}>
        <ProductCounter
          count={count}
          increaseCounter={increaseCounter}
          decreaseCounter={decreaseCounter}
        />
      </div>

      {/* Add to cart button */}
      <div className={classes.AddToCartBtn}>
        <ButtonWithLoader
          name="add to cart"
          uppercase
          clicked={addToCart}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default withRouter(SingleProductDetails);
