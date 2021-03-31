import "./App.css";
import { useVideo, VideoContext } from "./contexts/video-context";
import VideoList from "./components/VideoList";
import { Nav } from "./components/Nav/Nav";
function App() {
  const { status } = useVideo();
  return (
    <div className="App">
      <Nav />
      {/* <VideoList /> */}
    </div>
  );
}

export default App;
