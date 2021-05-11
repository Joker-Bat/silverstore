// Helper function
const parseTrueValuesFromObject = (obj) => {
  const selectedValues = Object.keys(obj)
    .map((item) => {
      return obj[item] ? item : undefined;
    })
    .filter((item) => item !== undefined);

  return selectedValues;
};

// Get Products from Selected Categorys
const getFilteredProductsByCategory = (categorys, data) => {
  const selectedCategorys = parseTrueValuesFromObject(categorys);
  if (selectedCategorys.length === 0) {
    return data;
  }
  const filteredProducts = data.filter((item) => {
    return selectedCategorys.includes(item.type);
  });
  return filteredProducts;
};

// Get Products from Selected Companys
const getFilteredProductsByCompany = (categorys, companys, data) => {
  const selectedCompanys = parseTrueValuesFromObject(companys);

  const selectedCategorys = parseTrueValuesFromObject(categorys);
  if (companys.length === 0) {
    return data;
  }
  const filteredProducts = data.filter((item) => {
    return (
      selectedCompanys.includes(item.brand) &&
      selectedCategorys?.includes(item.type)
    );
  });
  return filteredProducts;
};

export { getFilteredProductsByCategory, getFilteredProductsByCompany };
