import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    loginUser: (state, { payload }) => {
      state.user = payload;
    },
    signupUser: (state, { payload }) => {
      state.user = payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { loginUser, signupUser, logoutUser, setUser } = userSlice.actions;

export default userSlice.reducer;
