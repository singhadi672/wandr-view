import { useVideo } from "../../contexts/video-context";
import "./history.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
export function History() {
  const { state, dispatch } = useVideo();
  const { videoHistory } = state;

  async function handleHistory() {
    await axios.post("https://serene-badlands-15662.herokuapp.com/history", {
      clear: true,
    });
    dispatch({ type: "CLEAR_HISTORY" });
  }

  {
    return videoHistory.length > 0 ? (
      <div className="history">
        <div className="clear-history-btn" onClick={() => handleHistory()}>
          clear All
        </div>
        <div className="watch-history">
          {videoHistory.map((video) => (
            <NavLink
              to={`/video?id=${video.items[0].id}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              <div className="watch-later-video" key={video.id}>
                <img
                  src={video.items[0]["snippet"]["thumbnails"].medium.url}
                  alt={video.items[0]["snippet"].title}
                />
                <div className="watch-later-desc">
                  <h3>{video.items[0]["snippet"].title}</h3>
                  <p>{video.items[0]["snippet"].channelTitle}</p>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    ) : (
      <div className="watch-later">
        <h2 className="no-video">No video History</h2>
      </div>
    );
  }
}
