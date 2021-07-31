import React from 'react';
// Style
import classes from './Loading.module.scss';

/**
 * @returns a Loading Component
 */

const Loading = () => {
  return (
    <div className={classes.Loading}>
      <span className={classes.BallContainer}>
        <span></span>
        <span></span>
        <span></span>
      </span>
    </div>
  );
};

export default Loading;
