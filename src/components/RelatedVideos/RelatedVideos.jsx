import React, { useState, useEffect } from "react";

function RelatedVideos({ id }) {
  const [fetchingData, setfetchingData] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [relatedVideoInfo, setRelatedVideosInfo] = useState([]);


  return (
    <div className="rel-vid-main">
      {fetchingData ? (
        <p>Loading</p>
      ) : (
        <>
          {!fetchError ? (
            <div className="related-videos-container">
                <h3>Related Videos</h3>
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

export default RelatedVideos;
