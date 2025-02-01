import React from 'react'
import type { Comment } from "@/types/blog"
import Image from 'next/image';
import Link from 'next/link';

type ThreadCrommentProps = {
  comment: Comment;
  depth?: number;
}

export const ThreadComment: React.FC<ThreadCrommentProps> = ({ comment, depth = 0 }) => {
  return (
    <div className={`${depth > 0 ? "nested-comment" : "parent-comment"}`}>
      <div className="comment">
        <Image src={comment.author.node.avatar.url} alt={`${comment.author.name}'s avatar`} width={comment.author.node.avatar.width} height={comment.author.node.avatar.width} />
        <div className="author">
          {comment.author.url ? <Link href={comment.author.url}>{comment.author.name}</Link> : <>{comment.author.name}</>}
          <p className="">{new Date(comment.date).toLocaleString()}</p>
        </div>
      </div>

      <div className="comment-content" dangerouslySetInnerHTML={{ __html: comment.content }} />

      {comment.replies && comment.replies.length > 0 && (
        <div className="nested-reply">
          {comment.replies.map((reply) => (
            <ThreadComment key={reply.databaseId} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

