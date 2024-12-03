import { getAllPosts } from "@/lib/queries/Posts";
import { getPageBySlug } from "@/lib/queries/Pages"
import { getAllShrines } from "@/lib/queries/Shrines";

import { Page, Post } from "@/lib/types";
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from "next/navigation";
import { AspectRatio } from "@/components/ui/aspect-ratio"

async function fetchData(slug: string) {
  if (slug === "blog") {
    return { posts: await getAllPosts(), context: "blog" };
  }

  if (slug === "shrines") {
    return { posts: await getAllShrines(), context: "shrines" };
  }

  const page = await getPageBySlug(slug);

  if (page) {
    return { post: page };
  }

  return { error: "No data found" }
}

function RenderPage({ page }: { page: Page }) {
  return (
    <div layout="lg-column" self="size-x1">
      <div self="size-x1">
        <h2>Metadata</h2>
      </div>
      <div self="size-x3 sm-first ">
        <h1 dangerouslySetInnerHTML={{ __html: page.title }} />
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </div>
    </div>
  );
}

function RenderPostsList({
  posts,
  context,
}: {
  posts: Post[];
  context: string;
}) {

  let contextName
  if (context === "blog") {
    contextName = "blogs"
  } else {
    contextName = context
  }

  return (
    <main className="flex flex-col">
      <h1 className="capitalize text-center text-4xl my-6">Latest {contextName}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto px-8">
        {posts.map((post: Post) => (
          <article className="w-full pb-6 text-pretty" key={post.databaseId}>
            <div>
              <AspectRatio ratio={1 / 1}>
                <Image
                  alt={post.featuredImage.node.altText}
                  layout="fill"
                  objectFit="cover"
                  src={post.featuredImage.node.sourceUrl}
                  priority={true}
                />
              </AspectRatio>
            </div>
            <Link href={`/${context}/${post.slug}`}>
              <h2
                dangerouslySetInnerHTML={{ __html: post.title }}
                className="tracking-normal leading-tight pt-2"
              />
            </Link>
            <p className="text-sm text-gray-500 italic">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            {/* <p className="text-sm text-gray-500">
              {post.commentCount} Comments
            </p> */}
            {/* <div dangerouslySetInnerHTML={{ __html: post.excerpt }} /> */}
            {/* <Link className="button" href={`/${context}/${post.slug}`}>
              View Post
            </Link> */}
          </article>
        ))}
      </div>
    </main>
  );
}

/**
 * Catch-all Archive Page route.
 */
export default async function Archive({
  params,
}: {
  params: { slug: string };
}) {
  // Get the slug from the params.
  const { slug } = params;

  // Fetch data from WordPress.
  const data = await fetchData(slug);

  // If there's an error, return a 404 page.
  if (data.error) {
    notFound();
  }

  // If this is a single page, render the page.
  if (data.post) {
    return <RenderPage page={data.post} />;
  }

  // Otherwise, this must be an archive. Render the posts list.
  if (data.posts && data.posts.length > 0) {
    return <RenderPostsList posts={data.posts} context={data.context} />;
  }

  // Otherwise, return a 404 page.
  notFound();
}
