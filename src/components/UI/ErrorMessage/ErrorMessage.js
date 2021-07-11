import React from "react";
// Styles
import classes from "./ErrorMessage.module.scss";

const ErrorMessage = ({ message }) => {
  return (
    <div className={classes.ErrorMessage}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
