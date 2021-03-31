import React from "react";
import { useVideo } from "../contexts/video-context";

export default function VideoList() {
  const { videoList } = useVideo();

  return videoList.map((video) => (
    <li>
      <iframe
        src={`https://www.youtube.com/embed/${video.id}`}
        frameborder="0"
      ></iframe>
      {video["snippet"].title}
    </li>
  ));
}
