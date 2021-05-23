import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useVideo } from "../../contexts/video-context";
import axios from "axios";
import { NavLink } from "react-router-dom";

export function LikedVideos() {
  const { state, setYoutubePlayer, youtubePlayer, dispatch } = useVideo();
  const { likedVideos } = state;

  async function handleLikedVideos(video) {
    const response = await axios.post(
      "https://serene-badlands-15662.herokuapp.com/liked-videos",
      { id: video._id }
    );
    dispatch({ type: "DELETE_VIDEO_FROM_LIKED_VIDEOS", video });
  }

  {
    return likedVideos.length > 0 ? (
      <div className="watch-later">
        {likedVideos.map((video) => (
          <div className="watch-later-video" key={video.id}>
            <NavLink
              to={`/video?id=${video.items[0].id}`}
              style={{ textDecoration: "none", color: "white", width: "12rem" }}
            >
              <img
                src={video.items[0]["snippet"]["thumbnails"].medium.url}
                alt={video.items[0]["snippet"].title}
                style={{ height: "100%" }}
              />
            </NavLink>
            <div className="watch-later-desc">
              <h3>{video.items[0]["snippet"].title}</h3>
              <p>{video.items[0]["snippet"].channelTitle}</p>
            </div>
            <FontAwesomeIcon
              icon={faTrash}
              className="watch-later-delete"
              onClick={() => handleLikedVideos(video)}
            />
          </div>
        ))}
      </div>
    ) : (
      <div className="watch-later">
        <h2 className="no-video">No Liked videos yet!</h2>
      </div>
    );
  }
}
