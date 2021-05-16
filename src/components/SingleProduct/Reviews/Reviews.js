import React, { useState } from "react";

// Styles
import classes from "./Reviews.module.scss";

// Components
import SimpleButton from "../../UI/SimpleButton/SimpleButton";
import Backdrop from "../../UI/Backdrop/Backdrop";

const Reviews = ({ ratings }) => {
  const [addReview, setAddReview] = useState(false);

  const starsCount = Array(5).fill(0);

  const openReviewContainer = () => {
    setAddReview(true);
  };

  const closeReviewContainer = (e) => {
    e.preventDefault();
    setAddReview(false);
  };

  return (
    <div className={classes.Reviews}>
      {/* Title */}
      <h1 className={classes.Heading}>Reviews</h1>
      {/* List of Reviews */}
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
      <div className={classes.AddReview}>
        <Backdrop isOpen={addReview} close={closeReviewContainer} />
        <SimpleButton
          name="Add your review"
          small
          capitalize
          clicked={openReviewContainer}
        />
        <div
          className={[
            classes.AddReviewContainer,
            addReview && classes.Active,
          ].join(" ")}
        >
          <div className={classes.StarContainer}>
            {starsCount.map((_, index) => {
              return (
                <span key={`ReviewStars${index}`} className={classes.Star}>
                  <i className="fas fa-star"></i>
                </span>
              );
            })}
          </div>
          <h1 className={classes.ReviewTitle}>I like it</h1>
          <form className={classes.FormContainer}>
            <textarea
              cols="30"
              rows="6"
              placeholder="leave your review..."
            ></textarea>
            <SimpleButton
              name="post"
              capitalize
              small
              clicked={closeReviewContainer}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
