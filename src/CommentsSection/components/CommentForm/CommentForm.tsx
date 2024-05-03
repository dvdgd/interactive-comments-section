import { useCurrentFormComment } from "../../../shared/hooks/useShowForm";
import { useUser } from "../../../shared/hooks/useUser";
import { CardComponent } from "../CardComponent/CardComponent";
import './CommentForm.styles.css';
import { useForm } from "./hooks/useForm";

type CommentFormProps = {
  showReplyAndEdit?: boolean
}

export function CommentForm({ showReplyAndEdit }: CommentFormProps) {
  const { user } = useUser();
  const { currentComment } = useCurrentFormComment();
  const { handleFormSubmit } = useForm();

  const replyingTo = currentComment?.reply?.replyingTo ? `@${currentComment.reply.replyingTo}` : '';
  const commentContent = currentComment?.edit?.comment?.content ?? '';

  const commentString = `${replyingTo} ${commentContent}`.trim();

  return (
    <>
      <CardComponent style={{
        marginTop: '1rem',
        maxWidth: '100%',
      }}>
        <img
          className="form-avatar"
          src={`./avatars/${user.image.png}`}
          alt="current user avatar"
        />
        <form action="" onSubmit={handleFormSubmit}>
          <textarea
            rows={3}
            name="comment"
            id="comment-text-area"
            placeholder="Write a comment..."
            defaultValue={showReplyAndEdit ? commentString ?? null : undefined}
            required
          >
          </textarea>
          <button type="submit" className="form-submit">
            Send
          </button>
        </form>
      </CardComponent>
    </>
  );
}