import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useLoginMutation } from "src/data/api";

export interface ILoginPageProps {}

const LoginPage = (props: ILoginPageProps) => {
  const [login, { data, error, isLoading }] = useLoginMutation();

  useEffect(() => {
    login({ email: "any", password: "any" });
  }, []);

  return (
    <div>
      LoginPage
      <NavLink to="/profile">Login</NavLink>
    </div>
  );
};

export default LoginPage;
