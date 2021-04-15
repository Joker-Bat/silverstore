import React from "react";

// Styles
import classes from "./Title.module.scss";

const Title = (props) => {
  return (
    <div className={classes.Title}>
      <h1>{props.name}</h1>
      <div className={classes.Underline}></div>
    </div>
  );
};

export default Title;
