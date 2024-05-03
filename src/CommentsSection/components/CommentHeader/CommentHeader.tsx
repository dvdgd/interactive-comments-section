import DeleteIcon from '../../../assets/icon-delete.svg';
import EditIcon from '../../../assets/icon-edit.svg';
import ReplyIcon from '../../../assets/icon-reply.svg';
import { useUser } from "../../../shared/hooks/useUser";
import { CommentItemProps } from "../CommentItem/CommentItem";
import './CommentHeader.styles.css';

type HeadearButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  icon: string;
  color?: string;
}

function HeadearButton(props: HeadearButtonProps) {
  return (
    <button
      className="header-button"
      type="button"
      onClick={props.onClick}
      style={{
        color: props.color,
      }}
    >
      <img src={props.icon} alt="Icon" />
      {props.children}
    </button>
  );
}

function CommentHeaderButtons({
  userComment,
}: CommentItemProps & { userComment: boolean }) {
  return (
    <div className="header-buttons-container">
      {userComment ? (
        <>
          <HeadearButton
            icon={DeleteIcon}
            // TODO: handle on delete
            onClick={() => {}}
            color="var(--primary-soft-red)"
          >
            Delete
          </HeadearButton>
          {/* TODO: handle on edit */}
          <HeadearButton icon={EditIcon} onClick={() => {}}>
            Edit
          </HeadearButton>
        </>
      ) : (
        <>
          {/* TODO: handleOnReply */}
          <HeadearButton icon={ReplyIcon} onClick={() => {}}>
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

  return (
    <>
      <header>
        <div className='header-user-info'>
          <div>
            <img
              className='header-user-avatar'
              src={`./src/assets/avatars/${comment.user.image.png}`}
              alt="user image"
            />
            <h3>{comment.user.username} {userComment && (
              <span className='header-you-indicator' style={{

              }}>
                you
              </span>
            )}</h3>
          </div>
          <time>{comment.createdAt}</time>
        </div>
        <CommentHeaderButtons comment={comment} userComment={userComment} />
      </header>
    </>
  );
}