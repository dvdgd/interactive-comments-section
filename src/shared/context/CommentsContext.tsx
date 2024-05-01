import { comments as initalComents } from "../data.json";
import React, { createContext, useState, useEffect } from 'react';
import { Comment } from "../types";

interface ICommentContext {
  comments: Comment[];
  addComment: (comment: Comment) => void;
  deleteComment: (id: number) => void;
  replyComment: (id: number, reply: Comment) => void;
  editComment: (id: number, content: string) => void;
  scoreComment: (id: number, score: number) => void;
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

  const addComment = (comment: Comment) => {
    setComments([...comments, comment]);
  }

  const deleteComment = (id: number) => {
    const newComments = comments.filter(comment => comment.id !== id);
    setComments(newComments);
  }

  const findCommentIndexById = (id: number) => {
    const index = comments.findIndex(comment => comment.id === id);
    const comment = comments[index];
    return {
      index,
      comment
    }
  }

  const replyComment = (id: number, reply: Comment) => {
    const { index, comment } = findCommentIndexById(id);
    const newComments = [...comments];
    newComments[index] = {
      ...comment,
      replies: [
        ...comment.replies,
        { ...reply, repliyingTo: comment.user.username }
      ]
    };
    setComments(newComments);
  }

  const editComment = (id: number, content: string) => {
    const { index, comment } = findCommentIndexById(id);
    const newComments = [...comments];
    newComments[index] = {
      ...comment,
      content
    };
    setComments(newComments);
  }

  const scoreComment = (id: number, score: number) => {
    const { index, comment } = findCommentIndexById(id);
    const newComments = [...comments];
    newComments[index] = {
      ...comment,
      score: comment.score + score
    };
    setComments(newComments);
  }

  return (
    <CommentsContext.Provider value={{
      comments: comments,
      addComment,
      deleteComment,
      replyComment,
      editComment,
      scoreComment
    }}>
      {children}
    </CommentsContext.Provider>
  );
};
