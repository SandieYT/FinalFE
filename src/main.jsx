import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TransactionProvider } from "./context/TransactionContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TransactionProvider>
        <App />
      </TransactionProvider>
    </QueryClientProvider>
  </Provider>
);
