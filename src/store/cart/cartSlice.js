// Data
// import data from "../../data/data";

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    productRef: [],
    products: [],
    totalProducts: 0,
    totalPrice: 0,
  },
  reducers: {
    addCartItem: (state, { payload }) => {
      const { id, count } = payload;
      // Check if that product already exist
      const filteredProducts = state.products?.findIndex(
        (item) => item.id === id
      );
      if (filteredProducts !== -1) {
        const existingProduct = state.products[filteredProducts];
        existingProduct.count += count;
        existingProduct.subTotal =
          existingProduct.count * existingProduct.price;
      } else {
        const currentProduct = state.productRef.filter(
          (item) => item.id === id
        )[0];
        state.products.push({
          id,
          count,
          slug: currentProduct.slug,
          name: currentProduct.name,
          image: currentProduct.images[0],
          price: currentProduct.price,
          subTotal: count * currentProduct.price,
        });
      }
    },
    removeCartItem: (state, { payload }) => {
      state.products = state.products.filter((item) => item.id !== payload);
    },
    increaseProductCount: (state, { payload }) => {
      const index = state.products.findIndex((item) => item.id === payload);
      const currentProduct = state.products[index];
      currentProduct.count += 1;
      currentProduct.subTotal = currentProduct.count * currentProduct.price;
    },
    decreaseProductCount: (state, { payload }) => {
      const index = state.products.findIndex((item) => item.id === payload);
      const currentProduct = state.products[index];
      if (currentProduct.count > 1) {
        currentProduct.count -= 1;
        currentProduct.subTotal = currentProduct.count * currentProduct.price;
      }
    },
    setAllProducts: (state, { payload }) => {
      state.productRef = payload;
    },
  },
});

export const {
  addCartItem,
  removeCartItem,
  increaseProductCount,
  decreaseProductCount,
  setAllProducts,
} = cartSlice.actions;

export default cartSlice.reducer;
