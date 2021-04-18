import React from "react";

// Styles
import classes from "./IntroHeading.module.scss";

const IntroHeading = () => {
  return (
    <div className={classes.IntroHeading}>
      <h1 className={classes.Heading}>
        <span>Silver</span> Store
      </h1>
      <h4 className={classes.SubHeading}>
        Live like a <span>pro</span>
      </h4>
      <button className={classes.StartShopping}>Start shopping</button>
    </div>
  );
};

export default IntroHeading;
