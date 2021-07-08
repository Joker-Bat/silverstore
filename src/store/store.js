import { configureStore } from "@reduxjs/toolkit";
// Filter Reducer
import filterReducer from "./filter/filterSlice";
// Products Reducer
import productsReducer from "./products/productsSlice";
// Cart Reducer
import cartReducer from "./cart/cartSlice";
// User Reducer
import authReducer from "./auth/authSlice";

export default configureStore({
  reducer: {
    filter: filterReducer,
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});
