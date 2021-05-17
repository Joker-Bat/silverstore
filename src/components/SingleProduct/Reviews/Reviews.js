import React, { useState } from "react";

// Styles
import classes from "./Reviews.module.scss";

// Components
import SimpleButton from "../../UI/SimpleButton/SimpleButton";
import Backdrop from "../../UI/Backdrop/Backdrop";

// HelperFunction
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

const Reviews = ({ ratings }) => {
  // Open or close Add Review Container
  const [addReview, setAddReview] = useState(false);
  // Value handler for review textarea and maximum text value
  const [reviewText, setReviewText] = useState("");
  const [reviewLength, setReviewLength] = useState(maxReviewLength);

  // Stars clicked or hover state
  const [currentStar, setCurrentStar] = useState(0);
  const [hoverStar, setHoverStar] = useState(undefined);
  const [fiveStar, setFiveStar] = useState(false);
  // ReviewTitle base on star
  const [reviewTitle, setReviewTitle] = useState("your review");
  // Get an duplicate array to render 5 stars
  const starsCount = Array(5).fill(0);

  // Open or close Add Review Container
  const openReviewContainer = () => {
    setAddReview(true);
  };
  const closeReviewContainer = (e) => {
    e.preventDefault();
    setAddReview(false);
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
              clicked={closeReviewContainer}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
