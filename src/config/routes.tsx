import * as React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";

import { ErrorBoundary } from "src/components";
import { MainLayout } from "src/layouts";
import { HomePage, LoginPage, ProfilePage, RegisterPage } from "src/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: HomePage,
        element: <Outlet />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/profile",
        Component: ProfilePage,
        element: <Outlet />,
        errorElement: <ErrorBoundary />,
      },
    ],
  },
  {
    path: "/register",
    Component: RegisterPage,
    element: <Outlet />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/login",
    Component: LoginPage,
    element: <Outlet />,
    errorElement: <ErrorBoundary />,
  },
]);
