import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "./RootLayout";

const LoadingSpinner = () => <div>Loading...</div>;

const Home = lazy(() => import("../pages/HomePage/Home"));
const Markets = lazy(() => import("../pages/MarketsPage/Markets"));

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
        path: "markets",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Markets />
          </Suspense>
        ),
      },
    ],
  },
]);

export default Router;
