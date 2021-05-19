import React, { useState } from "react";

// Styles
import classes from "./SingleProductDetails.module.scss";

// Components
import NumberFormat from "react-number-format";
import Button from "../../../UI/Button/Button";
import Stars from "./Stars/Stars";
import ProductCounter from "../../../UI/ProductCounter/ProductCounter";

//Redux toolkit
import { useDispatch } from "react-redux";
import { addCartItem } from "../../../../store/cart/cartSlice";

/*
Main Component
*/

const SingleProductDetails = (props) => {
  // Redux toolkit
  const dispatch = useDispatch();
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

  const noOfRatings = props.ratings.length;
  const averageRating =
    props.ratings
      .map((item) => item.stars)
      .reduce((acc, cur) => {
        return (acc += cur);
      }, 0) / noOfRatings;

  const discountPercentage = Math.round(
    ((props.realPrice - props.price) / props.realPrice) * 100
  );

  // Add products to cart
  const addToCart = () => {
    const currentProductState = { id: props.id, count };
    dispatch(addCartItem(currentProductState));
  };

  return (
    <div className={classes.SingleProductDetails}>
      {/* Product Title */}
      <h1 className={classes.SingleProductTitle}>{props.name}</h1>
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
              displayType={"text"}
              thousandSeparator={true}
              thousandsGroupStyle={"lakh"}
              prefix={"₹"}
              value={props.price}
            />
          </h1>
        </div>
        <div className={classes.RealPrice}>
          <p>
            <NumberFormat
              displayType={"text"}
              thousandSeparator={true}
              thousandsGroupStyle={"lakh"}
              prefix={"₹"}
              value={props.realPrice}
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
          <p>{props.type}</p>
        </div>
        <div className={classes.Brand}>
          <h1>Brand :</h1>
          <p>{props.brand}</p>
        </div>
      </div>
      {/* Counter for product */}
      <ProductCounter
        count={count}
        increaseCounter={increaseCounter}
        decreaseCounter={decreaseCounter}
      />
      {/* Add to cart button */}
      <div className={classes.AddToCartBtn}>
        <Button
          large
          name="add to cart"
          uppercase
          clicked={addToCart}
          route="/cart"
        />
      </div>
    </div>
  );
};

export default SingleProductDetails;
