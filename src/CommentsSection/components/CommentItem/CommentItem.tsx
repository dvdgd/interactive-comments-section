import { Comment } from "../../../shared/types";
import { CardComponent } from "../CardComponent/CardComponent";
import { CommentHeader } from "../CommentHeader/CommentHeader";
import { CommentScore } from "../CommentScore/CommentScore";
import { NestedCommentsList } from "../NestedCommentItem/NestedCommentItem";
import './CommentItem.styles.css';

export type CommentItemProps = {
  comment: Comment & {
    parentId?: string;
  };
};


export function CommentItem({ comment }: CommentItemProps) {
  const repliesTo = comment?.replyingTo ? `@${comment.replyingTo}` : '';

  return (
    <>
      <CardComponent>
        <CommentScore comment={comment} />
        <div className="comment-container">
          <CommentHeader comment={comment} />
          <p>
            <span>{repliesTo}</span> {comment.content}
          </p>
        </div>
      </CardComponent>
      <NestedCommentsList
        comments={comment?.replies ?? []}
        parentId={comment.id}
      />
    </>
  );
}
