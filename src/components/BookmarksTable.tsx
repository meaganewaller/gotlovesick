import Link from "next/link"
import type { Bookmark } from "@/lib/types"

export default function BookmarksTable({ bookmarks }: { bookmarks: Bookmark[] }) {
  return (
    <div layout="row top-stretch" className="space-x-4">
      <div self="size-x3" className="mb-12 mr-2 leading-[140%]">
        <h2 className="text-4xl">
          <Link className='text-deep-green font-bold' href="/bookmarks">Bookmarks</Link>
        </h2>
        {bookmarks.map((bookmark: Bookmark) => (
          <div
            key={bookmark.databaseId}
            layout="row center-stretch"
            className="space-x-4 border-b border-dotted border-deep-green text-base">
            <div self="size-x3">
              <Link
                className='font-bold'
                href={`/bookmarks/${bookmark.slug}`}
                dangerouslySetInnerHTML={{ __html: bookmark.title }}
              />
              {bookmark.excerpt?.length > 0 && (
                <p className='italic pt-1 w-[70%]'
                  dangerouslySetInnerHTML={{ __html: bookmark.excerpt }}
                />
              )}
            </div>
            <div self="size-x1">
              <span className='text-right uppercase my-0 mx-4 h-[3rem]'>
                {bookmark.date}
              </span>
            </div>
          </div>
        ))}
        <div className='text-right'>
          <Link className='mt-[23px] tracking-wide text-deep-green' href={`/bookmarks`}>&larr; Bookmarks Index</Link>
        </div>
      </div>
      <div self="size-x1"></div>
    </div>
  )
}
