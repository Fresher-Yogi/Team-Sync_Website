import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import Login from "../features/auth/ui/pages/Login";
import Register from "../features/auth/ui/pages/Register";
import { useDispatch } from "react-redux";
import { currentLoggedInAction } from "../features/auth/state/authAction";
import PublicRoute from "./protectedRoutes/PublicRoute";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import DashboardLayout from "../app/layout/DashboardLayout";
import { commonRoutes } from "./commonRoutes";
import RoleBaseRoute from "./protectedRoutes/RoleBaseRoute";
import { adminRoutes } from "./adminRoutes";
import { employeesRoutes } from "./employeeRoutes";

const AppRoutes = () => {
  let dispacth = useDispatch();

  useEffect(() => {
    dispacth(currentLoggedInAction());
  }, []);

  let router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute />,
      children: [
        {
          path: "",
          element: <Login />,
        },
        {
          path: "reg",
          element: <Register />,
        },
      ],
    },

    {
      path: "/home",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <DashboardLayout />,
          children: [
            ...commonRoutes,
            {
              element: <RoleBaseRoute allowedRoles={"admin"} />,
              children: adminRoutes
            },
            {
              element: <RoleBaseRoute allowedRoles={'employee'}/>,
              children: employeesRoutes
            }
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
