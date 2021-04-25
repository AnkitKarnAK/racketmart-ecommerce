import { useAuthContext } from "../context/auth-context";
import { Route, Navigate } from "react-router-dom";

export const PrivateRoute = ({ path, ...props }) => {
  const { isUserLogin } = useAuthContext();

  console.log("private route islogin check", isUserLogin);

  if (isUserLogin) {
    return <Route {...props} path={path} />;
  }
  return <Navigate replace state={{ from: path }} to="/login" />;
};
