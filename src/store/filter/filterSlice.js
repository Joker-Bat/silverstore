import { createSlice } from "@reduxjs/toolkit";

// Helper function
import { arrayToObjectState } from "../../utilities/helperFunctions";

// Data
import data from "../../data/data";

// List of Categorys and its uses as state to control the companys to choose
const categroryList = [...new Set(data.map((item) => item.type))];
const categoryState = arrayToObjectState(categroryList, false);

//Max price
const maxPrice = Math.max(...data.map((item) => +item.price));

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    categorys: categoryState,
    companys: {},
    price: maxPrice,
    openFilter: false,
    listView: false,
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
    toggleFilter: (state) => {
      state.openFilter = !state.openFilter;
    },
    updataPrice: (state, { payload }) => {
      state.price = payload;
    },
    resetFilter: (state) => {
      state.categorys = categoryState;
      state.companys = {};
      state.openFilter = false;
      state.price = maxPrice;
    },
    setListView: (state) => {
      state.listView = true;
    },
    removeListView: (state) => {
      state.listView = false;
    },
  },
});

export const {
  categoryCheckboxChangedHandler,
  companyCheckboxChangedHandler,
  setCompanys,
  toggleFilter,
  updataPrice,
  resetFilter,
  setListView,
  removeListView,
} = filterSlice.actions;

export default filterSlice.reducer;
