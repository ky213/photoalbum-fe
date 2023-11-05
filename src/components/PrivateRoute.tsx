//@ts-nocheck
//TODO fix typing after init redux store
import react, { ComponentProps } from "react";
import { Route, Navigate, RouteProps } from "react-router-dom";

import { IRoles } from "types/common";

export type IPrivateRouteProps = RouteProps & {
  role: IRoles;
};

const PrivateRoute: typeof Route = ({ Component, role, ...rest }: IPrivateRouteProps) => {
  const isAuthenticated = Boolean(currentUser);
  const isAuthorized = currentUser?.role === role;

  const checkAuthorities = (props: ComponentProps<any>) =>
    isAuthorized ? <Component {...props} /> : <h4>You are not authorized to access this page.</h4>;

  const renderRedirect = (props: ComponentProps<any>) => {
    return isAuthenticated ? (
      checkAuthorities(props)
    ) : (
      <Navigate
        to={{
          pathname: "/login",
          search: props.location.search,
        }}
        state={{ from: props.location }}
        replace
      />
    );
  };

  if (!Component) throw new Error(`A component needs to be specified for private route for path ${(rest as any).path}`);

  return <Route {...rest} Component={renderRedirect} />;
};

export default PrivateRoute;
