import { useRef } from "react";
import { useCurrentFormComment } from "../../../shared/hooks/useShowForm";
import { CommentHeader } from "../CommentHeader/CommentHeader";
import { CommentScore } from "../CommentScore/CommentScore";
import { useForm } from "./hooks/useForm";

export function EditCommentForm() {
  const { currentComment } = useCurrentFormComment();
  const { handleFormSubmit } = useForm();
  const formRef = useRef<HTMLFormElement>(null);

  const comment = currentComment?.edit?.comment;
  if (comment === undefined) return;

  const commentString = comment.replyingTo ? `@${comment.replyingTo} ${comment.content}` : comment.content;

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    formRef.current?.dispatchEvent(new Event('submit', { bubbles: true }));
  }

  return (
    <article className="edit-form">
      <CommentScore comment={comment} />
      <CommentHeader comment={comment} />
      <form ref={formRef} action="" onSubmit={handleFormSubmit} style={{
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
      </form>
      <button className="form-submit" type="submit" onClick={onButtonClick}>
        update
      </button>
    </article>
  )
}