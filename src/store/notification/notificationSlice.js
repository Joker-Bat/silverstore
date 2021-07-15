import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    errorMessage: '',
    successMessage: '',
  },
  reducers: {
    setErrorMessage: (state, { payload }) => {
      state.errorMessage = payload;
    },
    setSuccessMessage: (state, { payload }) => {
      state.successMessage = payload;
    },
    removeErrorMessage: (state) => {
      state.errorMessage = '';
    },
    removeSuccessMessage: (state) => {
      state.successMessage = '';
    },
  },
});

export const {
  setErrorMessage,
  setSuccessMessage,
  removeErrorMessage,
  removeSuccessMessage,
} = notificationSlice.actions;

export default notificationSlice.reducer;
