export const arrayToObjectState = (arr, value) => {
  return arr.reduce((acc, cur) => {
    return { ...acc, [cur]: value };
  }, {});
};

export const truncateWords = (word, count) => {
  return word?.length > count ? word.substring(0, count - 3) + "..." : word;
};

export const getDaysBefore = (date) => {
  let currentDate;
  const oneDay = 24 * 60 * 60 * 1000;
  const daysCount = Math.floor((new Date() - new Date(date)) / oneDay);
  if (daysCount > 0) {
    currentDate = `${daysCount}day${daysCount > 1 ? "s" : ""}ago`;
  } else {
    currentDate = "today";
  }
  return currentDate;
};

export const getRandomThree = (products) => {
  const refArr = [...products];
  let gen_nums = [];

  function get_rand() {
    let rand = Math.floor(Math.random() * refArr.length);
    gen_nums.push(refArr.splice(rand, 1));
  }

  for (let i = 0; i < 3; i++) {
    get_rand();
  }

  return gen_nums.flat();
};
