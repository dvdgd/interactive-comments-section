import { useComments } from "../shared/hooks/useComments";
import { CommentItem } from "./components/CommentItem"

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
      </section>
    </main>
  )
}
