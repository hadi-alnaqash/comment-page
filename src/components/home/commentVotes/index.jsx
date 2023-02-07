import { ReactComponent as IconPlus } from "../../assets/icons/icon-plus.svg";
import { ReactComponent as IconMinus } from "../../assets/icons/icon-minus.svg";

const CommentVotes = ({
  vote,
  type,
  setVoted,
  score,
  setScore,
  updateScore,
  commentData,
}) => {
  let upVote = () => {
    if (vote === false) {
      // console.log("upVote: ", vote)
      let n = score + 1;
      setScore(n);
      updateScore(n, commentData?.id, type);
      setVoted(true);
    }
  };

  let downVote = () => {
    if (vote === true) {
      // console.log("downVote: ", vote)
      let n = score - 1;
      setScore(n);
      updateScore(n, commentData?.id, type);
      setVoted(false);
    }
  };

  return (
    <div className="comment--votes">
      <button className="plus-btn" onClick={upVote}>
        <IconPlus />
      </button>
      <div className="votes-counter">{commentData?.score}</div>
      <button className="minus-btn" onClick={downVote}>
        <IconMinus />
      </button>
    </div>
  );
};

export default CommentVotes;
