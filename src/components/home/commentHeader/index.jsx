import { useAppStore } from "../../../store";
import CommentBtn from "../commentBtn";

const CommentHeader = ({commentData, setReplying, setDeleting, setDeleteModalState, setEditing, time}) => {
  const{
    currentUser,
  }=useAppStore();
  console.log("currentUser: ",currentUser)
  return (
    <div className="comment--header">
      <div className={`profile-pic ${commentData?.username || commentData?.user?.username}`}>
        {/* <img src={commentData.user.png} /> */}
      </div>
      <div className="username">{commentData?.username || commentData?.user?.username}</div>
      {commentData?.username === currentUser.username || commentData?.user?.username === currentUser.username  ? 
        <div className="you-tag">you</div> : ""}
      <div className="comment-posted-time">{ !time.includes("NaN") ? `${time} ago` : commentData?.createdAt}</div>
      <CommentBtn
        commentData={commentData}
        setReplying={setReplying}
        setDeleting={setDeleting}
        setDeleteModalState={setDeleteModalState}
        setEditing={setEditing}
      />
    </div>
  );
};

export default CommentHeader;
