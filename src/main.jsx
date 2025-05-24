import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TransactionProvider } from "./context/TransactionContext";
import { GoogleOAuthProvider } from '@react-oauth/google';

const queryClient = new QueryClient();
const googleClientId = import.meta.env.VITE_GG_CLIENT_ID;
console.log("Google Client ID:", googleClientId);


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TransactionProvider>
        <GoogleOAuthProvider clientId={googleClientId}>
          <App />
        </GoogleOAuthProvider>
      </TransactionProvider>
    </QueryClientProvider>
  </Provider>
);