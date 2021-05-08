const filteredProducts = (categorys, data) => {
  const selectedCategorys = Object.keys(categorys)
    .map((item) => {
      return categorys[item] ? item : undefined;
    })
    .filter((item) => item !== undefined);
  if (selectedCategorys.length === 0) {
    return data;
  }
  const filteredProducts = data.filter((item) => {
    return selectedCategorys.includes(item.type);
  });
  return filteredProducts;
};

export default filteredProducts;
