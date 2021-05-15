import React from "react";

// Styles
import classes from "./Stars.module.scss";

const Stars = ({averageRating}) => {
  return (
    <div className={classes.Rating}>
      {Array(5)
        .fill(0)
        .map((item, index) => {
          const starClass = [
            classes.Star,
            index + 1 <= averageRating && classes.Active,
          ];
          return (
            <span key={`Rating${item}${index}`} className={starClass.join(" ")}>
              <i className="fas fa-star"></i>
            </span>
          );
        })}
    </div>
  );
};

export default Stars;
