import "./App.css";
import { useVideo } from "./contexts/video-context";
import VideoList from "./components/VideoList/VideoList";
import { Nav } from "./components/Nav/Nav";
import { SideMenu } from "./components/SideMenu/SideMenu";
import { YoutubePlayer } from "./components/YoutubePlayer/YoutubePlayer";
import { WatchLater } from "./components/WatchLater/WatchLater";
import { Playlist } from "./components/Playlist/Playlist";
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
      </div>
    </div>
  );
}

export default App;
