import React, { useState } from "react";

// Styles
import classes from "./AddReviewBox.module.scss";

// Components
import SimpleButton from "../../../UI/SimpleButton/SimpleButton";

// HelperFunctions
const getTitleByRating = (value) => {
  switch (+value) {
    case 1:
      return "i hate it";
    case 2:
      return "average one";
    case 3:
      return "not too bad";
    case 4:
      return "i like it";
    case 5:
      return "just awesome";
    default:
      return "your review";
  }
};

const maxReviewLength = 150;

/* 
  Main Component
*/

const AddReview = (props) => {
  // Stars clicked or hover state
  const [currentStar, setCurrentStar] = useState(0);
  const [hoverStar, setHoverStar] = useState(undefined);
  const [fiveStar, setFiveStar] = useState(false);
  // Value handler for review textarea and maximum text value
  const [reviewText, setReviewText] = useState("");
  const [reviewLength, setReviewLength] = useState(maxReviewLength);
  // ReviewTitle base on star
  const [reviewTitle, setReviewTitle] = useState("your review");
  // Get an duplicate array to render 5 stars
  const starsCount = Array(5).fill(0);

  // Clear StateValues
  const clearAllStates = () => {
    setCurrentStar(0);
    setHoverStar(undefined);
    setFiveStar(false);
    setReviewText("");
    setReviewLength(maxReviewLength);
    setReviewTitle("your review");
  };

  // Post an review to localStorage to render
  const postToLocalStorage = () => {
    // If no data there then return
    if (!currentStar || !reviewText) {
      return false;
    }
    // Make details into object
    const currentReview = {
      reviewId: new Date().toLocaleString(),
      id: props.id,
      userName: "testUser",
      stars: currentStar,
      title: reviewTitle,
      description: reviewText,
      daysBefore: new Date(),
    };
    // Current localReviews in localStorage
    const currentLocalReviews = JSON.parse(
      localStorage.getItem("localReviews")
    );
    // If already localReview is there then add to them
    if (currentLocalReviews) {
      currentLocalReviews.push(currentReview);
      localStorage.setItem("localReviews", JSON.stringify(currentLocalReviews));
      props.updateLocalReviews((prev) => prev + 1);
    } else {
      // insert an object into an array
      const allReviews = [currentReview];
      // Set this array to localStorage
      localStorage.setItem("localReviews", JSON.stringify(allReviews));
      props.updateLocalReviews((prev) => prev + 1);
    }

    // Clear All states and close modal
    clearAllStates();
    props.close();
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
      setReviewTitle("your review");
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

  return (
    <div
      className={[
        classes.AddReviewContainer,
        props.isOpen && classes.Active,
      ].join(" ")}
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
              className={starClass.join(" ")}
              onMouseOver={() => starMouseOverHandler(index + 1)}
              onMouseLeave={() => starMouseLeaveHandler()}
              onClick={() => starClickHandler(index + 1)}
            >
              <i className="fas fa-star"></i>
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
        <SimpleButton
          name="post"
          capitalize
          small
          clicked={postToLocalStorage}
        />
      </form>
    </div>
  );
};

export default AddReview;