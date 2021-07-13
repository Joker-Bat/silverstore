import React, { useState } from 'react';
// Styles
import classes from './Reviews.module.scss';
// React Router
import { withRouter } from 'react-router-dom';
// Components
import SimpleButton from '../../UI/SimpleButton/SimpleButton';
import Backdrop from '../../UI/Backdrop/Backdrop';
import AddReviewBox from './AddReviewBox/AddReviewBox';
import SingleReview from './SingleReview/SingleReview';
// Redux toolkit
import { useSelector } from 'react-redux';

/*
  Main Component
*/

const Reviews = (props) => {
  const { authToken } = useSelector((state) => state.auth);
  const { reviews } = useSelector((state) => state.review);

  const { id } = props;
  // Open or close Add Review Container
  const [addReview, setAddReview] = useState(false);

  // Open or close Add Review Container
  const openReviewContainer = () => {
    if (authToken) {
      setAddReview(true);
    } else {
      props.history.push('/login');
    }
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
        {reviews.map((item, index) => {
          return <SingleReview key={item._id} item={item} />;
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

export default withRouter(Reviews);
