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
              <p>Some blog description will live here.</p>
            </section>
          </header>

          <Grid items={data.posts.nodes} columnGutter={10} columnWidth={325} />
        </div>
      </main>
    )
  }

  return notFound();
}
