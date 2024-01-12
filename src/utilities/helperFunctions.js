// Converts array to objects for filter section
export const arrayToObjectState = (arr, value) => {
  return arr.reduce((acc, cur) => {
    return { ...acc, [cur]: value };
  }, {});
};

// Trucncate words to display
export const truncateWords = (word, count) => {
  return word?.length > count ? word.substring(0, count - 3) + '...' : word;
};

// Calculate days before
export const getDaysBefore = (date) => {
  let currentDate;
  const oneDay = 24 * 60 * 60 * 1000;
  const daysCount = Math.floor((new Date() - new Date(date)) / oneDay);
  if (daysCount > 0) {
    currentDate = `${daysCount}day${daysCount > 1 ? 's' : ''}ago`;
  } else {
    currentDate = 'today';
  }
  return currentDate;
};

// Random 3 featured products
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

// To change review structure as we need
export const updateReviewStructure = (curReviews) => {
  const updatedReviews = curReviews.map((item) => {
    const date = getDaysBefore(item.createdAt);
    item.daysBefore = date;
    item.title = item.reviewTitle;
    item.description = item.reviewDescription;
    item.stars = item.rating;
    item.userName = item.user.name;
    item.userPhoto = item.user.photo;
    delete item.reviewTitle;
    delete item.reviewDescription;
    delete item.rating;
    delete item.user;
    delete item.createdAt;
    delete item.id;
    return item;
  });
  return updatedReviews;
};

export const getImageUrl = (path) => {
  return `https://silver-store-react.onrender.com/${path}`;
};
