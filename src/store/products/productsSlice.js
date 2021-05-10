import { createSlice } from "@reduxjs/toolkit";

// data
import data from "../../data/data";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: data,
  },
  reducers: {
    updateProducts: (state, { payload }) => {
      state.products = payload;
    },
    resetProducts: (state) => {
      state.products = data;
    },
  },
});

export const { updateProducts, resetProducts } = productsSlice.actions;

export default productsSlice.reducer;
