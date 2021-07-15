import React, { useState, useEffect } from 'react';
// Styles
import classes from './AddReviewBox.module.scss';
// Axios
import axios from 'axios';
// Helperfunctions
import { updateReviewStructure } from '../../../../utilities/helperFunctions';
// Components
import ButtonWithLoader from '../../../UI/ButtonWithLoader/ButtonWithLoader';
// Icons
import { FaStar } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';
// React Redux
import { useSelector, useDispatch } from 'react-redux';
import { addReview } from '../../../../store/singleProduct/singleProductSlice';
import {
  setErrorMessage,
  removeErrorMessage,
} from '../../../../store/notification/notificationSlice';

// HelperFunctions
const getTitleByRating = (value) => {
  switch (+value) {
    case 1:
      return 'i hate it';
    case 2:
      return 'average one';
    case 3:
      return 'not too bad';
    case 4:
      return 'i like it';
    case 5:
      return 'just awesome';
    default:
      return 'your review';
  }
};

const maxReviewLength = 150;

/*
  Main Component
*/

const AddReview = (props) => {
  const dispatch = useDispatch();
  const { authToken } = useSelector((state) => state.auth);
  // Review post loading
  const [reviewLoading, setReviewLoading] = useState(false);
  // Stars clicked or hover state
  const [currentStar, setCurrentStar] = useState(0);
  const [hoverStar, setHoverStar] = useState(undefined);
  const [fiveStar, setFiveStar] = useState(false);
  // Value handler for review textarea and maximum text value
  const [reviewText, setReviewText] = useState('');
  const [reviewLength, setReviewLength] = useState(maxReviewLength);
  // ReviewTitle base on star
  const [reviewTitle, setReviewTitle] = useState('your review');
  // Get an duplicate array to render 5 stars
  const starsCount = Array(5).fill(0);

  // Clear StateValues
  const clearAllStates = () => {
    setCurrentStar(0);
    setHoverStar(undefined);
    setFiveStar(false);
    setReviewText('');
    setReviewLength(maxReviewLength);
    setReviewTitle('your review');
    setReviewLoading(false);
  };

  // Post an review to localStorage to render
  const addReviewHandler = async () => {
    let timer;
    if (authToken) {
      // If no data there then return
      if (!currentStar || !reviewText) {
        return false;
      }
      // Make details into object
      const currentReview = {
        rating: currentStar,
        reviewTitle: reviewTitle,
        reviewDescription: reviewText,
      };
      try {
        setReviewLoading(true);
        const res = await axios.post(
          `/api/v1/reviews/add/${props.id}`,
          currentReview
        );
        const createdReview = updateReviewStructure([res.data.data.review]);
        dispatch(addReview(createdReview));
        clearAllStates();
        props.close();
      } catch (err) {
        // If error happen show error message
        clearAllStates();
        props.close();
        clearTimeout(timer);
        dispatch(setErrorMessage(err.response.data.error.message));
        timer = setTimeout(() => {
          dispatch(removeErrorMessage());
        }, 3000);
      }
    } else {
      // If not logged in
      clearTimeout(timer);
      dispatch(setErrorMessage('You are not logged in'));
      timer = setTimeout(() => {
        dispatch(removeErrorMessage());
        props.history.push('/login');
      }, 2500);
    }
  };

  // Value handler for review textarea
  const handleReviewText = (e) => {
    const currentValue = e.target.value;
    setReviewText(currentValue);
    setReviewLength((prev) => {
      if (currentValue.length <= maxReviewLength) {
        return maxReviewLength - currentValue.length;
      } else {
        return prev;
      }
    });
  };

  // Stars hover handler (mouseOver and mouseOut)
  const starMouseOverHandler = (value) => {
    setHoverStar(value);
    // Give Review Title based on Rating
    const currentTitle = getTitleByRating(value);
    setReviewTitle(currentTitle);
  };
  const starMouseLeaveHandler = () => {
    setHoverStar(undefined);
    // Remove review title if no star selected
    if (currentStar) {
      const currentTitle = getTitleByRating(currentStar);
      setReviewTitle(currentTitle);
    } else {
      setReviewTitle('your review');
    }
  };
  const starClickHandler = (value) => {
    setCurrentStar(value);
    if (+value === 5) {
      setFiveStar(true);
    } else {
      setFiveStar(false);
    }
  };

  useEffect(() => {
    if (!props.isOpen) {
      clearAllStates();
    }
  }, [props.isOpen]);

  return (
    <div
      className={[
        classes.AddReviewContainer,
        props.isOpen && classes.Active,
      ].join(' ')}
    >
      <div className={classes.StarContainer}>
        {starsCount.map((_, index) => {
          const starClass = [
            classes.Star,
            (currentStar || hoverStar) >= index + 1 && classes.Active,
            fiveStar && classes.FiveStar,
          ];
          return (
            <span
              key={`ReviewStars${index}`}
              className={starClass.join(' ')}
              onMouseOver={() => starMouseOverHandler(index + 1)}
              onMouseLeave={() => starMouseLeaveHandler()}
              onClick={() => starClickHandler(index + 1)}
            >
              <FaStar />
            </span>
          );
        })}
      </div>
      <h1 className={classes.ReviewTitle}>{reviewTitle}</h1>
      <form className={classes.FormContainer}>
        <div className={classes.ReviewInputContainer}>
          <textarea
            cols="30"
            rows="6"
            placeholder="leave your review..."
            maxLength={maxReviewLength}
            value={reviewText}
            onChange={handleReviewText}
          ></textarea>
          <div className={classes.ReviewLength}>
            <p>{reviewLength}</p>
          </div>
        </div>
        <ButtonWithLoader
          name="post"
          clicked={addReviewHandler}
          capitalize
          loading={reviewLoading}
        />
      </form>
    </div>
  );
};

export default withRouter(AddReview);
