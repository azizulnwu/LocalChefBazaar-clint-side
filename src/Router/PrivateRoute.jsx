import React, { Children } from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hook/useAuth";
import LoadingSpinner from "../Component/Shared/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;
  if (!user) {
    return <Navigate to="/login" state={location.pathname} replace="true" />;
  }
  return children;
};

export default PrivateRoute;
// state={location.pathname} replace="true"
