import React, { useState, useEffect } from "react";
import { getUserVideos } from "../utils";
import LargeVideoBox from "../components/LargeVideoBox/LargeVideoBox";

function Overview() {
  const [fetchingData, setFetchingData] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [userVideos, setUserVideos] = useState([]);

  useEffect(() => {
    setFetchingData(true);
    getUserVideos()
      .then((res) => {
        setUserVideos(res);
        setFetchingData(false);
      })
      .catch((err) => {
        setFetchError(true);
        setFetchingData(false);
      });
  }, []);

  return (
    <div>
      {fetchingData ? (
        <h1 style={{ textAlign: "center", padding: "5rem 0" }}>Loading</h1>
      ) : (
        <>
          {!fetchError ? (
            <div className="overview-container">
              <h3>
                Welcome {localStorage.current_user}. Here are your videos.
              </h3>
              <div className="videos-container">
                {userVideos.map((video, idx) => {
                  return <LargeVideoBox video={video} key={idx} />;
                })}
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

export default Overview;
