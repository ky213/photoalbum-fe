import React from "react";
import { NavLink } from "react-router-dom";

export interface ILoginPageProps {}

const LoginPage = (props: ILoginPageProps) => {
  return (
    <div>
      LoginPage
      <NavLink to="/profile">Login</NavLink>
    </div>
  );
};

export default LoginPage;
