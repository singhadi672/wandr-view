import React, { useRef, useState, useEffect } from "react";
import "./signup.css";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../contexts/auth-context";

export default function Signup() {
  let navigate = useNavigate();
  let { state } = useLocation();
  const { signupUser, login } = useAuth();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);
  const [error, setError] = useState({ status: false, msg: "" });

  useEffect(() => {
    login && navigate("../", { replace: true });
  });

  async function signupHandler() {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const email = emailRef.current.value;
    if (username && email && password) {
      setError({ ...error, status: false });
      try {
        const response = await signupUser(username, email, password);
        if (response.status && response.data.status) {
          setError({ ...error, status: false });
          navigate(state?.from ? `../${state.from}` : "/");
        } else {
          setError({ ...error, status: true, msg: "user Already Present" });
        }
      } catch (error) {
        setError({ ...error, status: true, msg: "something went wrong" });
      }
    } else {
      setError({
        ...error,
        status: true,
        msg: "Please enter mandatory Details!",
      });
    }
  }

  return (
    <div className="signup-main">
      <h1 className="signup-heading">Wandr-View</h1>
      <div className="signup-form">
        <h2>Sign-up</h2>
        <div className="username">
          {error.status && (
            <small style={{ color: "tomato" }}>{error.msg}</small>
          )}
          <label htmlFor="username">Username*</label>
          <input
            ref={usernameRef}
            type="text"
            name="username"
            id="username"
            required
            maxLength={25}
            placeholder="max. 25 characters"
          />
        </div>
        <div className="email">
          <label htmlFor="email">Email*</label>
          <input
            ref={emailRef}
            type="email"
            name="email"
            id="email"
            required
            placeholder="mail@website.com"
          />
        </div>
        <div className="password">
          <label htmlFor="password">Password*</label>
          <input
            ref={passwordRef}
            type="password"
            name="password"
            id="password"
            required
            placeholder="password"
          />
        </div>
        <button className="signup-button" onClick={signupHandler}>
          Sign up
        </button>
        <div className="login-link">
          <p>
            Have an Account?{" "}
            <span onClick={() => navigate("../login", { replace: true })}>
              Login!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
