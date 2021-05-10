import { arrayToObjectState } from "../../../utilities/helperFunctions";

const getCompanysFromCategorys = (categorys, companys, data) => {
  // Get filteredCategorys which is checked
  const filteredCategory = Object.keys(categorys).filter((item) => {
    return categorys[item] && categorys[item];
  });

  // Filter companys if it already present
  const filterCurrentCompanys = Object.keys(companys).filter((item) => {
    return companys[item] && companys[item];
  });

  // Get FilteredCompanyNames based on checked categorys
  const filteredCompanys = filteredCategory
    .map((curCat) => {
      return data
        .filter((product) => {
          return product.type === curCat;
        })
        .map((item) => item.brand);
    })
    .flat();

  // Check weather the currently available company matches the current category
  const currentFilteredCompanys = filterCurrentCompanys.filter((item) => {
    return filteredCompanys.includes(item);
  });

  // Currently matched companys to state true
  const currentFilteredCompanysState = arrayToObjectState(
    currentFilteredCompanys,
    true
  );

  // Turn Company names to state to render needed Company names only
  const listOfCompanys = arrayToObjectState(filteredCompanys, false);

  const currentCompanyState = {
    ...listOfCompanys,
    ...currentFilteredCompanysState,
  };

  return currentCompanyState;
};

export default getCompanysFromCategorys;
