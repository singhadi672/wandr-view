import axios from "axios";
import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../contexts/auth-context";
import "./login.css";

export default function Login() {
  let navigate = useNavigate();
  let { state } = useLocation();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState({ status: false, msg: "" });
  const { loginUserWithCredentials, login } = useAuth();

  useEffect(() => {
    login && navigate("../", { replace: true });
  },[]);

  async function loginHandler() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (email && password) {
      setError({ ...error, status: false });
      try {
        const response = await loginUserWithCredentials(email, password);
        if (response.status && response.data.status) {
          setError({ ...error, status: false });
          navigate(state?.from ? `../${state.from}` : "/");
        } else {
          setError({ ...error, status: true, msg: "invalid username/password" });
        }
      } catch (error) {
        setError({ ...error, status: true, msg: "something went wrong!" });
      }
    } else {
      setError({
        ...error,
        status: true,
        msg: "please Enter mandatory Fields!",
      });
    }
  }

  return (
    <div className="login-main">
      <h1 className="login-heading">Wandr-View</h1>
      <div className="login-form">
        <h2>Login</h2>
        {error.status && <small style={{ color: "tomato" }}>{error.msg}</small>}
        <div className="email">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            name="email"
            id="email"
            ref={emailRef}
            required
            placeholder="mail@website.com"
          />
        </div>
        <div className="password">
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            ref={passwordRef}
            placeholder="password"
          />
        </div>
        <button className="login-button" onClick={loginHandler}>
          Login
        </button>
        <div className="signup-link">
          <p>
            New to Wandr-View?{" "}
            <span onClick={() => navigate("../signup", { replace: true })}>
              Sign Up!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
