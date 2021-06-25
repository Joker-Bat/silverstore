import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    categoryRef: {},
    priceRef: 0,
    // Above for reference
    categorys: {},
    companys: {},
    minPrice: 0,
    price: 0,
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
    setCategory: (state, { payload }) => {
      state.categorys = payload;
      state.categoryRef = payload;
    },
    setCompanys: (state, { payload }) => {
      state.companys = payload;
    },
    toggleFilter: (state) => {
      state.openFilter = !state.openFilter;
    },
    setPrice: (state, { payload }) => {
      state.priceRef = payload.maxPrice;
      state.price = payload.maxPrice;
      state.minPrice = payload.minPrice;
    },
    updatePrice: (state, { payload }) => {
      state.price = payload;
    },
    resetFilter: (state) => {
      state.categorys = state.categoryRef;
      state.companys = {};
      state.openFilter = false;
      state.price = state.priceRef;
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
  setCategory,
  setCompanys,
  toggleFilter,
  setPrice,
  updatePrice,
  resetFilter,
  setListView,
  removeListView,
} = filterSlice.actions;

export default filterSlice.reducer;
