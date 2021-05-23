import { useVideo } from "./../../contexts/video-context";
import "./playlist.css";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import axios from "axios";

export function Playlist() {
  const { state, dispatch, youtubePlayer, setYoutubePlayer } = useVideo();
  const playlistItem = state.playlist?.map((item) => {
    return item.playlistName;
  });

  function findPlaylist(playlist) {
    return state.playlist.find((item) => item.playlistName === playlist)
      .playlistVideos;
  }

  async function handleDeleteFromPlaylist(item, video) {
    const playlistId = state.playlist.find(
      (playlist) => playlist.playlistName == item
    )._id;
    const response = await axios.post(
      "https://serene-badlands-15662.herokuapp.com/playlist/video",
      { videoId: video._id, playlistId }
    );
    if (response.data.status) {
      dispatch({
        type: "REMOVE_VIDEO_FROM_PLAYLIST",
        video,
        item,
      });
    }
  }

  async function handleDeletePlaylist(item) {
    const response = await axios.post(
      "https://serene-badlands-15662.herokuapp.com/playlist",
      { playlistName: item }
    );

    if (response.data.status) {
      dispatch({ type: "DELETE_PLAYLIST", item });
    }
  }

  return (
    <div className="playlist">
      {playlistItem &&
        playlistItem.map((item) => (
          <li className="playlist-item" key={uuidv4()}>
            <div className="playlist-title">
              <h1>{item}</h1>
              <FontAwesomeIcon
                icon={faTrash}
                id="delete-icon"
                title="delete playlist"
                onClick={() => handleDeletePlaylist(item)}
              />
            </div>
            {state.playlist.length > 0 ? (
              <div className="playlist-videos">
                {findPlaylist(item).map((video) => (
                  <div className="video-item playlist-video" key={video.id}>
                    <img
                      src={video.items[0]["snippet"]["thumbnails"].standard.url}
                      alt={video.items[0].snippet.title}
                    />
                    <NavLink
                      to={`/video?id=${video.items[0].id}`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <div className="video-desc playlist-play">
                        <h4>{video.items[0]["snippet"].title}</h4>
                        <div>
                          <p id="channel-title">
                            {video.items[0]["snippet"]["channelTitle"]}
                          </p>
                          <div className="video-views">
                            <p>
                              {(
                                video.items[0]["statistics"].viewCount / 1000000
                              ).toFixed(2)}
                              M views
                            </p>
                            <p>
                              {Date(
                                video.items[0]["snippet"].publishedAt
                              ).slice(3, 15)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="delete-video"
                      onClick={() => handleDeleteFromPlaylist(item, video)}
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
