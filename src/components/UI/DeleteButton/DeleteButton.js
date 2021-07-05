import React from "react";
// Styles
import classes from "./DeleteButton.module.scss";
// Icons
import { FaTrash } from "react-icons/fa";

const DeleteButton = ({ clicked }) => {
  return (
    <button className={classes.DeleteButton} onClick={clicked}>
      <FaTrash />
    </button>
  );
};

export default DeleteButton;
