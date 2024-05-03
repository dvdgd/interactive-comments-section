import { useUser } from "../../../shared/hooks/useUser";
import { CardComponent } from "../CardComponent/CardComponent";
import './CommentForm.styles.css';

export function CommentForm() {
  const { user } = useUser();

  return (
    <>
      <CardComponent
        style={{
          marginTop: '1rem',
          maxWidth: '100%',
        }}
      >
        <img 
          src={`./src/assets/avatars/${user.image.png}`} 
          alt="current user avatar"
          className="form-avatar"
        />
        <form
          action="" 
          // TODO: Add the handleFormSubmit function to the onSubmit prop
          onSubmit={() => { }}
        >
          <textarea
            rows={3}
            name="comment"
            id="comment-text-area"
            placeholder="Write a comment..."
            required
          >
          </textarea>
          <button
            type="submit"
            className="form-submit"
          >
            Send
          </button>
        </form>
      </CardComponent>
    </>
  );
}