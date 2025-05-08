import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export default function PrivateRoute({ adminOnly, children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  if (adminOnly) {
    return user.role === "admin" && isAuthenticated ? (
      children
    ) : (
      <Navigate to="/" replace />
    );
  }

  return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
}
