import React, { useState } from "react";
import { useAuthContext } from "../context/auth-context";
import { useLocation, useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { isUserLogin, loginWithCredential } = useAuthContext();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();
    loginWithCredential(userEmail, userPassword);
    navigate(state?.from ? state.from : "/");
  };
  return (
    <>
      <div>{isUserLogin ? "You're logged In" : "you're logged out"}</div>

      <div className="login-container">
        <div className="h2 login-title">LOGIN</div>
        <form className="login-form" onSubmit={loginHandler}>
          <div className="input-box login-email-input">
            <input
              placeholder="Enter your email here"
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
              className="effect-1"
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              maxlength="50"
              required
            />
            <span class="focus-border"></span>
          </div>

          <div className="input-box login-password-input">
            <input
              placeholder="Enter your password here"
              value={userPassword}
              onChange={(e) => {
                setUserPassword(e.target.value);
              }}
              className="effect-1"
              type="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              maxlength="20"
              required
            />
            <span class="focus-border"></span>
          </div>

          <button className="button-primary login-button" type="submit">
            LOGIN
          </button>

          <div className="login-other-link-text">
            Forgot your password?{" "}
            <Link to="/forgot" className="login-other-link">
              Reset here
            </Link>
          </div>
          <div className="login-other-link-text">
            Not a user yet?{" "}
            <Link
              to="/signup"
              className="login-other-link"
              // state={{ from: state?.from ? state.from : "/" }}
            >
              Create your account
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
