import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authToken: null,
  },
  reducers: {
    removeToken: (state) => {
      state.authToken = null;
      localStorage.removeItem("silvertoken");
    },
    setToken: (state, { payload }) => {
      state.authToken = payload.token;
      localStorage.setItem("silvertoken", payload.token);
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
