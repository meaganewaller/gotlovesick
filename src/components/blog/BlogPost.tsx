import Image from 'next/image'
import Link from 'next/link'
import rainbows from '~/images/dividers/rainbows.gif';
import { formatDateAsString, formatComments } from '@/utils/helpers'
import { Post } from '@/types/blog'

export function BlogPost({ post }: { post: Post }) {
  return (
    <div className="layout">
      <section className="post">
        <header className="post-header">
          <Link
            className="category"
            href={post.categories.nodes[0].uri}>
            {post.categories.nodes[0].name}
          </Link>
          <h1>{post.title}</h1>
          <ul className="post-meta">
            <li>
              <span>{formatDateAsString(post.date)}</span>
            </li>
            <li>
              <Link href={"#comments"}>{formatComments(post.commentCount || 0)}</Link>
            </li>
            <li>
              by <span>{post.author.node.name}</span>
            </li>
          </ul>
          <div className="divider">
            <Image src={rainbows} alt="" className='divider' />
          </div>

        </header>

        {post.featuredImage && (
          <figure className="featured-image">
            <Image src={post.featuredImage.node.sourceUrl} alt={post.featuredImage.node.altText || ''} width={post.featuredImage.node.mediaDetails.width} height={post.featuredImage.node.mediaDetails.height} />
          </figure>
        )}
        <article dangerouslySetInnerHTML={{ __html: post.content }} />

      </section>
    </div>
  )
}

