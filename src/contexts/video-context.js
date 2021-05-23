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
import { axiosCall } from "../utilData";

export const VideoContext = createContext();

export function VideoProvider({ children }) {
  const [videoList, setVideoList] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [loader, setLoader] = useState(true);

  const [state, dispatch] = useReducer(videoReducer, {
    watchLater: [],
    playlist: [],
    videoHistory: [],
    likedVideos: [],
  });

  useEffect(() => {
    (async () => {
      const {
        data: { videos },
      } = await axiosCall(
        "GET",
        "https://serene-badlands-15662.herokuapp.com/videos"
      );

      const {
        data: { user },
      } = await axiosCall(
        "GET",
        "https://serene-badlands-15662.herokuapp.com/users"
      );
      dispatch({ type: "ADD_INITIAL_DATA", payload: user });
      setVideoList(videos);
      setLoader(false);
    })();
  }, []);
  return (
    <VideoContext.Provider
      value={{
        videoList,
        setVideoList,
        searchString,
        setSearchString,
        state,
        dispatch,
        loader,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export function useVideo() {
  return useContext(VideoContext);
}
