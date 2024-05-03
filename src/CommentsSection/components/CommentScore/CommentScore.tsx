import IconMinus from "../../../assets/icon-minus.svg";
import IconPlus from "../../../assets/icon-plus.svg";
import { CommentItemProps } from "../CommentItem/CommentItem";
import "./CommentScore.styles.css";

export function CommentScore({ comment }: CommentItemProps) {

  return (
    <>
      <div className="score-container">
        <button type="button">
          <img 
            src={IconPlus}
            alt="Useful Comment" 
            />
        </button>
        <strong>
          <span>{comment.score}</span>
        </strong>
        <button type="button">
          <img 
            src={IconMinus} 
            alt="Useless Comment" 
          />
        </button>
      </div>
    </>
  );
}
