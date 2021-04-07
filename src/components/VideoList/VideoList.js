import React from "react";
import { useVideo } from "../../contexts/video-context";
import "./videoList.css";
import { NavLink } from "react-router-dom";

export default function VideoList() {
  const {
    videoList,
    setYoutubePlayer,
    youtubePlayer,
    searchString,
  } = useVideo();

  function searchData(videoList, searchString) {
    return videoList.filter((item) =>
      item["snippet"].title.toLowerCase().includes(searchString.toLowerCase())
    );
  }

  const searchedData = searchData(videoList, searchString);

  return (
    <div className="videolist">
      {searchedData.map((video) => (
        <NavLink
          to={`/video?id=${video.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div className="video-item" key={video.id}>
            <img
              src={video["snippet"]["thumbnails"].high.url}
              alt={video.snippet.title}
            />
            <div className="video-desc">
              <h4>{video["snippet"].title}</h4>
              <div>
                <p id="channel-title">{video["snippet"]["channelTitle"]}</p>
                <div className="video-views">
                  <p>
                    {(video["statistics"].viewCount / 1000000).toFixed(2)}M
                    views
                  </p>
                  <p>{Date(video["snippet"].publishedAt).slice(3, 15)}</p>
                </div>
              </div>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
}
