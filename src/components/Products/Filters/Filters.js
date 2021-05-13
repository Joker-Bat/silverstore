import React, { useEffect } from "react";

// Styles
import classes from "./Filters.module.scss";
// Helperfunctions
import getCompanysFromCategorys from "./getCompanysFromCategorys";
// Data
import data from "../../../data/data";
// Components
import Checkbox from "./Checkbox/Checkbox";
import RangeSlider from "./RangeSlider/RangeSlider";
import SimpleButton from "../../UI/SimpleButton/SimpleButton";
// Redux toolkit
import { useSelector, useDispatch } from "react-redux";
import {
  resetFilter,
  setCompanys,
  updataPrice,
} from "../../../store/filter/filterSlice";
import { resetProducts } from "../../../store/products/productsSlice";

// List of Categorys and its uses as state to control the companys to choose
const categroryList = [...new Set(data.map((item) => item.type))];

// Min and Max price
const minPrice = Math.min(...data.map((item) => +item.price));
const maxPrice = Math.max(...data.map((item) => +item.price));
/*  

  Main Component

*/
const Filters = (props) => {
  // Redux toolkit
  const dispatch = useDispatch();
  const { categorys, companys, openFilter, price } = useSelector(
    (state) => state.filter
  );

  const setPrice = (event, value) => {
    dispatch(updataPrice(value));
  };

  const clearFilters = () => {
    dispatch(resetFilter());
    dispatch(resetProducts());
  };

  useEffect(() => {
    const filteredCompanys = getCompanysFromCategorys(
      categorys,
      companys,
      data
    );
    dispatch(setCompanys(filteredCompanys));
    // eslint-disable-next-line
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
      <div className={classes.CategoryContainer}>
        <h1 className={classes.CategoryTitle}>Category</h1>
        <div className={classes.CategoryList}>{categoryToShow}</div>
      </div>

      <div className={classes.CompanyContainer}>
        <h1 className={classes.CompanyTitle}>Company</h1>
        <div className={classes.CompanyList}>{companyToShow}</div>
      </div>

      <div className={classes.PriceContainer}>
        <h1 className={classes.PriceTitle}>Price</h1>
        <RangeSlider price={price} setPrice={setPrice} />
        <div className={classes.PriceLabels}>
          <p>{minPrice}</p>
          <p>₹</p>
          <p>{maxPrice}</p>
        </div>
      </div>

      <div className={classes.ClearFilter}>
        <SimpleButton
          name="clear filters"
          clicked={clearFilters}
          capitalize
          small
        />
      </div>
    </aside>
  );
};

export default Filters;
