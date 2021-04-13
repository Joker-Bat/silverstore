import React from "react";

// Styles
import classes from "./SearchBar.module.scss";

const SearchBar = (props) => {
  const submitHandler = (e) => {
    e.preventDefault();
    props.closeBackdrop();
  };

  const InputClass = [classes.Input, props.shrink && classes.ShrinkInput];

  return (
    <form className={classes.Form} onSubmit={submitHandler}>
      <input
        type="text"
        className={InputClass.join(' ')}
        placeholder="Search product here..."
      />
      <button className={classes.Button}>
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
};

export default SearchBar;
