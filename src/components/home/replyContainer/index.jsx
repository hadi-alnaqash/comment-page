import Reply from "../reply";

const ReplyContainer = ({
  commentData,
  updateScore,
  commentPostedTime,
  addReply,
  editComment,
  deleteComment,
  setDeleteModalState,
}) => {
  return (
    <div className="reply-container">
      {commentData?.map((data) => (
        <Reply
          type={"reply"}
          key={data.id}
          commentData={data}
          updateScore={updateScore}
          commentPostedTime={commentPostedTime}
          addNewReply={addReply}
          editComment={editComment}
          deleteComment={deleteComment}
          setDeleteModalState={setDeleteModalState}
        />
      ))}
    </div>
  );
};

export default ReplyContainer;
