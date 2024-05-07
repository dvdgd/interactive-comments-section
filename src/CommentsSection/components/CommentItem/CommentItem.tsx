import { useCurrentFormComment } from "../../../shared/hooks/useShowForm";
import { Comment } from "../../../shared/types";
import { CommentForm } from "../CommentForm/CommentForm";
import { EditCommentForm } from "../CommentForm/EditCommentForm";
import { CommentHeader } from "../CommentHeader/CommentHeader";
import { CommentScore } from "../CommentScore/CommentScore";
import { NestedCommentsList } from "../NestedCommentItem/NestedCommentItem";

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
      <article className="comment-item">
        <CommentScore comment={comment} />
        <CommentHeader comment={comment} />
        <p>
          <span>{repliesTo}</span> {comment.content}
        </p>
      </article>
      {showForm && <CommentForm showReplyAndEdit={true} />}
      {comment?.replies?.length > 0 && (
        <NestedCommentsList
          comments={comment?.replies ?? []}
          parentId={comment.id}
        />
      )}
    </>
  );
}
