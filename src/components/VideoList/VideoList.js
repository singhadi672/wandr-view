import React from "react";
import { useVideo } from "../../contexts/video-context";
import "./videoList.css";
import { NavLink } from "react-router-dom";

export default function VideoList() {
  const { videoList, setYoutubePlayer, youtubePlayer, searchString } =
    useVideo();

  console.log(videoList);

  function searchData(videoList, searchString) {
    return videoList.filter((item) =>
      item.items[0]["snippet"].title
        .toLowerCase()
        .includes(searchString.toLowerCase())
    );
  }

  const searchedData = searchData(videoList, searchString);

  return (
    <div className="videolist">
      {searchedData.map((video) => (
        <NavLink
          to={`/video?id=${video.items[0].id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div className="video-item" key={video.id}>
            <img
              src={video.items[0]["snippet"]["thumbnails"].high.url}
              alt={video.items[0].snippet.title}
            />
            <div className="video-desc">
              <h4>{video.items[0]["snippet"].title}</h4>
              <div>
                <p id="channel-title">
                  {video.items[0]["snippet"]["channelTitle"]}
                </p>
                <div className="video-views">
                  <p>
                    {(video.items[0]["statistics"].viewCount / 1000000).toFixed(
                      2
                    )}
                    M views
                  </p>
                  <p>{video.items[0]["snippet"].publishedAt.slice(0, 10)}</p>
                </div>
              </div>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
}
