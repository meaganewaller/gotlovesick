import Link from "next/link"
import type { Bookmark } from "@/lib/types"
import { cn } from "@/lib/utils"
import BookmarkPin from "@/components/BookmarkPin";
import "@/styles/bookmarks.scss"

export default function BookmarksTable({ bookmarks }: { bookmarks: Bookmark[] }) {
  const limitedBookmarks = [bookmarks[0], bookmarks[1], bookmarks[2]]
  return (
    <div layout="row top-stretch">
      <div self="size-x3" className="mb-2 mr-2 leading-[140%]">
        <h2 className="text-6xl text-center">
          <Link className='text-deep-purple font-venice' href="/bookmarks">Bookmarks</Link>
        </h2>
        <section className="corkboard-container">
          {limitedBookmarks.map((bookmark: Bookmark, index: number) => (
            <BookmarkPin key={bookmark.databaseId} index={index} bookmark={bookmark} />
          ))}
        </section>
      </div>
    </div>
  )
}
