import React from 'react';
// Styles
import classes from './Stars.module.scss';
// Icons
import { FaStar } from 'react-icons/fa';

const Stars = ({ averageRating }) => {
  return (
    <div className={classes.Rating}>
      {Array(5)
        .fill(0)
        .map((item, index) => {
          const starClass = [
            classes.Star,
            index + 1 <= Math.ceil(averageRating) && classes.Active,
          ];
          return (
            <span key={`Rating${item}${index}`} className={starClass.join(' ')}>
              <FaStar />
            </span>
          );
        })}
    </div>
  );
};

export default Stars;
