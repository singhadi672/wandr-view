import React, { useEffect } from "react";
import { useAuth } from "../../contexts/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import "./logout.css";
import { setupAuthHeaderForServiceCalls } from "../../utilData";
import { useNavigate } from "react-router";

export default function Logout({ setLogout }) {
  const { state, login, setLogin, dispatch } = useAuth();
  let navigate = useNavigate();
  function logoutHandler() {
    if (login) {
      localStorage?.removeItem("login");
      setupAuthHeaderForServiceCalls(null);
      dispatch({ type: "RESET_DATA" });
      setLogin(false);
      navigate("../login");
    } else {
      navigate("../login");
      setLogout(false);
    }
  }

  return (
    <div className="logout">
      <div className="user">
        <div className="user-avatar">
          {login ? (
            <h3>{state.username.slice(0, 2).toUpperCase()}</h3>
          ) : (
            <h3>US</h3>
          )}
        </div>
        <h5>{login ? state.username : "User"}</h5>
      </div>
      <div className="options" onClick={logoutHandler}>
        <FontAwesomeIcon icon={login ? faSignOutAlt : faSignInAlt} size="lg" />
        <p>{login ? "Logout" : "Login"}</p>
      </div>
    </div>
  );
}
