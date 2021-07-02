import React from "react";
// Style
import classes from "./Loading.module.scss";
// React Spinners
import PacmanLoader from "react-spinners/PacmanLoader";

/**
 *
 * @returns a Loading Component
 */

const Loading = () => {
  return (
    <div className={classes.Loading}>
      <PacmanLoader />
    </div>
  );
};

export default Loading;
