import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useVideo } from "../../contexts/video-context";
// import "./watchlater.css";
import { NavLink } from "react-router-dom";

export function LikedVideos() {
  const { state, setYoutubePlayer, youtubePlayer, dispatch } = useVideo();
  const { likedVideos } = state;

  {
    return likedVideos.length > 0 ? (
      <div className="watch-later">
        {likedVideos.map((video) => (
          <div className="watch-later-video" key={video.id}>
            <NavLink
              to={`/video?id=${video.id}`}
              style={{ textDecoration: "none", color: "white", width: "12rem" }}
            >
              <img
                src={video["snippet"]["thumbnails"].medium.url}
                alt={video["snippet"].title}
                style={{ height: "100%" }}
              />
            </NavLink>
            <div className="watch-later-desc">
              <h3>{video["snippet"].title}</h3>
              <p>{video["snippet"].channelTitle}</p>
            </div>
            <FontAwesomeIcon
              icon={faTrash}
              className="watch-later-delete"
              onClick={() =>
                dispatch({ type: "DELETE_VIDEO_FROM_LIKED_VIDEOS", video })
              }
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
