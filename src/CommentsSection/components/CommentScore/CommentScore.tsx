import { IconMinus } from "../../../shared/icons/IconMinus";
import { IconPlus } from "../../../shared/icons/IconPlus";
import { CommentItemProps } from "../CommentItem/CommentItem";
import "./CommentScore.styles.css";

export function CommentScore({ comment }: CommentItemProps) {

  return (
    <>
      <div className="score-container">
        <button type="button" aria-label="plus">
          <IconPlus/>
        </button>
        <strong>
          <span>{comment.score}</span>
        </strong>
        <button type="button" aria-label="minus">
          <IconMinus />
        </button>
      </div>
    </>
  );
}
