import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    // ProductList is for reference not to mutate
    productRef: [],
    products: [],
    bannerImages: [],
    featuredProducts: [],
  },
  reducers: {
    setProducts: (state, { payload }) => {
      state.products = payload;
      state.productRef = payload;
    },
    setBannerImages: (state, { payload }) => {
      state.bannerImages = payload;
    },
    setFeaturedProducts: (state, { payload }) => {
      state.featuredProducts = payload;
    },
    updateProducts: (state, { payload }) => {
      state.products = payload;
    },
    resetProducts: (state) => {
      state.products = state.productRef;
    },
  },
});

export const {
  updateProducts,
  resetProducts,
  setProducts,
  setBannerImages,
  setFeaturedProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
