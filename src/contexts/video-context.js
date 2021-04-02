import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { API_KEY, YOUTUBE_LINK } from "../utilData";
import { videoReducer } from "./../reducers/video-reducer";

export const VideoContext = createContext();

export function VideoProvider({ children }) {
  const [videoList, setVideoList] = useState([]);
  const [youtubePlayer, setYoutubePlayer] = useState({
    status: "home",
  });

  const [state, dispatch] = useReducer(videoReducer, {
    watchLater: [],
    playList: { 'My Playlist': [] },
  });

  useEffect(() => {
    (async () => {
      const {
        data: { items },
      } = await axios.get(`${YOUTUBE_LINK}&key=${API_KEY}`);
      setVideoList(items);
    })();
  }, []);
  return (
    <VideoContext.Provider
      value={{
        videoList,
        setVideoList,
        youtubePlayer,
        setYoutubePlayer,
        state,
        dispatch,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export function useVideo() {
  return useContext(VideoContext);
}
