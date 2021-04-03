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
function App() {
  const { youtubePlayer } = useVideo();
  return (
    <div className="App">
      <Nav />
      <div className="content">
        <SideMenu />
        {youtubePlayer.status === "home" && <VideoList />}
        {youtubePlayer.status === "video" && <YoutubePlayer />}
        {youtubePlayer.status === "watch-later" && <WatchLater />}
        {youtubePlayer.status === "playlist" && <Playlist />}
        {youtubePlayer.status === "history" && <History />}
        {youtubePlayer.status === "liked-videos" && <LikedVideos />}
      </div>
    </div>
  );
}

export default App;
