import { useCurrentFormComment } from "../../../shared/hooks/useShowForm";
import { CardComponent } from "../CardComponent/CardComponent";
import { CommentHeader } from "../CommentHeader/CommentHeader";
import { CommentScore } from "../CommentScore/CommentScore";
import { useForm } from "./hooks/useForm";

export function EditCommentForm() {
  const { currentComment } = useCurrentFormComment();
  const { handleFormSubmit } = useForm();

  const comment = currentComment?.edit?.comment;
  if (comment === undefined) return;

  const commentString = comment.replyingTo ? `@${comment.replyingTo} ${comment.content}` : comment.content;

  return (
    <CardComponent>
      <CommentScore comment={comment} />
      <div className="comment-container">
        <CommentHeader comment={comment} />
        <form action="" onSubmit={handleFormSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          height: '100%',
        }}>
          <textarea
            id="comment-edit"
            name="comment"
            rows={3}
            defaultValue={commentString}
            placeholder="Enter your comment"
            required
          ></textarea>
          <button className="form-submit" type="submit">
            update
          </button>
        </form>
      </div>
    </CardComponent>
  )
}