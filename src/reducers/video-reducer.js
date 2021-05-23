export function videoReducer(state, { type, video, payload, item }) {
  switch (type) {
    case "ADD_INITIAL_DATA":
      return {
        ...state,
        watchLater: payload.watchLater,
        videoHistory: payload.history,
        likedVideos: payload.likedVideos,
        playlist: payload.playlist,
      };
    case "ADD_TO_WATCH_LATER":
      return { ...state, watchLater: [...state.watchLater, video] };
    case "ADD_NEW_PLAYLIST":
      return {
        ...state,
        playlist: [
          ...state.playlist,
          { playlistName: [payload], playlistVideos: [] },
        ],
      };
    case "ADD_VIDEO_TO_PLAYLIST":
      return {
        ...state,
        playlist: state.playlist.map((playlist) => {
          if (playlist.playlistName === item) {
            return {
              ...playlist,
              playlistVideos: [...playlist.playlistVideos, video],
            };
          } else {
            return playlist;
          }
        }),
      };
    case "REMOVE_VIDEO_FROM_PLAYLIST":
      return {
        ...state,
        playlist: state.playlist.map((playlist) => {
          if (playlist.playlistName === item) {
            return {
              ...playlist,
              playlistVideos: playlist.playlistVideos.filter(
                (vid) => vid._id != video._id
              ),
            };
          } else {
            return playlist;
          }
        }),
      };
    case "DELETE_VIDEO_FROM_WATCH_LATER":
      return {
        ...state,
        watchLater: [
          ...state.watchLater.filter((item) => item._id !== video._id),
        ],
      };
    case "DELETE_PLAYLIST":
      console.log(item);
      return {
        ...state,
        playlist: state.playlist.filter(
          (playlist) => playlist.playlistName != item
        ),
      };
    case "ADD_TO_HISTORY":
      return { ...state, videoHistory: [...state.videoHistory, video] };
    case "CLEAR_HISTORY":
      return { ...state, videoHistory: [] };
    case "ADD_TO_LIKED_VIDEOS":
      return { ...state, likedVideos: [...state.likedVideos, video] };
    case "DELETE_VIDEO_FROM_LIKED_VIDEOS":
      return {
        ...state,
        likedVideos: [
          ...state.likedVideos.filter((item) => item._id !== video._id),
        ],
      };
    default:
      return state;
  }
}
