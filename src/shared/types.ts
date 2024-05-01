export type User = {
  username: string;
  image: {
    png: string;
    webp: string;
  };
}

export type ReplyComment = Comment & {
  repliyingTo: string;
}

export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: ReplyComment[];
}
