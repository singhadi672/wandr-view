import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { axiosCall } from "../utilData";
export const VideoContext = createContext();
export function VideoProvider({ children }) {
  const [videoList, setVideoList] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    (async () => {
      const {
        data: { videos },
      } = await axiosCall(
        "GET",
        "https://fast-savannah-42620.herokuapp.com/videos"
      );
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
