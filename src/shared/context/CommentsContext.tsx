import React, { createContext, useEffect, useState } from 'react';
import { comments as initalComents } from "../data.json";
import { useUser } from '../hooks/useUser';
import { normalizeRawComments } from '../maps/createdAtStrToTimestamp';
import { Comment, CommentRaw, User } from "../types";

interface ICommentContext {
  comments: Comment[];
  addComment: (params: {
    content: string;
    user: User;
    replyingTo?: string;
    parentCommentId?: string;
  }) => void;
  deleteComment: (params: {
    commentId: string;
    parentId?: string;
  }) => void;
  editComment: (params: {
    commentId: string;
    content: string;
    parentId?: string;
  }) => void;
  scoreComment: (params: {
    commentId: string,
    scoreUnit: number,
    parentId?: string,
  }) => void;
}

export const CommentsContext = createContext({} as ICommentContext);

export const CommentsProvider = ({ children }: { children: React.ReactNode }) => {
  const { userScoreComment, user } = useUser();
  const [comments, setComments] = useState<Comment[]>(() => {
    const savedData = localStorage.getItem('@comments');

    const parsedSavedData = savedData ? JSON.parse(savedData) as Comment[] : null;
    if (parsedSavedData) return parsedSavedData;

    return normalizeRawComments(initalComents as CommentRaw[]);
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
      createdAt: new Date(),
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

  const deleteComment: ICommentContext['deleteComment'] = (params) => {
    if (!params.parentId) {
      setComments(comments.filter((comment) => comment.id !== params.commentId));
      return;
    }

    const parentComment = comments.find((comment) => comment.id === params.parentId);
    if (!parentComment) {
      return;
    }

    parentComment.replies = parentComment.replies.filter((comment) => comment.id !== params.commentId);
    setComments([...comments]);
  }

  const editComment: ICommentContext['editComment'] = (params) => {
    if (!params.parentId) {
      const comment = comments.find((comment) => comment.id === params.commentId);
      if (!comment) return;

      comment.content = params.content;
      setComments([...comments]);
      return;
    }

    const parentComment = comments.find((comment) => comment.id === params.parentId);
    if (!parentComment) return;

    const comment = parentComment.replies.find((comment) => comment.id === params.commentId);
    if (!comment) return;

    comment.content = params.content;
    setComments([...comments]);
    return;
  }

  const removeScoreUnit: ICommentContext['scoreComment'] = (params) => {
    const previusScoreUnit = user.scores[params.commentId];
    const invertScoreUnit = previusScoreUnit * -1;

    userScoreComment({
      commentId: params.commentId,
      score: 0, // removes score
    });

    if (params?.parentId) {
      const parentComment = comments.find((comment) => comment.id === params.parentId);
      if (!parentComment) return;

      const comment = parentComment.replies.find((comment) => comment.id === params.commentId);
      if (!comment) return;
      comment.score += invertScoreUnit;
      setComments([...comments]);
      return;
    }

    const comment = comments.find((comment) => comment.id === params.commentId);
    if (!comment) return;
    comment.score += invertScoreUnit;
    setComments([...comments]);
  }

  const scoreComment: ICommentContext['scoreComment'] = (params) => {
    const removeScore = params.scoreUnit === 0;
    if (removeScore) {
      return removeScoreUnit(params);
    }

    userScoreComment({
      commentId: params.commentId,
      score: params.scoreUnit,
    });

    if (!params.parentId) {
      const comment = comments.find((comment) => comment.id === params.commentId);
      if (!comment) return;

      comment.score += params.scoreUnit;
      setComments([...comments]);
    }

    const parentComment = comments.find((comment) => comment.id === params.parentId);
    if (!parentComment) return;

    const comment = parentComment.replies.find((comment) => comment.id === params.commentId);
    if (!comment) return;

    comment.score += params.scoreUnit;
    setComments([...comments]);
  }

  return (
    <CommentsContext.Provider value={{
      comments,
      addComment,
      deleteComment,
      editComment,
      scoreComment,
    }}>
      {children}
    </CommentsContext.Provider>
  );
};
