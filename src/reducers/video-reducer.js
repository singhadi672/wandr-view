import React from "react";

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
    default:
      return state;
  }
}
