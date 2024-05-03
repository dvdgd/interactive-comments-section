import { createContext, useState } from "react";
import { Comment } from "../types";

type CurrentComment = {
  formAtCommentId?: string;
  reply?: {
    parentCommentId: string;
    replyingTo: string;
  }
  edit?: {
    comment: Comment;
    parentCommentId?: string;
  }
}

interface CurrentFormCommentType {
  currentComment: CurrentComment | null;
  openForm: (params: CurrentComment) => void;
  closeForm: () => void;
}
export const CurrentFormCommentContext = createContext({} as CurrentFormCommentType);

export function CurrentFormCommentProvider({ children }: { children: React.ReactNode }) {
  const [currentComment, setCurrentComment] =
    useState<CurrentFormCommentType['currentComment']>(null);

  const openForm: CurrentFormCommentType['openForm'] = ({
    formAtCommentId,
    reply,
    edit,
  }) => {
    setCurrentComment({
      formAtCommentId,
      reply,
      edit,
    });
  }

  const closeForm = () => {
    setCurrentComment(null);
  }

  return (
    <CurrentFormCommentContext.Provider value={{
      currentComment,
      openForm,
      closeForm,
    }}>
      {children}
    </CurrentFormCommentContext.Provider>
  );
}

