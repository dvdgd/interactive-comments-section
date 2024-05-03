import { useComments } from "../../../../shared/hooks/useComments";
import { useCurrentFormComment } from "../../../../shared/hooks/useShowForm";
import { useUser } from "../../../../shared/hooks/useUser";

export function useForm() {
  const { user } = useUser();
  const { addComment } = useComments();
  const { currentComment, closeForm } = useCurrentFormComment();

  const getFormContent = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const comment = formData.get('comment') as string;

    return comment.replace(`@${currentComment?.reply?.replyingTo}`, '').trim();
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
    console.log(comment);
    closeForm();
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const comment = getFormContent(event);
    if (!comment) return;

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
