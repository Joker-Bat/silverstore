import { arrayToObjectState } from "../../../utilities/helperFunctions";

const getCompanysFromCategorys = (categorys, data) => {
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

  return currentCompanyState;
};

export default getCompanysFromCategorys;
