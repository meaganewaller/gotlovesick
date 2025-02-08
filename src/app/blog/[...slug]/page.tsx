import { notFound } from 'next/navigation'
import '@/styles/pages/blog.css'
import { BlogPost, CommentForm, CommentThread } from '@/components/blog';
import { Comment } from "@/types/blog"
import { fetchPost } from '@/services/graphql'
import Loader from '@/components/loader';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { formatComments, nestComments } from "@/utils/helpers"

export default async function Archive(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params;
  const { slug } = params;

  if (slug.length !== 1) {
    return notFound();
  }

  const post = await fetchPost(slug[0])

  if (!post) {
    return <Loader />
  }

  const nestedComments: Comment[] = nestComments(post.comments.nodes);

  return (
    <main id="blog-post-page">
      <div className="layout">
        {post.seo?.breadcrumbs && (<Breadcrumbs breadcrumbs={post.seo.breadcrumbs} />)}

        <BlogPost post={post} />

        <section id="comments">
          <h3 className='comments-title'>{formatComments(post.commentCount || 0)} on {post.title}{" . . . "}</h3>
          <CommentThread comments={nestedComments} />
          <CommentForm  postID={post.databaseId} />
        </section>
      </div>
    </main>
  )
}
