import React from "react";

// Styles
import classes from "./Backdrop.module.scss";

const Backdrop = (props) => {
  const backdropClasses = [classes.Backdrop];

  if (props.isOpen) {
    backdropClasses.push(classes.Active);
  }

  return (
    <div className={backdropClasses.join(" ")} onClick={props.close}></div>
  );
};

export default Backdrop;
