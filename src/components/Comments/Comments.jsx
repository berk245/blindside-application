import React, { useState, useEffect } from "react";
import './Comments.css'
import CommentLine from "./CommentLine";
function Comments({ comments }) {
  const [videoComments, setVideoComments] = useState();
  const [showComments, setShowComments] = useState(true);
  const [newComment, setNewComment] = useState({
    posted_at: "Just now",
    posted_by: "current_user",
    text: "",
  });

  useEffect(() => {
    if (!comments) return;
    setVideoComments([...comments]);
  }, [comments]);

  const handleChange = (e) => {
    let obj = { ...newComment, text: e.target.value };
    setNewComment(obj);
  };
  const postComment = () => {
    if (!newComment.text) return;
    let arr = [newComment, ...videoComments];
    setVideoComments([...arr]);
    setNewComment({ ...newComment, text: "" });
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") postComment();
    return;
  };
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
              <input
                  onChange={(e) => handleChange(e)}
                  onKeyDown={(e) => handleKeyPress(e)}
                  onEnter
                  type="text"
                  name="comment"
                  value={newComment.text}
                  className="comment-input"
                  placeholder="Add a comment..."
                />
                <button
                  className="button"
                  disabled={!newComment.text}
                  onClick={postComment}
                >
                  Post
                </button>
              </div>
              <h4>Comments</h4>
              {videoComments.map((comment, idx) => {
                return <CommentLine comment={comment} key={idx} />;
              })}
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
