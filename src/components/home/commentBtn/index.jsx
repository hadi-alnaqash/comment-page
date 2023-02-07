import { ReactComponent as IconReply } from "../../assets/icons/icon-reply.svg";
import { ReactComponent as IconDelete } from "../../assets/icons/icon-delete.svg";
import { ReactComponent as IconEdit } from "../../assets/icons/icon-edit.svg";
import { useAppStore } from "../../../store";

const CommentBtn = ({commentData, setReplying, setDeleting, setDeleteModalState, setEditing}) => {
  
  const{currentUser}=useAppStore();

  let counter = false;
  const showAddComment = () => {
    counter ? setReplying(false) : setReplying(true);
    counter = true;
  };
  const showDeleteModal = () => {
    setDeleting(true);
    setDeleteModalState(true);
  };
  const showEditComment = () => {
    setEditing(true);
  };

  return (
    <div className="comment--btn">
      <button
        className={`reply-btn ${
          currentUser?.username !== commentData?.user?.username ? "" : "display--none"
        }`}
        onClick={showAddComment}
      >
        <IconReply /> Reply
      </button>
      <button
        className={`delete-btn ${
          currentUser?.username === commentData?.user?.username ? "" : "display--none"
        }`}
        onClick={showDeleteModal}
      >
        <IconDelete /> Delete
      </button>
      <button
        className={`edit-btn ${currentUser?.username === commentData?.user?.username ? "" : "display--none"}`}
        onClick={showEditComment}
      >
        <IconEdit /> Edit
      </button>
    </div>
  );
};

export default CommentBtn;
