import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../stores/userStore";

const GuestRoute = () => {
  const isAuthenticated = !!useUserStore((state) => state.accessToken);

  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default GuestRoute;
