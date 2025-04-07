import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import authReducer from "../features/authSlice";
import { initializeAuth } from "../features/authSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});

store.dispatch(initializeAuth());
