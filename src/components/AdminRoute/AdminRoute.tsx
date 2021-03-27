import { Route, Redirect, RouteProps } from "react-router-dom";
import { ReactNode } from "react";

export interface Props extends RouteProps {
  children?: ReactNode;
  isAdmin?: boolean;
}

const AdminRoute = ({ isAdmin, children, ...otherProps }: Props) => {
  return (
    <Route
      {...otherProps}
      render={() => (isAdmin ? children : <Redirect to="/login" />)}
    />
  );
};

export default AdminRoute;
