import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { store } from "../../app/store";

const PublicRoute = () => {
  const { employee, isLoading } = useSelector((store)=> store.auth );

  // 1. Sirf initial app load par loading dikhayein
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (employee) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
