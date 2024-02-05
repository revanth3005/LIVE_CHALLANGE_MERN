import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const jwt = localStorage.getItem("jwt");
console.log("jwt", jwt);
  return !jwt ? <Navigate to="/" replace /> : <Outlet />;
};

export default ProtectedRoute;
