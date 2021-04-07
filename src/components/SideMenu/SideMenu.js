import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faHistory,
  faHome,
  faIndent,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./sideMenu.css";
import { useVideo } from "../../contexts/video-context";
import { NavLink, Link } from "react-router-dom";

export function SideMenu() {
  return (
    <div className="side-menu">
      <ul className="menu-items">
        <li>
          <div>
            <NavLink
              className="menu-item"
              end
              to="/"
              style={{ textDecoration: "none" }}
              activeClassName="selected"
            >
              <FontAwesomeIcon icon={faHome} size="lg"></FontAwesomeIcon>
              <h4>Home</h4>
            </NavLink>
          </div>
        </li>
        <li>
          <div>
            <NavLink
              to="history"
              className="menu-item"
              style={{ textDecoration: "none" }}
              activeClassName="selected"
            >
              <FontAwesomeIcon icon={faHistory} size="lg"></FontAwesomeIcon>
              <h4>History</h4>
            </NavLink>
          </div>
        </li>
        <li>
          <div>
            <NavLink
              to="playlist"
              className="menu-item"
              style={{ textDecoration: "none" }}
              activeClassName="selected"
            >
              <FontAwesomeIcon icon={faIndent} size="lg"></FontAwesomeIcon>
              <h4>Playlist</h4>
            </NavLink>
          </div>
        </li>
        <li>
          <div>
            <NavLink
              to="watch-later"
              className="menu-item"
              style={{ textDecoration: "none" }}
              activeClassName="selected"
            >
              <FontAwesomeIcon icon={faClock} size="lg"></FontAwesomeIcon>
              <h4>Watch Later</h4>
            </NavLink>
          </div>
        </li>
        <li>
          <div>
            <NavLink
              to="liked-videos"
              className="menu-item"
              style={{ textDecoration: "none" }}
              activeClassName="selected"
            >
              <FontAwesomeIcon icon={faThumbsUp} size="lg"></FontAwesomeIcon>
              <h4>Liked Videos</h4>
            </NavLink>
          </div>
        </li>
      </ul>
    </div>
  );
}
