import { useComments } from "../../../shared/hooks/useComments";
import { useUser } from "../../../shared/hooks/useUser";
import { IconMinus } from "../../../shared/icons/IconMinus";
import { IconPlus } from "../../../shared/icons/IconPlus";
import { CommentItemProps } from "../CommentItem/CommentItem";
import "./CommentScore.styles.css";

export function CommentScore({ comment }: CommentItemProps) {
  const { user } = useUser();
  const { scoreComment } = useComments();
 
  const onScore = (scoreUnit: number) => {
    if (user.scores[comment.id] === scoreUnit) {
      scoreUnit = 0;
    }

    scoreComment({
      commentId: comment.id,
      scoreUnit,
      parentId: comment.parentId,
    });
  }

  const scoredUp = user.scores[comment.id] === 1 ? 'hit' : '';
  const scoredDown = user.scores[comment.id] === -1 ? 'hit' : '';

  return (
    <>
      <div className="score-container">
        <button className={scoredUp} type="button" aria-label="plus" onClick={() => onScore(1)}>
          <IconPlus />
        </button>
        <strong>
          <span>{comment.score}</span>
        </strong>
        <button className={scoredDown} type="button" aria-label="minus" onClick={() => onScore(-1)}>
          <IconMinus />
        </button>
      </div>
    </>
  );
}
