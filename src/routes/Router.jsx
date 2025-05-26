import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "./RootLayout";
import Private from "./Private";

const LoadingSpinner = () => <div>Loading...</div>;

const Home = lazy(() => import("../pages/HomePage/Home"));
const Login = lazy(() => import("../pages/LoginPage/Login"));
const Register = lazy(() => import("../pages/RegisterPage/Register"));
const Transaction = lazy(() => import("../pages/TransactionPage/Transaction"));
const Market = lazy(() => import("../pages/MarketPage/Market"));
const Coin = lazy(() => import("../pages/CoinPage/Coin"));
const Profile = lazy(() => import("../pages/ProfilePage/Profile"));
const Dashboard = lazy(() => import("../pages/DashboardPage/Dashboard"));
const Settings = lazy(() => import("../pages/SettingsPage/Settings"));

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
        path: "transaction",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Transaction />
          </Suspense>
        ),
      },
      {
        path: "markets",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Market />
          </Suspense>
        ),
      },
      {
        path: "coins/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Coin />
          </Suspense>
        ),
      },
      {
        path: "profile/:id",
        element: (
          <Private>
            <Suspense fallback={<LoadingSpinner />}>
              <Profile />
            </Suspense>
          </Private>
        ),
      },
      {
        path: "my-profile",
        element: (
          <Private>
            <Suspense fallback={<LoadingSpinner />}>
              <Profile />
            </Suspense>
          </Private>
        ),
      },
      {
        path: "settings",
        element: (
          <Private>
            <Suspense fallback={<LoadingSpinner />}>
              <Settings />
            </Suspense>
          </Private>
        ),
      },
      {
        path: "dashboard",
        element: (
          <Private requiredRoles={["admin"]}>
            <Suspense fallback={<LoadingSpinner />}>
              <Dashboard />
            </Suspense>
          </Private>
        ),
      },
    ],
  },
]);

export default Router;
