import { CommentItemProps } from "../CommentItem/CommentItem";
import "./CommentScore.styles.css";

export function CommentScore({ comment }: CommentItemProps) {

  return (
    <>
      <div className="score-container">
        <button type="button">
          <img 
            src="./icon-minus.svg"
            alt="Useful Comment" 
            />
        </button>
        <strong>
          <span>{comment.score}</span>
        </strong>
        <button type="button">
          <img 
            src='./icon-plus.svg' 
            alt="Useless Comment" 
          />
        </button>
      </div>
    </>
  );
}
