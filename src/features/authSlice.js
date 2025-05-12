import { createSlice } from "@reduxjs/toolkit";

const loadInitialState = () => {
  const authData = localStorage.getItem("auth");
  return authData
    ? JSON.parse(authData)
    : {
        isAuthenticated: false,
        username: "",
        email: "",
        userId: "",
        role: "",
        profile_picture: "",
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
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      state.profile_picture = action.payload.profile_picture;
      localStorage.setItem("auth", JSON.stringify(state));
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.username = "";
      state.email = "";
      state.userId = "";
      state.role = "";
      state.profile_picture = "";
      localStorage.removeItem("auth");
      if (window.kommunicate) {
        window.kommunicate.logout?.();
      }
    },
    initializeAuth: (state) => {
      const authData = localStorage.getItem("auth");
      if (authData) {
        const parsedData = JSON.parse(authData);
        state.isAuthenticated = parsedData.isAuthenticated;
        state.username = parsedData.username;
        state.email = parsedData.email;
        state.userId = parsedData.userId;
        state.role = parsedData.role;
        state.profile_picture = parsedData.profile_picture;
      }
    },
  },
});

export const { loginSuccess, logoutSuccess, initializeAuth } =
  authSlice.actions;

export default authSlice.reducer;
