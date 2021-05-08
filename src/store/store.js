import { configureStore } from "@reduxjs/toolkit";

// Filter Reducer
import filterReducer from "./filter/filterSlice";

export default configureStore({
  reducer: {
    filter: filterReducer,
  },
});
