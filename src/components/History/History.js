import { useVideo } from "../../contexts/video-context";
import "./history.css";
export function History() {
  const { state, setYoutubePlayer, youtubePlayer, dispatch } = useVideo();
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
            <div
              className="watch-later-video"
              key={video.id}
              onClick={() =>
                setYoutubePlayer({ ...youtubePlayer, status: "video", video })
              }
            >
              <img
                src={video["snippet"]["thumbnails"].medium.url}
                alt={video["snippet"].title}
              />
              <div className="watch-later-desc">
                <h3>{video["snippet"].title}</h3>
                <p>{video["snippet"].channelTitle}</p>
              </div>
            </div>
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
