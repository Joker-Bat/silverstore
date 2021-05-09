import React, { useEffect } from "react";

// Styles
import classes from "./Filters.module.scss";
// Helperfunctions
import getCompanysFromCategorys from "./getCompanysFromCategorys";
// Data
import data from "../../../data/data";
// Components
import Checkbox from "./Checkbox/Checkbox";
// Redux toolkit
import { useSelector, useDispatch } from "react-redux";
import { setCompanys } from "../../../store/filter/filterSlice";

// List of Categorys and its uses as state to control the companys to choose
const categroryList = [...new Set(data.map((item) => item.type))];

const Filters = (props) => {
  // Redux toolkit
  const dispatch = useDispatch();
  const { categorys, companys, openFilter } = useSelector(
    (state) => state.filter
  );

  useEffect(() => {
    const filteredCompanys = getCompanysFromCategorys(categorys, data);
    dispatch(setCompanys(filteredCompanys));
  }, [categorys, dispatch]);

  const categoryToShow = categroryList.map((item, index) => {
    return (
      <Checkbox key={"CategoryCheckBox" + index} value={item} type="category" />
    );
  });

  const companyToShow = Object.keys(companys).map((item, index) => {
    return (
      <Checkbox key={"CategoryCheckBox" + index} value={item} type="company" />
    );
  });

  const filterClasses = [classes.Filter];

  openFilter && filterClasses.push(classes.ToggleFilter);

  return (
    <aside className={filterClasses.join(" ")}>
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
