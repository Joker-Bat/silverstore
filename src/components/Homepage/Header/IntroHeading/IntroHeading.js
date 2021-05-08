import React from "react";
import Button from "../../../UI/Button/Button";

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
      <Button name="Start shopping" route="/products" small />
    </div>
  );
};

export default IntroHeading;
