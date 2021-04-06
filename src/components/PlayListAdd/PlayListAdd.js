import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import React, { useRef, useState } from "react";
import { useVideo } from "../../contexts/video-context";
import "./playlistAdd.css";
import { v4 as uuidv4 } from "uuid";

export function PlayListAdd({ playlistWindow, setPlaylistWindow, video }) {
  const { state, dispatch } = useVideo();
  const [newPlaylistRoute, setNewPlaylistRoute] = useState(false);
  const [newPlaylistText, setNewPlaylistText] = useState("");
  const inputRef = useRef(null);

  const playlistItems = Object.keys(state.playList);

  return (
    <>
      <div className="playlist-add"></div>
      <div className="playlist-card">
        <div className="playlist-card-top">
          <p>Add To Playlist...</p>
          <FontAwesomeIcon
            icon={faTimes}
            style={{ cursor: "pointer" }}
            onClick={() => setPlaylistWindow(() => false)}
          />
        </div>
        <div className="playlist-card-list">
          {playlistItems.map((item) => (
            <li key={uuidv4()}>
              <input
                type="checkbox"
                className="checkbox"
                checked={
                  state.playList[item].find((item) => item.id === video.id)
                    ? true
                    : false
                }
                name=""
                id=""
                onChange={() => {
                  return state.playList[item].find(
                    (item) => item.id === video.id
                  )
                    ? dispatch({
                        type: "REMOVE_VIDEO_FROM_PLAYLIST",
                        video,
                        item,
                      })
                    : dispatch({
                        type: "ADD_VIDEO_TO_PLAYLIST",
                        video,
                        item,
                      });
                }}
              />
              <p>{item}</p>
            </li>
          ))}
        </div>
        {newPlaylistRoute ? (
          <div className="playlist-new-playlist">
            <input
              type="text"
              ref={inputRef}
              name="playlist"
              id=""
              placeholder="Playlist name"
              required
              maxLength="20"
              onChange={(e) => setNewPlaylistText(e.target.value)}
            />
            <button
              className="playlist-btn"
              onClick={() => {
                {
                  inputRef.current.value = "";
                  return newPlaylistText === ""
                    ? null
                    : dispatch({
                        type: "ADD_NEW_PLAYLIST",
                        payload: newPlaylistText,
                      });
                }
              }}
            >
              Create
            </button>
          </div>
        ) : (
          <div
            className="playlist-card-bottom"
            onClick={() => setNewPlaylistRoute((route) => !route)}
          >
            <FontAwesomeIcon icon={faPlus} />
            <p>create new playlist</p>
          </div>
        )}
      </div>
    </>
  );
}
