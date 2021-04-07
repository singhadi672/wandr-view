import React from "react";
import "./error.css";
import { NavLink } from "react-router-dom";

export function Error() {
  return (
    <div className="error">
      <div className="error-modal">
        <h1>404</h1>
        <p>The requested page doesn't exist!</p>
        <NavLink to="/" className="link">
          Home
        </NavLink>
      </div>
    </div>
  );
}
