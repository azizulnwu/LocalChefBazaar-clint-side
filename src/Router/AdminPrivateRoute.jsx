import React from "react";

import { Navigate, useLocation } from "react-router";
import useAuth from "../Hook/useAuth";
import LoadingSpinner from "../Component/Shared/LoadingSpinner";

const AdminPrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation()
  if (loading) return <LoadingSpinner></LoadingSpinner>;
  if (user.roll === "admin") return children;
  return <Navigate state={location.pathname} replace="true"/>
};

export default AdminPrivateRoute;
