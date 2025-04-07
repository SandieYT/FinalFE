import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  username: "",
  email: "",
  accessToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.username = "";
      state.email = "";
      state.accessToken = "";
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;