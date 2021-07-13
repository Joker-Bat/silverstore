import { getDaysBefore } from '../../../utilities/helperFunctions';

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
