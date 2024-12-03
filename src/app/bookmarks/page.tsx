import { getAllBookmarks } from "@/lib/queries/Bookmarks"
import { Bookmark } from "@/lib/types"
import Image from "next/image"
import Link from "next/link"

export default async function BookmarksPage() {
  const bookmarks = await getAllBookmarks()

  return (
    <div layout="lg-column" self="size-x1">
      <div self="size-x3">
        <h1>Bookmarks</h1>

        <div>
          {bookmarks.map((bookmark: Bookmark) => (
            <article className="w-72" key={bookmark.databaseId}>
              <Image
                alt={bookmark.featuredImage.node.altText}
                height={bookmark.featuredImage.node.mediaDetails.height}
                width={bookmark.featuredImage.node.mediaDetails.width}
                src={bookmark.featuredImage.node.sourceUrl}
                priority={true}
              />
              <Link href={`/bookmarks/${bookmark.slug}`}>
                <h2 dangerouslySetInnerHTML={{ __html: bookmark.title }} />
              </Link>
              <p className="text-sm">{bookmark.commentCount} Comments</p>
            </article>
          ))}
        </div>
      </div>
      <div self="size-x1">
        <h2 className="text-xl text-left">Filters</h2>
      </div>
    </div>
  )
}
