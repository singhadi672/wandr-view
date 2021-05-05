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
import { useLocation, useParams } from "react-router-dom";
export function YoutubePlayer() {
  const [playListWindow, setPlaylistWindow] = useState(false);
  const [sizeOfWindow, setSizeOfWindow] = useState(window.innerWidth);
  const { state, dispatch, videoList } = useVideo();
  const opts = {
    height: sizeOfWindow > 900 ? "550" : "300",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  window.onresize = () => {
    setSizeOfWindow(window.innerWidth);
  };

  const query = new URLSearchParams(useLocation().search);

  const video = videoList.find((item) => item.id === query.get("id"));

  function handleWatchLater(video) {
    return !!state.watchLater.find((item) => item.id === video.id)
      ? null
      : dispatch({ type: "ADD_TO_WATCH_LATER", video });
  }

  function handleHistory(video) {
    return !!state.videoHistory.find((item) => item.id === video.id)
      ? null
      : dispatch({ type: "ADD_TO_HISTORY", video });
  }
  function handleLikedVideos(video) {
    return !!state.likedVideos.find((item) => item.id === video.id)
      ? dispatch({ type: "DELETE_VIDEO_FROM_LIKED_VIDEOS", video })
      : dispatch({ type: "ADD_TO_LIKED_VIDEOS", video });
  }

  {
    return video ? (
      <>
        <div className="player">
          <YouTube
            videoId={video.id}
            opts={opts}
            onPlay={() => handleHistory(video)}
          />
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
                <div
                  className="count-stat"
                  onClick={() => handleLikedVideos(video)}
                  style={
                    !!state.likedVideos.find((item) => item.id === video.id)
                      ? { color: "rgb(16, 134, 231)" }
                      : { color: "grey" }
                  }
                >
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
                  style={
                    !!state.watchLater.find((item) => item.id === video.id)
                      ? { color: "rgb(16, 134, 231)" }
                      : null
                  }
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
    ) : (
      <></>
    );
  }
}
