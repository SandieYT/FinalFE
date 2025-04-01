import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "./RootLayout";

const LoadingSpinner = () => <div>Loading...</div>;

const Home = lazy(() => import("../pages/HomePage/Home"));

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
    ],
  },
]);

export default Router;
