import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { IRoles } from "src/data/types/common";
import { useRegisterMutation } from "src/data/api";

export interface IRegisterPageProps {}

const RegisterPage = () => {
  const [register, { data, error, isLoading }] = useRegisterMutation();

  useEffect(() => {
    register({
      firstName: "string",
      lastName: "string",
      email: "string",
      password: "string",
      role: IRoles.ADMIN,
      active: true,
      photos: [],
      avatar: "",
    });
  }, []);

  return (
    <h1>
      RegisterPage
      <NavLink to="/">Home</NavLink>
    </h1>
  );
};

export default RegisterPage;
