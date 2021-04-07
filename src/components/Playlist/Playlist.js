import { useVideo } from "./../../contexts/video-context";
import "./playlist.css";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

export function Playlist() {
  const { state, dispatch, youtubePlayer, setYoutubePlayer } = useVideo();
  const playlistItem = Object.keys(state.playList);

  return (
    <div className="playlist">
      {playlistItem.map((item) => (
        <li className="playlist-item" key={uuidv4()}>
          <div className="playlist-title">
            <h1>{item}</h1>
            <FontAwesomeIcon
              icon={faTrash}
              id="delete-icon"
              title="delete playlist"
              onClick={() => dispatch({ type: "DELETE_PLAYLIST", item })}
            />
          </div>
          {state.playList[item].length > 0 ? (
            <div className="playlist-videos">
              {state.playList[item].map((video) => (
                <div className="video-item playlist-video" key={video.id}>
                  <img
                    src={video["snippet"]["thumbnails"].standard.url}
                    alt={video.snippet.title}
                  />
                  <NavLink
                    to={`/video?id=${video.id}`}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <div className="video-desc playlist-play">
                      <h4>{video["snippet"].title}</h4>
                      <div>
                        <p id="channel-title">
                          {video["snippet"]["channelTitle"]}
                        </p>
                        <div className="video-views">
                          <p>
                            {(video["statistics"].viewCount / 1000000).toFixed(
                              2
                            )}
                            M views
                          </p>
                          <p>
                            {Date(video["snippet"].publishedAt).slice(3, 15)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="delete-video"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_VIDEO_FROM_PLAYLIST",
                        video,
                        item,
                      })
                    }
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="no-video-playlist">Your playlist is empty</p>
          )}
        </li>
      ))}
    </div>
  );
}
