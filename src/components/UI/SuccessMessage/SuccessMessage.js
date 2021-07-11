import React from "react";
// Styles
import classes from "./SuccessMessage.module.scss";

const SuccessMessage = ({ message }) => {
  return (
    <div className={classes.SuccessMessage}>
      <p>{message}</p>
    </div>
  );
};

export default SuccessMessage;
