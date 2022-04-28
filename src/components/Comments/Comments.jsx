import React, { useState, useEffect } from "react";

function Comments({ comments }) {
  const [videoComments, setVideoComments] = useState();
  const [showComments, setShowComments] = useState(true);
  const [newComment, setNewComment] = useState({
    posted_at: "Just now",
    posted_by: "current_user",
    text: "",
  });


  return (
    <div className="comments-container">
      <button
        className="button toggle-button"
        onClick={() => setShowComments(!showComments)}
      >
        Show/Hide Comments
      </button>
      {videoComments ? (
        <div className="">
          {showComments && (
            <div className="">
              <div className="add-comment-section">
               Add Comment
              </div>
              <h4>Comments</h4>
            </div>
          )}
        </div>
      ) : (
        <p>Loading Comments</p>
      )}
    </div>
  );
}

export default Comments;
