import React, { useState, useEffect } from "react";

// Helperfunctions
import { arrayToObjectState } from "../../../utilities/helperFunctions";

// Data
import data from "../../../data/data";

// List of Categorys and its uses as state to control the companys to choose
const categroryList = [...new Set(data.map((item) => item.type))];
const categoryState = arrayToObjectState(categroryList);

const Filters = (props) => {
  const [companys, setCompanys] = useState({});
  const [categorys, setCategorys] = useState(categoryState);

  const categoryCheckboxChangedHandler = (name) => {
    setCategorys((prev) => {
      return { ...prev, [name]: !prev[name] };
    });
  };

  const companyCheckboxChangedHandler = (name) => {
    setCompanys((prev) => {
      return { ...prev, [name]: !prev[name] };
    });
  };

  useEffect(() => {
    // Get filteredCategorys which is checked
    const filteredCategory = Object.keys(categorys).filter((item) => {
      return categorys[item] && categorys[item];
    });

    // Get FilteredCompanyNames based on checked categorys
    const filteredCompanys = filteredCategory.map((curCat) => {
      return data
        .filter((product) => {
          return product.type === curCat;
        })
        .map((item) => item.brand);
    });

    // Turn Company names to state to render needed Company names only

    const listOfCompanys = filteredCompanys.map((item) => {
      return arrayToObjectState(item);
    });

    let currentCompanyState = {};

    listOfCompanys.forEach((item) => {
      currentCompanyState = { ...currentCompanyState, ...item };
    });
    setCompanys(currentCompanyState);
  }, [categorys]);

  const categoryToShow = categroryList.map((item, index) => {
    return (
      <div key={"CategoryCheckBox" + index} className="checkbox">
        <input
          type="checkbox"
          name={item}
          id={item}
          onChange={() => categoryCheckboxChangedHandler(item)}
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
          onChange={() => companyCheckboxChangedHandler(item)}
        />
        <label htmlFor={item}>{item}</label>
      </div>
    );
  });

  return (
    <div>
      <div className="category">
        <h1>Category</h1>
        {categoryToShow}
      </div>

      <div className="company">
        <h1>Company</h1>
        {companyToShow}
      </div>
    </div>
  );
};

export default Filters;
