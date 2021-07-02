import React from "react";
// Style
import classes from "./Loading.module.scss";
// React Spinners
import SyncLoader from "react-spinners/SyncLoader";

/**
 * @returns a Loading Component
 */

const Loading = () => {
  return (
    <div className={classes.Loading}>
      <SyncLoader />
    </div>
  );
};

export default Loading;
