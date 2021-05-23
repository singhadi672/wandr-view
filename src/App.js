import "./App.css";
import { useVideo } from "./contexts/video-context";
import VideoList from "./components/VideoList/VideoList";
import { Nav } from "./components/Nav/Nav";
import { SideMenu } from "./components/SideMenu/SideMenu";
import { YoutubePlayer } from "./components/YoutubePlayer/YoutubePlayer";
import { WatchLater } from "./components/WatchLater/WatchLater";
import { Playlist } from "./components/Playlist/Playlist";
import { History } from "./components/History/History";
import { LikedVideos } from "./components/LikedVideos/LikedVideos";
import { Error } from "./components/Error/Error";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader/Loader";
function App() {
  const { loader } = useVideo();

  return (
    <div className="App">
      <Nav />
      <div className="content">
        <SideMenu />
        <Routes>
          <Route path="/" element={<VideoList />}></Route>
          <Route path="/video" exact element={<YoutubePlayer />}></Route>
          <Route path="/watch-later" element={<WatchLater />}></Route>
          <Route path="/playlist" element={<Playlist />}></Route>
          <Route path="/history" exact element={<History />}></Route>
          <Route path="/liked-videos" element={<LikedVideos />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </div>
      {loader && <Loader />}
    </div>
  );
}

export default App;
