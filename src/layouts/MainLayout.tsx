import React, { PropsWithChildren } from "react";

export interface IMainLAyoutProps extends PropsWithChildren {}

const MainLayout = (props: IMainLAyoutProps) => {
  return <div>{props.children}</div>;
};

export default MainLayout;
