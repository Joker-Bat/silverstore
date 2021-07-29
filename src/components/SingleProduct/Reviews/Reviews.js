import React, { useState } from 'react';
// Styles
import classes from './Reviews.module.scss';
// React Router
import { withRouter } from 'react-router-dom';
// Components
import Button from '../../Button/Button';
import Backdrop from '../../UI/Backdrop/Backdrop';
import AddReviewBox from './AddReviewBox/AddReviewBox';
import SingleReview from './SingleReview/SingleReview';
// Redux toolkit
import { useSelector, useDispatch } from 'react-redux';
import {
  setErrorMessage,
  removeErrorMessage,
} from '../../../store/notification/notificationSlice';

/*
  Main Component
*/

const Reviews = (props) => {
  const dispatch = useDispatch();
  const { authToken } = useSelector((state) => state.auth);
  const { reviews, currentProduct } = useSelector(
    (state) => state.singleProduct
  );

  const { id } = currentProduct;
  // Open or close Add Review Container
  const [addReview, setAddReview] = useState(false);

  // Open or close Add Review Container
  const openReviewContainer = () => {
    let timer;
    if (authToken) {
      setAddReview(true);
    } else {
      clearTimeout(timer);
      dispatch(setErrorMessage('You are not logged in'));
      timer = setTimeout(() => {
        dispatch(removeErrorMessage());
        props.history.push('/login');
      }, 2500);
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
        <Button
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
