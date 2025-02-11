import React from 'react';
import { Comment } from '@/types/blog';
import { ThreadComment } from '@/components/blog';

type CommentThreadProps = {
  comments: Comment[];
};

export const CommentThread: React.FC<CommentThreadProps> = ({ comments }) => {
  return (
    <div className="comment-thread">
      {comments.map((comment) => (
        <ThreadComment key={comment.databaseId} comment={comment} />
      ))}
    </div>
  );
};
