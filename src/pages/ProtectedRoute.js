import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

function ProtectedRoute() {
  const { user } = useAppContext();
  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
