import { createSlice } from '@reduxjs/toolkit';

const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState: {
    currentProduct: {},
    reviews: [],
  },
  reducers: {
    setCurrentProduct: (state, { payload }) => {
      state.currentProduct = payload;
    },
    addReview: (state, { payload }) => {
      state.reviews = state.reviews.concat(payload);
    },
    setAllReviews: (state, { payload }) => {
      const currentReviews = state.reviews.concat(payload);
      // Remove duplicate reviews
      const filteredReviews = currentReviews.filter((item, index, arr) => {
        return arr.findIndex((i) => i._id === item._id) === index;
      });
      state.reviews = filteredReviews;
    },
    clearReviews: (state) => {
      state.reviews = [];
    },
  },
});

export const { addReview, setAllReviews, clearReviews, setCurrentProduct } =
  singleProductSlice.actions;

export default singleProductSlice.reducer;
