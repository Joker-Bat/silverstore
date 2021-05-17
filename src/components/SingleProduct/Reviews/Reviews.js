import React, { useState } from "react";

// Styles
import classes from "./Reviews.module.scss";

// Components
import SimpleButton from "../../UI/SimpleButton/SimpleButton";
import Backdrop from "../../UI/Backdrop/Backdrop";
import AddReviewBox from "./AddReviewBox/AddReviewBox";
import SingleReview from "./SingleReview/SingleReview";

/*
  Main Component
*/

const Reviews = ({ ratings, id }) => {
  // Open or close Add Review Container
  const [addReview, setAddReview] = useState(false);

  // Open or close Add Review Container
  const openReviewContainer = () => {
    setAddReview(true);
  };
  const closeReviewContainer = () => {
    setAddReview(false);
  };

  return (
    <div className={classes.Reviews}>
      {/* Title */}
      <h1 className={classes.Heading}>Reviews</h1>
      {/* List of Reviews */}
      <div className={classes.ReviewsContainer}>
        {ratings.map((item, index) => {
          return <SingleReview key={`ReviewsSection${index}`} item={item} />;
        })}
      </div>
      {/* To add a review to list */}
      <div className={classes.AddReview}>
        <Backdrop isOpen={addReview} close={closeReviewContainer} />
        <SimpleButton
          name="Add your review"
          small
          capitalize
          clicked={openReviewContainer}
        />
        <AddReviewBox id={id} isOpen={addReview} close={closeReviewContainer} />
      </div>
    </div>
  );
};

export default Reviews;
