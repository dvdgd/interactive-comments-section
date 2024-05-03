import React, { createContext, useEffect, useState } from 'react';
import { comments as initalComents } from "../data.json";
import { Comment, User } from "../types";

interface ICommentContext {
  comments: Comment[];
  addComment: (params: {
    content: string;
    user: User;
    replyingTo?: string;
    parentCommentId?: string;
  }) => void;
}

export const CommentsContext = createContext({} as ICommentContext);

export const CommentsProvider = ({ children }: { children: React.ReactNode }) => {
  const [comments, setComments] = useState<Comment[]>(() => {
    const savedData = localStorage.getItem('@comments');
    return savedData ? JSON.parse(savedData) : initalComents;
  });

  useEffect(() => {
    localStorage.setItem('@comments', JSON.stringify(comments));
  }, [comments]);

  const addComment: ICommentContext['addComment'] = (params) => {
    const newComment: Comment = {
      id: crypto.randomUUID().toString(),
      content: params.content,
      user: params.user,
      replyingTo: params.replyingTo,
      createdAt: new Date().toISOString(),
      score: 0,
      replies: [],
    };

    if (!params.parentCommentId) {
      setComments([...comments, newComment]);
      return;
    }

    const parentComment = comments.find((comment) => comment.id === params.parentCommentId);
    if (!parentComment) {
      return;
    }

    parentComment.replies.push(newComment);
    setComments([...comments]);
  }

  return (
    <CommentsContext.Provider value={{
      comments,
      addComment,
    }}>
      {children}
    </CommentsContext.Provider>
  );
};
