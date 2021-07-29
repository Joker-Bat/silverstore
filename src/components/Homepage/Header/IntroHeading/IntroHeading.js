import React from 'react';
// Styles
import classes from './IntroHeading.module.scss';
// Components
import Button from '../../../Button/Button';

const IntroHeading = () => {
  return (
    <div className={classes.IntroHeading}>
      <h1 className={classes.Heading}>
        <span>Silver</span> Store
      </h1>
      <h4 className={classes.SubHeading}>
        Live like a <span>pro</span>
      </h4>
      <Button name="Start shopping" route="/products" capitalize small shine />
    </div>
  );
};

export default IntroHeading;
