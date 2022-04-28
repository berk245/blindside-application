import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";
import RelatedVideos from "../components/RelatedVideos/RelatedVideos";
import Comments from "../components/Comments/Comments";
import { getVideoId, getVideoInfo } from "../utils";
function WatchVideo() {
  const [fetchingData, setFetchingData] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [videoInfo, setVideoInfo] = useState({});

  useEffect(() => {
    let videoId = getVideoId(window.location.href);
    if (!videoId) setFetchError(true);
    else {
      getVideoInfo(videoId)
        .then((info) => {
          setVideoInfo(info);
        })
        .catch((err) => setFetchError(true));
    }
    setFetchingData(false);
  }, []);
  return (
    <div>
      {fetchingData ? (
        <p style={{ textAlign: "center", padding: "5rem 0" }}>Loading</p>
      ) : (
        <>
          {!fetchError ? (
            <div className="watch-video-main-container">
              <Link to={{ pathname: "/" }}>
                <button className="button">Go back</button>
              </Link>
              <div className="watch-video-content">
                <div className="left-section">
                  <VideoPlayer className="video-player" video={videoInfo} />

                  <Comments comments={videoInfo.comments} />
                </div>

                <div className="related-videos">
                  <RelatedVideos id={videoInfo.videoId} />
                </div>
              </div>
            </div>
          ) : (
            <p>
              An error occured while accessing data. Please refresh the page.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default WatchVideo;
