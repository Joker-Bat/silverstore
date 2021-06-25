import React, { useEffect } from "react";

// Styles
import classes from "./Filters.module.scss";
// Helperfunctions
import getCompanysFromCategorys from "./getCompanysFromCategorys";
// Data
// import data from "../../../data/data";
// Components
import Checkbox from "./Checkbox/Checkbox";
import RangeSlider from "./RangeSlider/RangeSlider";
import SimpleButton from "../../UI/SimpleButton/SimpleButton";
// Redux toolkit
import { useSelector, useDispatch } from "react-redux";
import {
  resetFilter,
  setCompanys,
  updatePrice,
} from "../../../store/filter/filterSlice";
import { resetProducts } from "../../../store/products/productsSlice";

/*  
  Main Component
*/
const Filters = (props) => {
  // Redux toolkit
  const dispatch = useDispatch();
  const {
    categoryRef,
    categorys,
    companys,
    openFilter,
    price,
    priceRef,
    minPrice,
  } = useSelector((state) => state.filter);

  const { productRef } = useSelector((state) => state.products);

  const setPrice = (event, value) => {
    dispatch(updatePrice(value));
  };

  const clearFilters = () => {
    dispatch(resetFilter());
    dispatch(resetProducts());
  };

  useEffect(() => {
    const filteredCompanys = getCompanysFromCategorys(
      categorys,
      companys,
      productRef
    );
    dispatch(setCompanys(filteredCompanys));
    // eslint-disable-next-line
  }, [categorys, dispatch]);

  const categoryToShow = Object.keys(categoryRef).map((item, index) => {
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
          <p>{priceRef}</p>
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
