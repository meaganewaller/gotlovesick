import Link from "next/link";
import { Post } from "@/lib/types";
import Date from "@/components/date"

export default function FeaturedBlogPost({ post, previousPost }: { post: Post, previousPost: Post }) {
  return (
    <>
      <div layout="row top-stretch" className="space-x-4">
        <div self="size-x1" />
        <div self="size-x3">
          <span className="lowercase tracking-wide text-base font-cute md:text-lg">
            <Date dateString={post.date} />
          </span>
          <h1 className='text-3xl md:text-4xl mt-1 mb-5 mx-0 tracking-wide'>
            <Link href={`/blog/${post.slug}`}
              className="text-creamy-white bg-bubblegum-purple pt-1 px-[1px] pb-[3px] -mr-[-1px] mb-[3px] -ml-[-1px] hover:bg-creamy-white hover:text-bubblegum-purple"
              dangerouslySetInnerHTML={{ __html: post.title }}
            />
          </h1>
        </div>
      </div>
      {/* Most Recent Blog Post */}
      <hr className="h-0 bg-transparent border-t border-dotted border-deep-purple" />
      {/* Most Recent Post Meta */}
      <div layout="row top-stretch" className="space-x-4">
        <div self="size-x1">
          <Link
            className="text-2xl"
            href={`/blog/${post.slug}`}>
            {post.commentCount || 0} comments
          </Link>
          <br />
          <Link
            className='font-bold text-[.9em] leading-[200%]'
            href={`/blog/${previousPost.slug}`}>
            previous
          </Link>
          {" / "}
          <Link href="/blog" className='font-bold text-[.9em] leading-[200%]'>all entries</Link>
        </div>
        <div self="size-x3" className='mb-5' dangerouslySetInnerHTML={{ __html: post.excerpt }} />
      </div>

    </>
  )
}
