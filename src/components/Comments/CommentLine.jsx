import React from 'react'
import './Comments.css'
function CommentLine({comment}) {
  return (
    <div className='single-comment-box'>
        <p className='comment-title'>{comment.posted_by} ({comment.posted_at})</p>
        <p className='comment-main-text'>{comment.text}</p>
    </div>
  )
}

export default CommentLine