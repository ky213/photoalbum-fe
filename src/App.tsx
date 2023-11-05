import React from "react";
import { Route, Routes } from "react-router-dom";

import { MainLayout } from "./layouts";
import { HomePage, LoginPage, ProfilePage, RegiterPage, NotFound } from "./pages";
import { ErrorBoundry } from "./components";

function App() {
  return (
    <MainLayout>
      <ErrorBoundry>
        <Routes>
          <Route path="/" Component={HomePage} />
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
