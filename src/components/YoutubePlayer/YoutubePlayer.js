import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faClock,
  faIndent,
} from "@fortawesome/free-solid-svg-icons";

import React, { useState } from "react";
import YouTube from "react-youtube";
import { useVideo } from "../../contexts/video-context";
import "./youtubePlayer.css";
import { PlayListAdd } from "./../PlayListAdd/PlayListAdd";
export function YoutubePlayer() {
  const [playListWindow, setPlaylistWindow] = useState(false);
  const {
    youtubePlayer: { video },
    state,
    dispatch,
  } = useVideo();
  const opts = {
    height: "550",
    width: "95%",
    playerVars: {
      autoplay: 1,
    },
  };

  function handleWatchLater(video) {
    return !!state.watchLater.find((item) => item.id === video.id)
      ? null
      : dispatch({ type: "ADD_TO_WATCH_LATER", video });
  }

  return (
    <>
      <div className="player">
        <YouTube videoId={video.id} opts={opts} />
        <div className="player-desc">
          <h2>{video["snippet"].title}</h2>
          <div className="player-other-info">
            <div className="player-count-date">
              <p>
                {video["statistics"].viewCount} views |
                {Date(video["snippet"].publishedAt).slice(3, 15)}
              </p>
            </div>
            <div className="player-user-options">
              <div className="count-stat">
                <FontAwesomeIcon icon={faThumbsUp} size="lg" />
                <p>{(video["statistics"].likeCount / 1000).toFixed(0)}K</p>
              </div>
              <div className="count-stat">
                <FontAwesomeIcon icon={faThumbsDown} size="lg" />
                <p>{(video["statistics"].dislikeCount / 1000).toFixed(0)}K</p>
              </div>
              <button
                className="player-btn"
                title="add to watch later"
                onClick={() => handleWatchLater(video)}
              >
                <FontAwesomeIcon icon={faClock} size="lg" /> Later
              </button>
              <button
                className="player-btn"
                title="add to My Playlist"
                onClick={() => setPlaylistWindow((window) => true)}
              >
                <FontAwesomeIcon icon={faIndent} size="lg" /> My Playlist
              </button>
            </div>
          </div>
        </div>
      </div>
      {playListWindow && (
        <PlayListAdd
          playListWindow={playListWindow}
          setPlaylistWindow={setPlaylistWindow}
          video={video}
        />
      )}
    </>
  );
}
