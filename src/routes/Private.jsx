import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Private({ children, requiredRoles = [] }) {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
