import { notFound } from 'next/navigation'
import Link from 'next/link'
import { fetchAllPosts } from '@/services/graphql';
import '@/styles/blog.css'
import Image from 'next/image'
import { Grid } from "@/components/blog"

async function fetchData() {
  const posts = await fetchAllPosts(10)

  if (!posts) {
    return { error: 'No posts found' }
  }

  return { posts }
}

export default async function BlogIndexPage() {
  const data = await fetchData();

  if (data.error) { return notFound(); }

  if (data.posts) {
    return (
      <main id="blog-page">
      <div className="layout">
      <header className="header">
      <section className="about">
      <h1>Blog</h1>
      </section>
      </header>

      <section className="blog-posts">
      <div className="blog-cards">
      {data.posts.nodes.map((post) => (
        <div key={post.key} className="post-card">
        {post.postDetails?.headerImage ? (
          <Image
          src={post.postDetails.headerImage.node.sourceUrl}
          alt={post.postDetails.headerImage.node.altText || ''}
          width={post.postDetails.headerImage.node.mediaDetails.width}
          height={post.postDetails.headerImage.node.mediaDetails.height}
          />
        ) : (
        <div className="placeholder-image">No Image</div>
        )}
        <div className='post-info'>
        <h3>{post.title}</h3>
        <p>{post.postDetails?.description || "No description available."}</p>
        <Link href={`/blog/${post.slug}`} className="post-link">Read post</Link>
        </div>
        </div>
      ))}
      </div>
      </section>
      </div>
      </main>
    )
  }

  return notFound();
}
