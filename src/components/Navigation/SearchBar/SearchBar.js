import React from "react";

// Styles
import classes from "./SearchBar.module.scss";

const SearchBar = (props) => {
  const submitHandler = (e) => {
    e.preventDefault();
    props.closeBackdrop();
  };

  return (
    <form className={classes.Form} onSubmit={submitHandler}>
      <input
        type="text"
        className={classes.Input}
        placeholder="Search product here..."
      />
      <button className={classes.Button}>
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
};

export default SearchBar;
