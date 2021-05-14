import React from "react";

// Styles
import classes from "./SingleProductDetails.module.scss";

// Components
import NumberFormat from "react-number-format";

const SingleProductDetails = (props) => {
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

  return (
    <div className={classes.SingleProductDetails}>
      <h1 className={classes.SingleProductTitle}>{props.name}</h1>
      <div className={classes.RatingContainer}>
        <div className={classes.Rating}>
          {Array(5)
            .fill(0)
            .map((item, index) => {
              const starClass = [
                classes.Star,
                index + 1 <= averageRating && classes.Active,
              ];
              return (
                <span
                  key={`Rating${item}${index}`}
                  className={starClass.join(" ")}
                >
                  <i className="fas fa-star"></i>
                </span>
              );
            })}
        </div>
        <div className={classes.RatingCount}>
          <p>({noOfRatings} Ratings)</p>
        </div>
      </div>

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
    </div>
  );
};

export default SingleProductDetails;
