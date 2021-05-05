export const arrayToObjectState = (arr) => {
  return arr.reduce((acc, cur) => {
    return { ...acc, [cur]: false };
  }, {});
};
