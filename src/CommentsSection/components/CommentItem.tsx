import { Comment } from "../../shared/types";
import IconMinus from "../../assets/icon-minus.svg";
import IconPlus from "../../assets/icon-plus.svg";

export type CommentItemProps = {
  comment: Comment;
};

function CommentHeader({ comment }: CommentItemProps) {
  return (
    <>
      <header>
        <div>
          <img src="" alt="" />
          <h3>{comment.user.username}</h3>
          <time>{comment.createdAt}</time>
        </div>
        <div>
          <button type="button">Reply</button>
          <button type="button">Edit</button>
          <button type="button">Delete</button>
        </div>
      </header>
    </>
  );
}

function CommentScore({ comment }: CommentItemProps) {
  return (
    <>
      <div>
        <button type="button">
          <img 
            src={IconPlus}
            alt="Useful Comment" 
          />
        </button>
        <span>{comment.score}</span>
        <button type="button">
          <img 
            src={IconMinus} 
            alt="Useless Comment" 
          />
        </button>
      </div>
    </>
  );
}

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <article>
      <CommentScore comment={comment} />
      <div>
        <CommentHeader comment={comment} />
        <p>{comment.content}</p>
      </div>
    </article>
  );
}
