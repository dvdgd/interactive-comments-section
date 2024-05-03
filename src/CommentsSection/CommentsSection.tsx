import { CurrentFormCommentProvider } from "../shared/context/ShowFormContext";
import { useComments } from "../shared/hooks/useComments";
import './CommentsSection.style.css';
import { CommentForm } from "./components/CommentForm/CommentForm";
import { CommentItem } from "./components/CommentItem/CommentItem";

function CommentsList() {
  const { comments } = useComments();

  return (
    <ul>
      {comments.sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }).map((comment) => {
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
      <CurrentFormCommentProvider>
        <section>
          <CommentsList />
          <CommentForm />
        </section>
      </CurrentFormCommentProvider>
    </main>
  )
}
