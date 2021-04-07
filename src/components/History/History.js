import { useVideo } from "../../contexts/video-context";
import "./history.css";
import { NavLink } from "react-router-dom";
export function History() {
  const { state, dispatch } = useVideo();
  const { videoHistory } = state;

  {
    return videoHistory.length > 0 ? (
      <div className="history">
        <div
          className="clear-history-btn"
          onClick={() => dispatch({ type: "CLEAR_HISTORY" })}
        >
          clear All
        </div>
        <div className="watch-history">
          {videoHistory.map((video) => (
            <NavLink
              to={`/video?id=${video.id}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              <div className="watch-later-video" key={video.id}>
                <img
                  src={video["snippet"]["thumbnails"].medium.url}
                  alt={video["snippet"].title}
                />
                <div className="watch-later-desc">
                  <h3>{video["snippet"].title}</h3>
                  <p>{video["snippet"].channelTitle}</p>
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
