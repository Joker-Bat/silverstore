// Helper function
const parseTrueValuesFromObject = (obj) => {
  const selectedValues = Object.keys(obj)
    .map((item) => {
      return obj[item] ? item : undefined;
    })
    .filter((item) => item !== undefined);

  return selectedValues;
};

// Get Products below the current price
const getFilteredProductsByChoices = (categorys, companys, price, data) => {
  const selectedCompanys = parseTrueValuesFromObject(companys);
  const selectedCategorys = parseTrueValuesFromObject(categorys);

  let currentProducts;

  if (selectedCategorys.length !== 0) {
    const categoryProducts = data.filter((item) => {
      return selectedCategorys.includes(item.type);
    });
    if (selectedCompanys.length !== 0) {
      currentProducts = categoryProducts.filter((item) => {
        return selectedCompanys.includes(item.brand);
      });
    } else {
      currentProducts = categoryProducts;
    }
  } else {
    currentProducts = data;
  }

  const filteredProducts = currentProducts.filter((item) => {
    return item.price <= price;
  });

  return filteredProducts;
};

export { getFilteredProductsByChoices };
