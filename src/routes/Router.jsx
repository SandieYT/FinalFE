import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "./RootLayout";

const LoadingSpinner = () => <div>Loading...</div>;

const Home = lazy(() => import("../pages/HomePage/Home"));
const Login = lazy(() => import("../pages/LoginPage/Login"));

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
    ],
  },
]);

export default Router;
