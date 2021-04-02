import React, { useState } from "react";
import YouTube from "react-youtube";
import { useVideo } from "../../contexts/video-context";
import { YoutubePlayer } from "../YoutubePlayer/YoutubePlayer";
import "./videoList.css";

export default function VideoList() {
  const { videoList, setYoutubePlayer, youtubePlayer } = useVideo();

  return (
    <div className="videolist">
      {videoList.map((video) => (
        <div
          className="video-item"
          onClick={() =>
            setYoutubePlayer({ ...youtubePlayer, status: "video", video })
          }
          key={video.id}
        >
          <img
            src={video["snippet"]["thumbnails"].standard.url}
            alt={video.snippet.title}
          />
          <div className="video-desc">
            <h4>{video["snippet"].title}</h4>
            <div>
              <p id="channel-title">{video["snippet"]["channelTitle"]}</p>
              <div className="video-views">
                <p>
                  {(video["statistics"].viewCount / 1000000).toFixed(2)}M views
                </p>
                <p>{Date(video["snippet"].publishedAt).slice(3, 15)}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
