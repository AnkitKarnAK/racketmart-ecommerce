import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isUserLogin, setIsUserLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = JSON.parse(localStorage?.getItem("login"));
    loginStatus?.isUserLoggedIn && setIsUserLogin(true);
  }, []);

  const loginWithCredential = (email, password) => {
    if (email === "admin@gmail.com" && password === "Admin@123") {
      setIsUserLogin(true);
      localStorage?.setItem("login", JSON.stringify({ isUserLoggedIn: true }));
    }
  };

  const logoutUser = () => {
    localStorage?.removeItem("login");
    setIsUserLogin(false);
    navigate("/products");
  };

  return (
    <AuthContext.Provider
      value={{ isUserLogin, loginWithCredential, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
