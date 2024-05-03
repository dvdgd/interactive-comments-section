export type User = {
  username: string;
  image: {
    png: string;
    webp: string;
  };
}

export type Comment = {
  id: string;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replyingTo?: string;
  replies: Comment[];
}
