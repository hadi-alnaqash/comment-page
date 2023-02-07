import { useEffect, useState } from "react";
import "./style.scss";
import AddComment from "../addComment";
import ReplyContainer from "../replyContainer";
import DeleteModal from "../deleteModal";
import CommentVotes from "../commentVotes";
import CommentHeader from "../commentHeader";
import CommentFooter from "../commentFooter";

const CommentComp = ({
  commentData,
  updateScore,
  updateReplies,
  editComment,
  commentDelete,
  setDeleteModalState,
}) => {
  const [replying, setReplying] = useState(false);
  const [time, setTime] = useState("");
  const [vote, setVoted] = useState(false);
  const [score, setScore] = useState(commentData?.score);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(commentData?.content);
  const [deleting, setDeleting] = useState(false);

  const commentPostedTime = (timeInMileSec) => {
    let sec = (timeInMileSec / 1000).toFixed(0);
    let min = (timeInMileSec / (1000 * 60)).toFixed(0);
    let hrs = (timeInMileSec / (1000 * 60 * 60)).toFixed(0);
    let days = (timeInMileSec / (1000 * 60 * 60 * 24)).toFixed(0);
    let weeks = (timeInMileSec / (1000 * 60 * 60 * 24 * 7)).toFixed(0);
    let months = (timeInMileSec / (1000 * 60 * 60 * 24 * 31)).toFixed(0);
    let years = (timeInMileSec / (1000 * 60 * 60 * 24 * 12)).toFixed(0);
  
    if (sec < 60) {
      return "seconds";
    } else if (min < 60) {
      return min + " mins";
    } else if (hrs < 24) {
      return hrs + " hrs";
    } else if (days < 7) {
      return days + " days";
    } else if (weeks < 4) {
      return weeks + " weeks";
    } else if (months < 12) {
      return months + " months";
    } else {
      return years + " year";
    }
  };

  const createdAt = new Date(commentData?.createdAt);
  const today = new Date();
  const differenceInTime = today.getTime() - createdAt.getTime();

  useEffect(() => {
    setTime(commentPostedTime(differenceInTime));
    localStorage.setItem("voteState", vote);
  }, [differenceInTime, vote]);

  const addReply = (newReply) => {
    const replies = [...commentData?.replies, newReply];
    updateReplies(replies, commentData?.id);
    setReplying(false);
  };

  const updateComment = () => {
    editComment(content, commentData?.id, "comment");
    setEditing(false);
  };

  const deleteComment = (id, type) => {
    const finalType = type !== undefined ? type : "comment";
    const finalId = id !== undefined ? id : commentData?.id;
    commentDelete(finalId, finalType, commentData?.id);
    setDeleting(false);
  };

  return (
    <div
      className={`comment-container ${
        commentData && commentData?.replies[0] !== undefined ? "reply-container-gap" : ""
      }`}
    >
      <div className="comment">
        <CommentVotes
          type={"comment"}
          vote={vote}
          setVoted={setVoted}
          score={score}
          setScore={setScore}
          updateScore={updateScore}
          commentData={commentData}
        />
        <div className="comment--body">
          <CommentHeader
            commentData={commentData}
            setReplying={setReplying}
            setDeleting={setDeleting}
            setDeleteModalState={setDeleteModalState}
            setEditing={setEditing}
            time={time}
          />
          {!editing ? (
            <div className="comment-content">{commentData?.content}</div>
          ) : (
            <textarea
              className="content-edit-box"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          )}
          {editing && (
            <button className="update-btn" onClick={updateComment}>
              update
            </button>
          )}
        </div>
        <CommentFooter
          vote={vote}
          setVoted={setVoted}
          score={score}
          setScore={setScore}
          updateScore={updateScore}
          commentData={commentData}
          setReplying={setReplying}
          setDeleting={setDeleting}
          setDeleteModalState={setDeleteModalState}
          setEditing={setEditing}
        />
      </div>

      {replying && (
        <AddComment
          buttonValue={"reply"}
          addComments={addReply}
          replyingTo={commentData?.user?.username}
        />
      )}
      {commentData?.replies !== [] && (
        <ReplyContainer
          key={commentData?.replies.id}
          commentData={commentData.replies}
          updateScore={updateScore}
          commentPostedTime={commentPostedTime}
          addReply={addReply}
          editComment={editComment}
          deleteComment={deleteComment}
          setDeleteModalState={setDeleteModalState}
        />
      )}

      {deleting && (
        <DeleteModal
          setDeleting={setDeleting}
          deleteComment={deleteComment}
          setDeleteModalState={setDeleteModalState}
        />
      )}
    </div>
  );
};

export default CommentComp;
