import { useRef } from "react";
import { useCurrentFormComment } from "../../../shared/hooks/useShowForm";
import { useUser } from "../../../shared/hooks/useUser";
import './CommentForm.styles.css';
import { useForm } from "./hooks/useForm";

type CommentFormProps = {
  showReplyAndEdit?: boolean
}

export function CommentForm({ showReplyAndEdit }: CommentFormProps) {
  const { user } = useUser();
  const { currentComment } = useCurrentFormComment();
  const { handleFormSubmit } = useForm();
  const formRef = useRef<HTMLFormElement>(null);

  const replyingTo = currentComment?.reply?.replyingTo ? `@${currentComment.reply.replyingTo}` : '';
  const commentContent = currentComment?.edit?.comment?.content ?? '';

  const commentString = `${replyingTo} ${commentContent}`.trim();

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    formRef.current?.dispatchEvent(new Event('submit', { bubbles: true }));
  }

  return (
    <>
      <article className="comment-form" style={{
        marginTop: '1rem',
        maxWidth: '100%',
      }}>
        <img
          className="form-avatar"
          src={`./avatars/${user.image.png}`}
          alt="current user avatar"
        />
        <form ref={formRef} action="" onSubmit={handleFormSubmit}>
          <textarea
            rows={3}
            name="comment"
            id="comment-text-area"
            placeholder="Write a comment..."
            defaultValue={showReplyAndEdit ? commentString ?? null : undefined}
            required
          >
          </textarea>
        </form>
        <button type="submit" className="form-submit" onClick={handleButtonClick}>
          Send
        </button>
      </article>
    </>
  );
}