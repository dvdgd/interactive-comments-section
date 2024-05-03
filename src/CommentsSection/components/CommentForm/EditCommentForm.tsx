import { CardComponent } from "../CardComponent/CardComponent";
import { CommentHeader } from "../CommentHeader/CommentHeader";
import { CommentItemProps } from "../CommentItem/CommentItem";
import { CommentScore } from "../CommentScore/CommentScore";

export function EditCommentForm({ comment }: CommentItemProps) {
  const commentString = comment.replyingTo ? `@${comment.replyingTo} ${comment.content}` : comment.content;

  return (
    <CardComponent>
      <CommentScore comment={comment} />
      <div className="comment-container">
        <CommentHeader comment={comment} />
        {/* TODO: create handleFormSubmit */}
        <form action="" onSubmit={() => { }} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          height: '100%',
        }}>
          <textarea
            name="textarea"
            id="textarea"
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