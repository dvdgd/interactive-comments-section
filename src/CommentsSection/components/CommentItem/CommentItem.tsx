import { useShowForm } from "../../../shared/hooks/useShowForm";
import { Comment } from "../../../shared/types";
import { CardComponent } from "../CardComponent/CardComponent";
import { CommentForm } from "../CommentForm/CommentForm";
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
  const { currentComment } = useShowForm();

  const showForm = currentComment?.commentId === comment.id;
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
      {showForm && <CommentForm />}
      <NestedCommentsList
        comments={comment?.replies ?? []}
        parentId={comment.id}
      />
    </>
  );
}
