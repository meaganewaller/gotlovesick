import Link from 'next/link';
import Date from '@/components/date';
import { RecentArticle } from '@/types';

export default function FeaturedBlogPost({
  post,
  previousPost,
}: {
  post: RecentArticle;
  previousPost: RecentArticle;
}) {
  return (
    <div className="mx-1 mt-2">
      <span className="flex w-full justify-end">
        <Date dateString={post.publicationDate} />
      </span>
      <h2>
        <Link
          href={`/blog/${post.slug}`}
          dangerouslySetInnerHTML={{ __html: post.title }}
        />
      </h2>
      {/* Most Recent Post Meta */}
      <div>
        <div className="text-center">
          <Link className="" href={`/blog/${post.slug}`}>
            {' '}
            {post.commentsCount || 0} comments{' '}
          </Link>
          <br />
          <Link
            className="font-bold text-[.9em] leading-[200%]"
            href={`/blog/${previousPost.slug}`}
          >
            {' '}
            previous{' '}
          </Link>
          {' / '}
          <Link href="/blog" className="font-bold text-[.9em] leading-[200%]">
            all entries
          </Link>
        </div>
      </div>
    </div>
  );
}
