import { createSlice } from "@reduxjs/toolkit";

const loadInitialState = () => {
  const authData = localStorage.getItem("auth");
  return authData
    ? JSON.parse(authData)
    : {
        isAuthenticated: false,
        username: "",
        email: "",
        accessToken: "",
        userId: "",
      };
};

export const authSlice = createSlice({
  name: "auth",
  initialState: loadInitialState(),
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      state.userId = action.payload.userId;
      localStorage.setItem("auth", JSON.stringify(state));
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.username = "";
      state.email = "";
      state.accessToken = "";
      state.userId = "";
      localStorage.removeItem("auth");
    },
    initializeAuth: (state) => {
      const authData = localStorage.getItem("auth");
      if (authData) {
        const parsedData = JSON.parse(authData);
        state.isAuthenticated = parsedData.isAuthenticated;
        state.username = parsedData.username;
        state.email = parsedData.email;
        state.accessToken = parsedData.accessToken;
        state.userId = parsedData.userId;
      }
    },
  },
});

export const { loginSuccess, logoutSuccess, initializeAuth } = authSlice.actions;

export default authSlice.reducer;