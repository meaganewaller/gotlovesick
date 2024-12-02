import getAllPosts from "@/lib/queries/getAllPosts";
import { Post } from "@/lib/types"
import Image from "next/image"
import Link from "next/link"

import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const posts = await getAllPosts()

  if (!posts) {
    return []
  }

  return posts.map((post: { slug: string }) => ({
    slug: post.slug
  }))
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  if (!posts || !posts.length) {
    notFound()
  }

  return (
    <div layout="lg-column" self="size-x1">
      <div self="size-x1">
      </div>
      <div self="size-x3 sm-first">
        <header>
          <h2>Blog Posts</h2>
        </header>
        <div id="blog-posts-container">
        </div>
      </div>
    </div>

  )
}
