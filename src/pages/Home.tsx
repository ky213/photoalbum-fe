import React from "react";
import { NavLink } from "react-router-dom";

export interface IHomePageProps {}

const HomePage = (props: IHomePageProps) => {
  return (
    <div>
      HomePage
      <NavLink to="/login">Login</NavLink>
    </div>
  );
};

export default HomePage;
