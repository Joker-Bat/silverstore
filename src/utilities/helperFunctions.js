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
  let gen_nums = [];

  function in_array(array, el) {
    for (let i = 0; i < array.length; i++) if (array[i] === el) return true;
    return false;
  }

  function get_rand(array) {
    let rand = array[Math.floor(Math.random() * array.length)];
    if (!in_array(gen_nums, rand)) {
      gen_nums.push(rand);
      return rand;
    }
    return get_rand(array);
  }

  for (let i = 0; i < 3; i++) {
    get_rand(products);
  }

  return gen_nums;
};

// var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
