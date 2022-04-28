import React from 'react'
import ReactPlayer from 'react-player'

function VideoPlayer({video}) {

  let {videoUrl, videoTitle, postedAt} = video
  return (
    <>
    <ReactPlayer className='video-player' controls url={videoUrl}></ReactPlayer>
    <div className='video-player-info-section'>
    <span style={{fontWeight: 600}}>{videoTitle}</span>
    <span>{postedAt}</span>
    </div>
    <hr />
    </>
 
  )
}

export default VideoPlayer