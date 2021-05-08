import React, { useEffect } from "react";

// Styles
import classes from "./Filters.module.scss";

// Helperfunctions
import getCompanysFromCategorys from "./getCompanysFromCategorys";

// Data
import data from "../../../data/data";

// Redux toolkit
import { useSelector, useDispatch } from "react-redux";
import {
  categoryCheckboxChangedHandler,
  companyCheckboxChangedHandler,
  setCompanys,
} from "../../../store/filter/filterSlice";

// List of Categorys and its uses as state to control the companys to choose
const categroryList = [...new Set(data.map((item) => item.type))];

const Filters = (props) => {
  // Redux toolkit
  const dispatch = useDispatch();
  const { categorys, companys } = useSelector((state) => state.filter);

  useEffect(() => {
    const filteredCompanys = getCompanysFromCategorys(categorys, data);
    dispatch(setCompanys(filteredCompanys));
  }, [categorys, dispatch]);

  const categoryToShow = categroryList.map((item, index) => {
    return (
      <div key={"CategoryCheckBox" + index}>
        <input
          type="checkbox"
          name={item}
          id={item}
          onChange={() => dispatch(categoryCheckboxChangedHandler(item))}
          checked={categorys[item]}
        />
        <label htmlFor={item}>{item}</label>
      </div>
    );
  });

  const companyToShow = Object.keys(companys).map((item, index) => {
    return (
      <div key={"CategoryCheckBox" + index} className="checkbox">
        <input
          type="checkbox"
          name={item}
          id={item}
          checked={companys[item]}
          onChange={() => dispatch(companyCheckboxChangedHandler(item))}
        />
        <label htmlFor={item}>{item}</label>
      </div>
    );
  });

  return (
    <aside className={classes.Filter}>
      <div className="category">
        <h1>Category</h1>
        {categoryToShow}
      </div>

      <div className="company">
        <h1>Company</h1>
        {companyToShow}
      </div>
    </aside>
  );
};

export default Filters;
