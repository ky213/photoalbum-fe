import React from "react";
import { Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import { MainLayout } from "./layouts";
import { HomePage, LoginPage, ProfilePage, RegiterPage, NotFound } from "./pages";
import { ErrorBoundry } from "./components";

function App() {
  return (
    <MainLayout>
      <CssBaseline />
      <ErrorBoundry>
        <Routes>
          <Route index path="/" Component={HomePage} />
          <Route path="/login" Component={LoginPage} />
          <Route path="/register" Component={RegiterPage} />
          <Route path="/profile" Component={ProfilePage} />
          <Route path="*" Component={NotFound} />
        </Routes>
      </ErrorBoundry>
    </MainLayout>
  );
}

export default App;
