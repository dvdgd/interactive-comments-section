import { Comment } from "../../../shared/types";
import { CommentItem } from "../CommentItem/CommentItem";

import './NestedCommentItem.styles.css';

type NestedCommentsListProps = {
  comments: Comment['replies'];
  parentId: string;
};

export function NestedCommentsList({ comments, parentId }: NestedCommentsListProps) {
  if (comments.length === 0) {
    return null;
  }

  return (
    <div className="nested-container">
      <ul>
        {comments.map((reply) => {
          const childrenComment = { ...reply, parentId };

          return (
            <li key={reply.id} id={`comment-reply-${reply.id}`} >
              <CommentItem key={reply.id} comment={childrenComment} />
            </li>
          );
        })}
      </ul>
    </div>
  )
}