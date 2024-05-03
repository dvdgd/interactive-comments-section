import { Comment, CommentRaw } from "../types";

const parseRelativeTime = (relativeTime: string | Date) => {
  if (relativeTime instanceof Date) {
    return relativeTime;
  }

  const timeRegex = /(\d+)\s+(\w+)\s+ago/;
  const matchResult = relativeTime.match(timeRegex);
  if (!matchResult) {
    return;
  }

  const [, value, unit] = matchResult;

  const normalizedUnit = unit.replace(/s$/, '');
  const multiplier = {
    second: 1000,
    minute: 1000 * 60,
    hour: 1000 * 60 * 60,
    day: 1000 * 60 * 60 * 24,
    week: 1000 * 60 * 60 * 24 * 7,
    month: 1000 * 60 * 60 * 24 * 30,
    year: 1000 * 60 * 60 * 24 * 365,
  }[normalizedUnit.toLowerCase()];
  if (!multiplier) {
    return;
  }

  const timestamp = Date.now() - (parseInt(value, 10) * multiplier);
  return new Date(timestamp);
};

const mapComment = (comment: CommentRaw): Comment | undefined => {
  const createdAt = parseRelativeTime(comment.createdAt);
  if (!createdAt) {
    return;
  }

  const newReplies = comment.replies?.map(({
    createdAt, ...reply
  }) => {
    const newCreatedAt = parseRelativeTime(createdAt);
    if (!newCreatedAt) return;

    const newComment = { ...reply, createdAt: newCreatedAt, id: reply.id.toString() };
    return newComment;
  }).filter(Boolean) as unknown as Comment[];

  return {
    ...comment,
    id: comment.id.toString(),
    createdAt,
    replies: newReplies,
  }
};

export const normalizeRawComments = (comments: CommentRaw[]): Comment[] => {
  return comments.map((comment) => {
    const newComment = mapComment(comment);
    if (!newComment) return;

    return newComment;
  }).filter(Boolean) as Comment[];
}
