import React, { useState } from "react";
import "./LargeVideoBox.css";
import thumbnail from "../../static/sm-thumbnail.jpeg";
import { Link } from "react-router-dom";
function LargeVideoBox({ video }) {
  const [routerUrl, setRouterUrl] = useState(`watch/${video.videoId}`);
  return (
    <Link to={{ pathname: routerUrl }} className="lg-vid-box-container">
      <img className="thumbnail-img" src={thumbnail} alt="Video Thumbnail" />
      <div className="info-section">
        <div className="first-line">
          <p className="video-title">{video.videoTitle}</p>
          <p className="info-text">{video.length}</p>
        </div>
        <p className="info-text">{video.postedAt}</p>
      </div>
    </Link>
  );
}

export default LargeVideoBox;
