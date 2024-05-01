import { CommentItem } from "./components/CommentItem"
import data from "../shared/data.json";

function CommentsList() {
  return (
    <ul>
      {data.comments.map((comment) => {
        return (
          <li key={comment.id} id={`comment-${comment.id}`}>
            {/* @ts-ignore */}
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
