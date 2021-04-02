import react from "react";
import { useVideo } from "./../../contexts/video-context";
import "./playlist.css";

export function Playlist() {
  const { state, dispatch, youtubePlayer, setYoutubePlayer } = useVideo();

  const playlistItem = Object.keys(state.playList);
  console.log(playlistItem);
  return (
    <div className="playlist">
      {playlistItem.map((item) => (
        <li className="playlist-item">
          <h1>{item}</h1>
          <div className="playlist-videos">
            {state.playList[item].map((video) => (
              <div
                className="video-item"
                onClick={() =>
                  setYoutubePlayer({ ...youtubePlayer, status: "video", video })
                }
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
                        {(video["statistics"].viewCount / 1000000).toFixed(2)}M
                        views
                      </p>
                      <p>{Date(video["snippet"].publishedAt).slice(3, 15)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </li>
      ))}
    </div>
  );
}
