import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Private({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? children : <Navigate to="/" replace />;
}