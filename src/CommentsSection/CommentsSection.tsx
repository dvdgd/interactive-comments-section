import { useComments } from "../shared/hooks/useComments";
import './CommentsSection.style.css';
import { CommentForm } from "./components/CommentForm/CommentForm";
import { CommentItem } from "./components/CommentItem/CommentItem";

function CommentsList() {
  const { comments } = useComments();

  return (
    <ul>
      {comments.map((comment) => {
        return (
          <li key={comment.id} id={`comment-${comment.id}`}>
            <CommentItem comment={comment} />
          </li>
        );
      })}
    </ul>
  )
}

export function CommentsSection() {
  return (
    <main>
      <section>
        <CommentsList />
        <CommentForm />
      </section>
    </main>
  )
}
