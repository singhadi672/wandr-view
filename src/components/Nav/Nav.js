import React from "react";
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

export function Nav() {
  const { youtubePlayer, setYoutubePlayer } = useVideo();
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
        <button
          className="nav-btn option-btn"
          onClick={() => setYoutubePlayer({ ...youtubePlayer, status: "home" })}
        >
          <FontAwesomeIcon icon={faHome} size="lg" />
        </button>
        <button
          className="nav-btn option-btn"
          onClick={() =>
            setYoutubePlayer({ ...youtubePlayer, status: "history" })
          }
        >
          <FontAwesomeIcon icon={faHistory} size="lg" />
        </button>
        <button
          className="nav-btn option-btn"
          onClick={() =>
            setYoutubePlayer({ ...youtubePlayer, status: "playlist" })
          }
        >
          <FontAwesomeIcon icon={faIndent} size="lg" />
        </button>
        <button
          className="nav-btn option-btn"
          onClick={() =>
            setYoutubePlayer({ ...youtubePlayer, status: "watch-later" })
          }
        >
          <FontAwesomeIcon icon={faClock} size="lg" />
        </button>
        <button
          className="nav-btn option-btn"
          onClick={() =>
            setYoutubePlayer({ ...youtubePlayer, status: "liked-videos" })
          }
        >
          <FontAwesomeIcon icon={faThumbsUp} size="lg" />
        </button>
        <div className="avatar">
          <p>US</p>
        </div>
      </div>
    </nav>
  );
}
