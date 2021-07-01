import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userEmail: null,
    userName: null,
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
      state.userEmail = payload.email;
      state.userName = payload.name;
    },
  },
});

export const { loginUser, signupUser, logoutUser, setUser } = userSlice.actions;

export default userSlice.reducer;
