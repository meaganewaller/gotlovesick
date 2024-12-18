import Link from "next/link";
import type { Bookmark, Collection } from "@/lib/types";
import { cn } from "@/lib/utils";
import { IoPinSharp } from "react-icons/io5";
import Image from "next/image";
import Date from "@/components/date"
import pin from "@/assets/images/pushpin.png"

export default function BookmarkPin({ bookmark, index }: { bookmark: Bookmark, index: number }) {
  return (
    <div
      key={bookmark.databaseId}
      className={cn(
        "bg-sunshine-yellow mt-5 w-[75%] mx-auto justify-between flex flex-col",
        index % 2 != 0 && "rotate-6",
        index % 2 == 0 && "-rotate-6",
      )}
    >
      <Image src={pin} className="pin mx-auto" alt="" />
      <Image
        className="border-solid border-ivory border-4"
        src={bookmark.featuredImage.node.sourceUrl}
        height={bookmark.featuredImage.node.mediaDetails.height}
        width={bookmark.featuredImage.node.mediaDetails.width}
        alt={bookmark.featuredImage.node.altText}
      />
      <Link
        href={`/bookmarks/${bookmark.slug}`}
        className="font-cute text-primary-txt text-center mt-2 text-lg">{bookmark.title}</Link>

      <p className="font-extra text-xs text-center">
        <Date dateString={bookmark.date} />
      </p>
      <div className="flex space-x-2 justify-center">
        {bookmark.collections?.nodes?.map((collection: Collection) => {
          const bgClass = collection.collectionFields.color

          return (
            <span key={collection.databaseId} className={cn(
              "py-1.5 px-1.5 rounded-md text-xs font-cute",

              bgClass === "pastel-purple" && "bg-pastel-purple text-electric-purple",
              bgClass === "peachy-pink" && "bg-peachy-pink text-raspberry-pink",

            )}
            >{collection.name}</span>
          )
        })}
      </div>
    </div>
  )
}
