import React from "react";
import { Header } from "../components";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div className="inner-root-layout">
      <Header />
      <div className="root-body">
      <Outlet />
      </div>
    </div>
  );
}
