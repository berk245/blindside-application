import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {getVideoId, getVideoInfo} from '../utils'
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
    {!fetchingData ? (
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
                <div className="">Video Player</div>
                <div className="">Comments</div>
              </div>

              <div className="related-videos">
                Related Vids
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
  )
}

export default WatchVideo