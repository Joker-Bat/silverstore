import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userEmail: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.userEmail = null;
    },
    setUser: (state, { payload }) => {
      state.userEmail = payload.email;
      state.uid = payload.uid;
    },
  },
});

export const { loginUser, signupUser, logoutUser, setUser } = userSlice.actions;

export default userSlice.reducer;
