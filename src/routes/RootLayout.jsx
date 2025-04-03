import React from "react";
import { Header } from "../components";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div className="root-div">
      <Header />
      <Outlet />
    </div>
  );
}
