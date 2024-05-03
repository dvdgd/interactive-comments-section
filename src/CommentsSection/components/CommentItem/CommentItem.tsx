import { useCurrentFormComment } from "../../../shared/hooks/useShowForm";
import { Comment } from "../../../shared/types";
import { CardComponent } from "../CardComponent/CardComponent";
import { CommentForm } from "../CommentForm/CommentForm";
import { EditCommentForm } from "../CommentForm/EditCommentForm";
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
  const { currentComment } = useCurrentFormComment();

  const showForm = currentComment?.formAtCommentId === comment.id;
  const repliesTo = comment?.replyingTo ? `@${comment.replyingTo}` : '';

  const editing = currentComment?.edit?.comment?.id === comment.id;
  if (editing) {
    return <EditCommentForm />
  }

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
