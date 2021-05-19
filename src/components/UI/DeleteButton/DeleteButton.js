import React from "react";

// Styles
import classes from "./DeleteButton.module.scss";

const DeleteButton = ({ clicked }) => {
  return (
    <button className={classes.DeleteButton} onClick={clicked}>
      <i className="fas fa-trash"></i>
    </button>
  );
};

export default DeleteButton;
