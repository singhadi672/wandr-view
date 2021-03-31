import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { API_KEY, YOUTUBE_LINK } from "../utilData";

export const VideoContext = createContext();

export function VideoProvider({ children }) {
  const [videoList, setVideoList] = useState([]);
  useEffect(() => {
    (async () => {
      const {
        data: { items },
      } = await axios.get(`${YOUTUBE_LINK}&key=${API_KEY}`);
      setVideoList(items);
    })();
  }, []);
  return (
    <VideoContext.Provider value={{videoList, setVideoList}}>
      {children}
    </VideoContext.Provider>
  );
}

export function useVideo() {
  return useContext(VideoContext);
}
