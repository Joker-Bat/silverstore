import { createSlice } from "@reduxjs/toolkit";

// Helper function
import { arrayToObjectState } from "../../utilities/helperFunctions";

// Data
import data from "../../data/data";

// List of Categorys and its uses as state to control the companys to choose
const categroryList = [...new Set(data.map((item) => item.type))];
const categoryState = arrayToObjectState(categroryList);

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    categorys: categoryState,
    companys: {},
  },
  reducers: {
    categoryCheckboxChangedHandler: (state, { payload }) => {
      state.categorys[payload] = !state.categorys[payload];
    },
    companyCheckboxChangedHandler: (state, { payload }) => {
      state.companys[payload] = !state.companys[payload];
    },
    setCompanys: (state, { payload }) => {
      state.companys = payload;
    },
  },
});

export const {
  categoryCheckboxChangedHandler,
  companyCheckboxChangedHandler,
  setCompanys,
} = filterSlice.actions;

export default filterSlice.reducer;
