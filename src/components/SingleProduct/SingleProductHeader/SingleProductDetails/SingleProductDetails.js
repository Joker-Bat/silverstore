import React, { useState } from 'react';
// Styles
import classes from './SingleProductDetails.module.scss';
// React Router
import { withRouter } from 'react-router-dom';
// Components
import NumberFormat from 'react-number-format';
import SimpleButton from '../../../UI/SimpleButton/SimpleButton';
import Stars from './Stars/Stars';
import ProductCounter from '../../../UI/ProductCounter/ProductCounter';
//Redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../../../../store/cart/cartSlice';
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
        await axios.post('/api/v1/carts/add', {
          productId: currentProduct.id,
          count,
        });
        dispatch(addCartItem(currentProductState));
        setCount(1);
      } catch (err) {
        console.log('Error', err.response);
      }
    } else {
      props.history.push('/login');
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
        <SimpleButton large name="add to cart" uppercase clicked={addToCart} />
      </div>
    </div>
  );
};

export default withRouter(SingleProductDetails);
