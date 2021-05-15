import React from "react";

// Styles
import classes from "./Reviews.module.scss";

const Reviews = ({ ratings }) => {
  return (
    <div className={classes.Reviews}>
      <h1 className={classes.Heading}>Reviews</h1>
      <div className={classes.ReviewsContainer}>
        {ratings.map((item, index) => {
          return (
            <div key={`ReviewsSection${index}`} className={classes.Review}>
              <div className={classes.UserIcon}>
                <i className="fas fa-user"></i>
              </div>
              <div className={classes.ReviewDetail}>
                <div className={classes.UserDetails}>
                  <div className={classes.UserDetail}>
                    <h1 className={classes.Username}>{item.userName}</h1>
                    <p className={classes.Days}>{item.daysBefore}</p>
                  </div>
                  <div className={classes.UserStar}>
                    <p>
                      <span>{item.stars}</span>
                      <i className="fas fa-star"></i>
                    </p>
                  </div>
                </div>
                <h3 className={classes.UserTitle}>{item.title}</h3>
                <p className={classes.UserReview}>{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reviews;
