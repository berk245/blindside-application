import React, { useState, useEffect } from "react";
import { getRelatedVideoInfo } from "../../utils";
import SmallVideoBox from "../SmallVideobox/SmallVideoBox";


function RelatedVideos({ id }) {
  const [fetchingData, setfetchingData] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [relatedVideoInfo, setRelatedVideosInfo] = useState([]);

  useEffect(() => {
    if (!id) return;
    getInfo()
      .then((res) => {
        setRelatedVideosInfo(res);
        setfetchingData(false);
      })
      .catch((err) => {
        console.log(err);
        setFetchError(true);
        setfetchingData(false);
      });
  }, [id]);

  const getInfo = async () => {
    let result = await getRelatedVideoInfo(id);
    return result;
  };
  return (
    <div className="rel-vid-main">
      {fetchingData ? (
        <p>Loading related videos</p>
      ) : (
        <>
          {!fetchError ? (
            <div className="related-videos-container">
               <h3>Related Videos</h3>
                 {relatedVideoInfo.map((video, idx) => {
                return <SmallVideoBox video={video} key={idx}></SmallVideoBox>;
              })}
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
