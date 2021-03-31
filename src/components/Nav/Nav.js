import React from "react";
import "./nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faClock,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";

export function Nav() {
  return (
    <nav className="main-nav">
      <div className="logo">
        <div className="circle">
          <div className="square1"></div>
          <div className="square2"></div>
        </div>
        <h1 className="logo-caption">Wandr-View</h1>
      </div>
      <div className="nav-search">
        <input type="text" name="search" placeholder="Search" />
        <button className="nav-btn search-btn">
          <FontAwesomeIcon icon={faSearch} size="lg" />
        </button>
      </div>
      <div className="nav-options">
        <button className="nav-btn option-btn">
          <FontAwesomeIcon icon={faFolderOpen} size="lg" />
        </button>
        <button className="nav-btn option-btn">
          <FontAwesomeIcon icon={faClock} size="lg" />
        </button>
        <div className="avatar">
          <p>US</p>
        </div>
      </div>
    </nav>
  );
}
