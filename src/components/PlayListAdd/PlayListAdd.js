import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import React, { useRef, useState } from "react";
import "./playlistAdd.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useAuth } from "../../contexts/auth-context";

export function PlayListAdd({ playlistWindow, setPlaylistWindow, video }) {
  const { state, dispatch } = useAuth();
  const [newPlaylistRoute, setNewPlaylistRoute] = useState(false);
  const [newPlaylistText, setNewPlaylistText] = useState("");
  const inputRef = useRef(null);

  const playlistItems = state.playlist?.map((item) => {
    return item.playlistName;
  });

  function findVideoInPlaylist(item, video) {
    const targetPlaylist = state.playlist.find(
      (playlist) => playlist.playlistName == item
    );
    return !!targetPlaylist.playlistVideos.find((vid) => vid._id == video._id);
  }

  async function handelAddVideo(video, item) {
    const targetPlaylist = state.playlist.find(
      (playlist) => playlist.playlistName == item
    );

    const isVideoPresent = !!targetPlaylist.playlistVideos.find(
      (vid) => vid._id == video._id
    );
    if (isVideoPresent) {
      const response = await axios.post(
        "https://wandr-view-backend.vercel.app/playlist/video",
        { playlistId: targetPlaylist._id, videoId: video._id }
      );
      if (response.data.status) {
        dispatch({
          type: "REMOVE_VIDEO_FROM_PLAYLIST",
          video,
          item,
        });
      }
    } else {
      const response = await axios.post(
        "https://wandr-view-backend.vercel.app/playlist/video",
        { playlistId: targetPlaylist._id, videoId: video._id }
      );
      if (response.data.status) {
        dispatch({
          type: "ADD_VIDEO_TO_PLAYLIST",
          video,
          item,
        });
      }
    }
  }

  async function handleAddPlaylist(text) {
    const isPlaylist = !!state.playlist.find(
      (playlist) => playlist.playlistName == text
    );

    if (isPlaylist && text !== "") {
    } else {
      const response = await axios.post(
        "https://wandr-view-backend.vercel.app/playlist",
        {
          playlistName: text,
        }
      );
      if (response.data.status) {
        inputRef.current.value = "";
        dispatch({
          type: "ADD_NEW_PLAYLIST",
          payload: { text, playlistID: response.data.playlistID },
        });
      }
    }
  }

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
                checked={findVideoInPlaylist(item, video) ? true : false}
                name=""
                id=""
                onChange={() => handelAddVideo(video, item)}
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
              onClick={() => handleAddPlaylist(newPlaylistText)}
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
