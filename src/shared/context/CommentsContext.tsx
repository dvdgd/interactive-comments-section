import React, { createContext, useEffect, useState } from 'react';
import { comments as initalComents } from "../data.json";
import { Comment } from "../types";

interface ICommentContext {
  comments: Comment[];
}

export const CommentsContext = createContext({} as ICommentContext);

export const CommentsProvider = ({ children }: { children: React.ReactNode }) => {
  const [comments, _] = useState<Comment[]>(() => {
    const savedData = localStorage.getItem('@comments');
    return savedData ? JSON.parse(savedData) : initalComents;
  });

  useEffect(() => {
    localStorage.setItem('@comments', JSON.stringify(comments));
  }, [comments]);

  return (
    <CommentsContext.Provider value={{
      comments: comments,
    }}>
      {children}
    </CommentsContext.Provider>
  );
};
