import React, {useState} from "react";
import "./SmallVideoBox.css";
import thumbnail from "../../static/sm-thumbnail.jpeg";
import { Link } from "react-router-dom";

function SmallVideoBox({ video }) {
  const [routerUrl, setRouterUrl] = useState(`watch/${video.videoId}`)
  return (
    <Link to={{pathname: routerUrl}} className="sm-vid-box-container">
      <img className="sm-thumbnail-img" src={thumbnail} alt="Video Thumbnail" />
      <div className="sm-info-section">
        <div className="sm-first-line">
          <p className="sm-video-title">{video.videoTitle}</p>
        </div>
        <p className="sm-info-text">{video.length}</p>
        <p className="sm-info-text text-2">{video.postedAt}</p>
      </div>
    </Link>
  );
}

export default SmallVideoBox;
