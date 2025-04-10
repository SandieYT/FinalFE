import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "./RootLayout";

const LoadingSpinner = () => <div>Loading...</div>;

const Home = lazy(() => import("../pages/HomePage/Home"));
const Login = lazy(() => import("../pages/LoginPage/Login"));
const Register = lazy(() => import("../pages/RegisterPage/Register"));
const Markets = lazy(() => import("../pages/MarketsPage/Markets"));
const Coin = lazy(() => import("../pages/CoinPage/Coin"));
const Transaction = lazy(() => import("../pages/TransactionPage/Transaction"))

const Router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "markets",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Markets />
          </Suspense>
        ),
      },
      {
        path: "coin/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Coin />
          </Suspense>
        ),
      },
      {
        path: "transaction",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Transaction />
          </Suspense>
        ),
      },
    ],
  },
]);

export default Router;
