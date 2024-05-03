import { useUser } from '../../../shared/hooks/useUser';
import { IconDelete } from '../../../shared/icons/IconDelete';
import { IconEdit } from '../../../shared/icons/IconEdit';
import { IconReply } from '../../../shared/icons/IconReply';
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
  userComment,
}: CommentItemProps & { userComment: boolean }) {
  return (
    <div className="header-buttons-container">
      {userComment ? (
        <>
          <HeadearButton
            icon={<IconDelete />}
            // TODO: handle on delete
            onClick={() => {}}
            color="soft-red"
          >
            Delete
          </HeadearButton>
          {/* TODO: handle on edit */}
          <HeadearButton icon={<IconEdit />} onClick={() => {}}>
            Edit
          </HeadearButton>
        </>
      ) : (
        <>
          {/* TODO: handleOnReply */}
          <HeadearButton icon={<IconReply />} onClick={() => {}}>
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
              src={`./avatars/${comment.user.image.png}`}
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