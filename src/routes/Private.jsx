import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function Private() {
  const isAuthenticated = true;

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
