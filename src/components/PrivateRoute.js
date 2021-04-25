import { useAuthContext } from "../context/auth-context";
import { Route, Navigate } from "react-router-dom";

export const PrivateRoute = ({ path, ...props }) => {
  const { isUserLogin } = useAuthContext();

  return isUserLogin ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate replace state={{ from: path }} to="/login" />
  );
};
