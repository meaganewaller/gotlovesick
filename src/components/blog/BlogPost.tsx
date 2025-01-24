'use client'

import { fetchPost } from '@/services/graphql'
import { useState, useEffect, use } from 'react'
import Loader from '@/components/loader'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import Image from 'next/image'
import Link from 'next/link'
import rainbows from '~/images/dividers/rainbows.gif';
import { CommentForm } from './CommentForm'
import { formatDateAsString } from '@/utils/helpers'

export function BlogPost({ slug }: { slug: string }) {
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPost = await fetchPost(slug)
        if (fetchedPost) {
          setPost(fetchedPost)
          setLoading(false)
        } else {
          setError('Post not found')
          setLoading(false)
        }
      } catch (err) {
        console.error(err)
        setError('Failed to fetch post')
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="layout">

      {post.seo?.breadcrumbs && ( <Breadcrumbs breadcrumbs={post.seo?.breadcrumbs} /> )}

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
              <Link href={"#"}>{post.commentCount} comments</Link>
            </li>
            <li>
              by <span>{post.author.node.name}</span>
            </li>
          </ul>
        <div className="divider">
          <Image src={rainbows} alt="" className='divider' />
        </div>

        </header>

        <section className="featured-image">
          {post.featuredImage && (
            <Image src={post.featuredImage.node.sourceUrl} alt={post.featuredImage.node.altText || ''} width={post.featuredImage.node.mediaDetails.width} height={post.featuredImage.node.mediaDetails.height} />
          )}
        </section>

        <article dangerouslySetInnerHTML={{ __html: post.content }} />

        <section className="comments" id="comments">
          <h3>Comments</h3>
          {post.comments.nodes.map((comment: any) => (
            <article key={comment.key}>
              <header>
                <Image alt={comment.author.node.name} height={64} loading="lazy" src={comment.author.node.avatar.url} width={64} />
                <div className="comment">
                  <h4
                    className="m-0 p-0 leading-none"
                    dangerouslySetInnerHTML={{ __html: comment.author.node.name }}
                  />
                  <time className="italic">{comment.date}</time>
                </div>
              </header>

              <div dangerouslySetInnerHTML={{ __html: comment.content }} />
            </article>
          ))}
        </section>
        <CommentForm postSlug={post.slug} />
      </section>
    </div>
  )
}

