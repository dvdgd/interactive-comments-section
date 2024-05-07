import { useComments } from "../../../../shared/hooks/useComments";
import { useCurrentFormComment } from "../../../../shared/hooks/useShowForm";
import { useUser } from "../../../../shared/hooks/useUser";

export function useForm() {
  const { user } = useUser();
  const { addComment, editComment } = useComments();
  const { currentComment, closeForm } = useCurrentFormComment();

  const getFormContent = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const comment = formData.get('comment') as string;

    const replyingTo = currentComment?.reply?.replyingTo
      || currentComment?.edit?.comment.replyingTo;

    return comment.replace(`@${replyingTo}`, '').trim();
  }

  const handleCommentReply = (comment: string) => {
    addComment({
      content: comment,
      user,
      parentCommentId: currentComment?.reply?.parentCommentId,
      replyingTo: currentComment?.reply?.replyingTo,
    });
    closeForm();
  }

  const handleCommentEdit = (comment: string) => {
    if (!currentComment?.edit?.comment.id) return;

    editComment({
      content: comment,
      commentId: currentComment.edit.comment.id,
      parentId: currentComment?.edit?.parentCommentId,
    });
    closeForm();
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const comment = getFormContent(event);
    event.currentTarget.reset();

    if (!comment) {
      closeForm();
      return;
    }

    if (currentComment?.reply) {
      handleCommentReply(comment);
      return;
    }

    if (currentComment?.edit) {
      handleCommentEdit(comment);
      return;
    }

    addComment({
      content: comment,
      user,
    });
    closeForm();
  }

  return {
    handleFormSubmit,
  }
}
