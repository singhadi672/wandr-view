import React from "react";
import { useVideo } from "../../contexts/video-context";
import "./watchlater.css";

export function WatchLater() {
  const { state, setYoutubePlayer, youtubePlayer } = useVideo();
  const { watchLater } = state;

  return (
    <div className="watch-later">
      {watchLater.map((video) => (
        <div
          className="watch-later-video"
          onClick={() =>
            setYoutubePlayer({ ...youtubePlayer, status: "video", video })
          }
        >
          <img
            src={video["snippet"]["thumbnails"].medium.url}
            alt={video["snippet"].title}
          />
          <div className="watch-later-desc">
            <h3>{video["snippet"].title}</h3>
            <p>{video["snippet"].channelTitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
