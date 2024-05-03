import { useComments } from '../../../shared/hooks/useComments';
import { useCurrentFormComment } from '../../../shared/hooks/useShowForm';
import { useUser } from '../../../shared/hooks/useUser';
import { IconDelete } from '../../../shared/icons/IconDelete';
import { IconEdit } from '../../../shared/icons/IconEdit';
import { IconReply } from '../../../shared/icons/IconReply';
import { getElapsedTimeString } from '../../../shared/maps/getElapsedTimeString';
import { CommentItemProps } from "../CommentItem/CommentItem";
import './CommentHeader.styles.css';

type HeadearButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  icon: React.ReactNode;
  color?: string;
}

function HeadearButton(props: HeadearButtonProps) {
  return (
    <button
      className={`header-button ${props.color ?? 'moderate-blue'}`}
      type="button"
      onClick={props.onClick}
    >
      {props.icon}
      {props.children}
    </button>
  );
}

function CommentHeaderButtons({
  comment,
  userComment,
}: CommentItemProps & { userComment: boolean }) {
  const { openForm } = useCurrentFormComment();
  const { deleteComment } = useComments();

  const onReply = () => {
    openForm({
      formAtCommentId: comment.id,
      reply: {
        parentCommentId: comment?.parentId ?? comment.id,
        replyingTo: comment.user.username,
      },
    });
  }

  const onEdit = () => {
    openForm({
      edit: {
        comment,
        parentCommentId: comment?.parentId ?? comment.id,
      },
    });
  }

  const onDelete = () => {
    deleteComment({
      commentId: comment.id,
      parentId: comment.parentId,
    });
  }

  return (
    <div className="header-buttons-container">
      {userComment ? (
        <>
          <HeadearButton icon={<IconDelete />} onClick={onDelete} color="soft-red">
            Delete
          </HeadearButton>
          <HeadearButton icon={<IconEdit />} onClick={onEdit}>
            Edit
          </HeadearButton>
        </>
      ) : (
        <>
          <HeadearButton icon={<IconReply />} onClick={onReply}>
            Reply
          </HeadearButton>
        </>
      )}
    </div>
  )
}

export function CommentHeader({ comment }: CommentItemProps) {
  const { user } = useUser();
  const userComment = comment.user.username === user.username;
  const timeMessage = getElapsedTimeString(new Date(comment.createdAt));

  return (
    <>
      <div className='user'>
        <img
          className='header-user-avatar'
          src={`./avatars/${comment.user.image.png}`}
          alt="user image"
        />
        <h3>{comment.user.username} {userComment && (
          <span className='header-you-indicator' style={{

          }}>
            you
          </span>
        )}</h3>
        <time>{timeMessage}</time>
      </div>
      <CommentHeaderButtons comment={comment} userComment={userComment} />
    </>
  );
}