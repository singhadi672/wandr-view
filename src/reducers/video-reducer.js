export function videoReducer(state, { type, video, payload, item }) {
  switch (type) {
    case "ADD_TO_WATCH_LATER":
      return { ...state, watchLater: [...state.watchLater, video] };
    case "ADD_NEW_PLAYLIST":
      return { ...state, playList: { ...state.playList, [payload]: [] } };
    case "ADD_VIDEO_TO_PLAYLIST":
      return {
        ...state,
        playList: {
          ...state.playList,
          [item]: [...state.playList[item], video],
        },
      };
    case "REMOVE_VIDEO_FROM_PLAYLIST":
      return {
        ...state,
        playList: {
          ...state.playList,
          [item]: [
            ...state.playList[item].filter((item) => item.id !== video.id),
          ],
        },
      };
    case "DELETE_VIDEO_FROM_WATCH_LATER":
      return {
        ...state,
        watchLater: [
          ...state.watchLater.filter((item) => item.id !== video.id),
        ],
      };
    case "DELETE_PLAYLIST":
      delete state.playList[item];
      return { ...state };
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
          ...state.likedVideos.filter((item) => item.id !== video.id),
        ],
      };
    default:
      return state;
  }
}
