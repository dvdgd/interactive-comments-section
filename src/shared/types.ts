export type User = {
  username: string;
  image: {
    png: string;
    webp: string;
  };
  scores: {
    [key: string]: number;
  }
}

export type CommentRaw = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replyingTo?: string;
  replies?: CommentRaw[];
}

export type Comment = Omit<CommentRaw, 'createdAt' | 'id' | 'replies'> & {
  id: string;
  replies: Comment[],
  createdAt: Date | string;
};
