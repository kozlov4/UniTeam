import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { getRoleFromToken } from "../utils/decodeJWT";

function AdminRoute() {
  const accessToken = useUserStore((state) => state.accessToken);
  const isAuthenticated = !!accessToken;

  const role = getRoleFromToken(accessToken);

  const isAdmin = role === "admin";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return isAdmin ? <Outlet /> : <Navigate to="/dashboard" replace />;
}

export default AdminRoute;
