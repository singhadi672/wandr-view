import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faHistory,
  faHome,
  faIndent,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./sideMenu.css";
import { useVideo } from "../../contexts/video-context";

export function SideMenu() {
  const { youtubePlayer, setYoutubePlayer } = useVideo();
  return (
    <div className="side-menu">
      <ul className="menu-items">
        <li>
          <div
            className="menu-item"
            onClick={() =>
              setYoutubePlayer({ ...youtubePlayer, status: "home" })
            }
          >
            <FontAwesomeIcon icon={faHome} size="lg"></FontAwesomeIcon>
            <h4>Home</h4>
          </div>
        </li>
        <li>
          <div className="menu-item">
            <FontAwesomeIcon icon={faHistory} size="lg"></FontAwesomeIcon>
            <h4>History</h4>
          </div>
        </li>
        <li>
          <div
            className="menu-item"
            onClick={() =>
              setYoutubePlayer({ ...youtubePlayer, status: "playlist" })
            }
          >
            <FontAwesomeIcon icon={faIndent} size="lg"></FontAwesomeIcon>
            <h4>Playlist</h4>
          </div>
        </li>
        <li>
          <div
            className="menu-item"
            onClick={() =>
              setYoutubePlayer({ ...youtubePlayer, status: "watch-later" })
            }
          >
            <FontAwesomeIcon icon={faClock} size="lg"></FontAwesomeIcon>
            <h4>Watch Later</h4>
          </div>
        </li>
      </ul>
    </div>
  );
}
