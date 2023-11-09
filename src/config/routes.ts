import * as React from "react";
import { createBrowserRouter } from "react-router-dom";

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
      },
      {
        path: "/profile",
        Component: ProfilePage,
      },
    ],
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
]);
