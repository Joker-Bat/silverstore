// Helper function
import { getDaysBefore } from "../../../utilities/helperFunctions";

export const getLocalReviews = (id) => {
  const currentLocalReviewsList = JSON.parse(
    localStorage.getItem("localReviews")
  );

  if (currentLocalReviewsList) {
    // Filter reviews for current product
    const currentLocalReviews = currentLocalReviewsList?.filter(
      (item) => item.id === id
    );
    // Change dates to how long days before from now
    currentLocalReviews.forEach((item) => {
      const currentDate = getDaysBefore(item.daysBefore);
      item.daysBefore = currentDate;
    });

    return currentLocalReviews;
  }
  return false;
};
