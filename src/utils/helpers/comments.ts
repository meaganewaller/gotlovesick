import { Comment } from "@/types/blog"

export function nestComments(comments: Comment[]): Comment[] {
  const commentMap = new Map<number, Comment>();

  comments.forEach(comment => {
    commentMap.set(comment.databaseId, { ...comment, replies: [] });
  });

  const nestedComments: Comment[] = [];

  comments.forEach(comment => {
    if (comment.parentDatabaseId === 0) {
      // Top-level comment
      nestedComments.push(commentMap.get(comment.databaseId)!);
    } else {
      // Reply to another comment
      const parentComment = commentMap.get(comment.parentDatabaseId);
      if (parentComment) {
        parentComment.replies!.push(commentMap.get(comment.databaseId)!);
      }
    }
  });

  return nestedComments;
}
