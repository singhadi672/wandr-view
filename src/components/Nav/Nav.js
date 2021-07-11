import React, { useState } from "react";
import "./nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faClock,
  faHome,
  faHistory,
  faIndent,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { useVideo } from "../../contexts/video-context";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import Logout from "../Logout/Logout";

export function Nav() {
  const { setSearchString } = useVideo();
  const { state, login } = useAuth();
  const [logout, setLogout] = useState(false);

  return (
    <>
      <nav className="main-nav">
        <div className="logo">
          <div className="circle">
            <div className="square1"></div>
            <div className="square2"></div>
          </div>
          <h1 className="logo-caption">Wandr-View</h1>
        </div>
        <div className="nav-search">
          <input
            type="text"
            name="search"
            placeholder="Search by video title"
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
          />
          <button className="nav-btn search-btn">
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </button>
        </div>
        <div className="nav-options">
          <NavLink to="/" style={{ textDecoration: "none", color: "white" }}>
            <button className="nav-btn option-btn">
              <FontAwesomeIcon icon={faHome} size="lg" />
            </button>
          </NavLink>
          <NavLink
            to="history"
            style={{ textDecoration: "none", color: "white" }}
          >
            <button className="nav-btn option-btn">
              <FontAwesomeIcon icon={faHistory} size="lg" />
            </button>
          </NavLink>
          <NavLink
            to="playlist"
            style={{ textDecoration: "none", color: "white" }}
          >
            <button className="nav-btn option-btn">
              <FontAwesomeIcon icon={faIndent} size="lg" />
            </button>
          </NavLink>
          <NavLink
            to="watch-later"
            style={{ textDecoration: "none", color: "white" }}
          >
            <button className="nav-btn option-btn">
              <FontAwesomeIcon icon={faClock} size="lg" />
            </button>
          </NavLink>
          <NavLink
            to="liked-videos"
            style={{ textDecoration: "none", color: "white" }}
          >
            <button className="nav-btn option-btn">
              <FontAwesomeIcon icon={faThumbsUp} size="lg" />
            </button>
          </NavLink>
          <div
            className="avatar"
            onClick={() => setLogout((logout) => !logout)}
          >
            <p>
              {state.username ? state.username.slice(0, 2).toUpperCase() : "US"}
            </p>
          </div>
        </div>
      </nav>
      {login && logout && <Logout setLogout={setLogout} />}
    </>
  );
}
