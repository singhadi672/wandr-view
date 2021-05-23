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
import { axiosCall } from "../../utilData";
import axios from "axios";
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

  const video = videoList.find((item) => item.items[0].id === query.get("id"));

  async function handleWatchLater(video) {
    try {
      if (!!state.watchLater.find((item) => item._id === video._id)) {
        const response = await axios.post(
          "https://serene-badlands-15662.herokuapp.com/watch-later",
          { id: video._id }
        );
        dispatch({
          type: "DELETE_VIDEO_FROM_WATCH_LATER",
          video,
        });
      } else {
        const response = await axios.post(
          "https://serene-badlands-15662.herokuapp.com/watch-later",
          { id: video._id }
        );
        dispatch({ type: "ADD_TO_WATCH_LATER", video });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleHistory(video) {
    if (!!state.videoHistory.find((item) => item._id === video._id)) {
    } else {
      const response = await axios.post(
        "https://serene-badlands-15662.herokuapp.com/history",
        { id: video._id }
      );
      dispatch({ type: "ADD_TO_HISTORY", video });
    }
  }

  async function handleLikedVideos(video) {
    try {
      if (!!state.likedVideos.find((item) => item._id === video._id)) {
        const response = await axios.post(
          "https://serene-badlands-15662.herokuapp.com/liked-videos",
          { id: video._id }
        );
        dispatch({
          type: "DELETE_VIDEO_FROM_LIKED_VIDEOS",
          video,
        });
      } else {
        const response = await axios.post(
          "https://serene-badlands-15662.herokuapp.com/liked-videos",
          { id: video._id }
        );
        dispatch({ type: "ADD_TO_LIKED_VIDEOS", video });
      }
    } catch (err) {
      console.log(err);
    }
  }

  {
    return video ? (
      <>
        <div className="player">
          <YouTube
            videoId={video.items[0].id}
            opts={opts}
            onPlay={() => handleHistory(video)}
          />
          <div className="player-desc">
            <h2>{video.items[0]["snippet"].title}</h2>
            <div className="player-other-info">
              <div className="player-count-date">
                <p>
                  {video.items[0]["statistics"].viewCount} views |
                  {Date(video.items[0]["snippet"].publishedAt).slice(3, 15)}
                </p>
              </div>
              <div className="player-user-options">
                <div
                  className="count-stat"
                  onClick={() => handleLikedVideos(video)}
                  style={
                    !!state.likedVideos.find((item) => item._id === video._id)
                      ? { color: "rgb(16, 134, 231)" }
                      : { color: "grey" }
                  }
                >
                  <FontAwesomeIcon icon={faThumbsUp} size="lg" />
                  <p>
                    {(video.items[0]["statistics"].likeCount / 1000).toFixed(0)}
                    K
                  </p>
                </div>
                <div className="count-stat">
                  <FontAwesomeIcon icon={faThumbsDown} size="lg" />
                  <p>
                    {(video.items[0]["statistics"].dislikeCount / 1000).toFixed(
                      0
                    )}
                    K
                  </p>
                </div>
                <button
                  className="player-btn"
                  title="add to watch later"
                  onClick={() => handleWatchLater(video)}
                  style={
                    !!state.watchLater.find((item) => item._id === video._id)
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
