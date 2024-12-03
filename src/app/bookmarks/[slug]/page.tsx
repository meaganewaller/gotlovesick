import { getAllBookmarks } from "@/lib/queries/Bookmarks"
import getBookmarkBySlug from "@/lib/queries/getBookmarkBySlug"
import { notFound } from 'next/navigation'
import Image from "next/image"

export async function generateStaticParams() {
  const bookmarks = await getAllBookmarks()

  if (!bookmarks) {
    return []
  }

  return bookmarks.map((bookmark: { slug: string }) => ({
    slug: bookmark.slug
  }))
}
export default async function Bookmark({ params }: { params: { slug: string } }) {
  // Fetch a single bookmark from WordPress.
  const bookmark = await getBookmarkBySlug(params.slug)

  // No bookmark? Bail...
  if (!bookmark) {
    notFound()
  }

  return (
    <div layout="lg-column" self="size-x1">
      <div self="size-x3">
        <header>
          <h1 className="text-5xl mt-10 mb-16 text-center" dangerouslySetInnerHTML={{ __html: bookmark.title }} />
        </header>
        <Image src={bookmark.featuredImage.node.sourceUrl} alt={bookmark.featuredImage.node.altText} width={bookmark.featuredImage.node.mediaDetails.width} height={bookmark.featuredImage.node.mediaDetails.height} className="mx-auto" />
        <div id="blog-bookmark-container" dangerouslySetInnerHTML={{ __html: bookmark.content }} />
        <hr className="border-pink-500 my-10" />
      </div>
      <div self="size-x1">
      </div>
    </div>
  )
}

