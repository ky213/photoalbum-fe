import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useLoginMutation } from "src/data/api";

export interface ILoginPageProps {}

const LoginPage = (props: ILoginPageProps) => {
  //@ts-ignore
  const { data, error, isLoading } = useLoginMutation("bulbasaur");
  useEffect(() => {
    console.log(data, error, isLoading);
  }, [data, isLoading]);

  return (
    <div>
      LoginPage
      <NavLink to="/profile">Login</NavLink>
    </div>
  );
};

export default LoginPage;
