import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const GuestRoute = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default GuestRoute;
