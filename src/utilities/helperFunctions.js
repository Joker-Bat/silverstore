export const arrayToObjectState = (arr, value) => {
  return arr.reduce((acc, cur) => {
    return { ...acc, [cur]: value };
  }, {});
};
