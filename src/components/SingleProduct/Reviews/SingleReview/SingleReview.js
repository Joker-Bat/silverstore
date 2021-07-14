import React from 'react';
// Styles
import classes from './SingleReview.module.scss';
// Icons
import { FaStar } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';

const SingleReview = ({ item }) => {
  return (
    <div className={classes.Review}>
      <div className={classes.UserIcon}>
        {item.userPhoto ? (
          <img src={`/images/users/${item.userPhoto}`} alt={item.userName} />
        ) : (
          <FaUser />
        )}
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
              <FaStar />
            </p>
          </div>
        </div>
        <h3 className={classes.UserTitle}>{item.title}</h3>
        <p className={classes.UserReview}>{item.description}</p>
      </div>
    </div>
  );
};

export default SingleReview;
