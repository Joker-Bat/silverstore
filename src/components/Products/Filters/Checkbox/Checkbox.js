import React from "react";

// Styles
import classes from "./Checkbox.module.scss";

// Redux Toolkit
import { useDispatch, useSelector } from "react-redux";
import {
  categoryCheckboxChangedHandler,
  companyCheckboxChangedHandler,
} from "../../../../store/filter/filterSlice";

const Checkbox = ({ value, type }) => {
  // Redux toolkit
  const dispatch = useDispatch();
  const { categorys, companys } = useSelector((state) => state.filter);

  const handleChange = () => {
    if (type === "category") {
      dispatch(categoryCheckboxChangedHandler(value));
      return;
    } else if (type === "company") {
      dispatch(companyCheckboxChangedHandler(value));
      return;
    } else {
      return;
    }
  };

  return (
    <div className={classes.CheckboxContainer}>
      <input
        type="checkbox"
        name={value}
        id={value}
        onChange={handleChange}
        checked={type === "category" ? categorys[value] : companys[value]}
        className={classes.Checkbox}
      />

      <label htmlFor={value} className={classes.Label}>
        <span className={classes.Checkmark}></span>
        {value}
      </label>
    </div>
  );
};

export default Checkbox;
