import * as React from "react";
import { createBrowserRouter } from "react-router-dom";

import { ErrorBoundary } from "src/components";
import { MainLayout } from "src/layouts";
import { HomePage, LoginPage, ProfilePage, RegisterPage, NotFound } from "src/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: HomePage,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/profile",
        Component: ProfilePage,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/register",
        Component: RegisterPage,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/login",
        Component: LoginPage,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);
