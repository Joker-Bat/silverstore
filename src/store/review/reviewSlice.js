import { createSlice } from '@reduxjs/toolkit';

const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    productId: null,
    reviews: [],
    reviewAdded: false,
  },
  reducers: {
    setProductId: (state, { payload }) => {
      state.productId = payload;
    },
    addReview: (state, { payload }) => {
      state.reviews.push(payload);
    },
    setAllReviews: (state, { payload }) => {
      const currentReviews = payload.concat(state.reviews);
      const filteredReviews = currentReviews.filter((item, index, arr) => {
        return arr.findIndex((i) => i._id === item._id) === index;
      });
      state.reviews = filteredReviews;
    },
    setReviewAdded: (state) => {
      state.reviewAdded = true;
    },
    clearReviews: (state) => {
      state.reviews = [];
    },
  },
});

export const {
  addReview,
  setProductId,
  setAllReviews,
  setReviewAdded,
  clearReviews,
} = reviewSlice.actions;

export default reviewSlice.reducer;
