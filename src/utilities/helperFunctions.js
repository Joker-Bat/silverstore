export const arrayToObjectState = (arr, value) => {
  return arr.reduce((acc, cur) => {
    return { ...acc, [cur]: value };
  }, {});
};

export const truncateWords = (word, count) => {
  return word.length > count ? word.substring(0, count - 3) + "..." : word;
};
