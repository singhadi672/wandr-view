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
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Loader from "./components/Loader/Loader";
import { useAuth } from "./contexts/auth-context";
function App() {
  const { loader } = useVideo();
  const { PrivateRoute } = useAuth();

  return (
    <div className="App">
      <Nav />
      <div className="content">
        <SideMenu />
        <Routes>
          <Route path="/" element={<VideoList />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/video" exact element={<YoutubePlayer />}></Route>
          <PrivateRoute
            path="/watch-later"
            element={<WatchLater />}
          ></PrivateRoute>
          <PrivateRoute path="/playlist" element={<Playlist />}></PrivateRoute>
          <PrivateRoute
            path="/history"
            exact
            element={<History />}
          ></PrivateRoute>
          <PrivateRoute
            path="/liked-videos"
            element={<LikedVideos />}
          ></PrivateRoute>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </div>
      {loader && <Loader />}
    </div>
  );
}

export default App;
