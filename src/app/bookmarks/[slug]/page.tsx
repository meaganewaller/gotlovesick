// import { getAllBookmarks, getBookmarkBySlug } from "@/lib/queries/Bookmarks"
// import getBookmarksByCollection from "@/lib/queries/getBookmarksByCollection"

// export async function generateStaticParams() {
//   const bookmarks = await getAllBookmarks()
//
//   if (!bookmarks) {
//     return []
//   }
//
//   return bookmarks.map((bookmark: { slug: string }) => ({
//     slug: bookmark.slug
//   }))
// }
export default async function Bookmark() {
  // Fetch a single bookmark from WordPress.
  // const bookmark = await getBookmarkBySlug(params.slug)

  // No bookmark? Bail...
  // if (!bookmark) {
  //   notFound()
  // }

  return (
    <>
      <main>
        <article>
          <header className="mx-auto mt-20 max-w-screen-lg rounded-t-lg bg-white pt-16 text-center">
            {/* <p className="text-gray-500">Published <Date dateString={bookmark.date} /></p> */}
            {/* <h1 className="mt-2 text-4xl font-bold text-gray-900 sm:text-5xl">{bookmark.title}</h1> */}
            {/* <p className="mt-6 text-lg text-gray-700">{bookmark.excerpt}</p> */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {/* {bookmark.collections.nodes.map((collection) => ( */}
              {/*   <Link */}
              {/*     key={collection.databaseId} */}
              {/*     href={`/collections/${collection.slug}`} */}
              {/*     className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200" */}
              {/*   > */}
              {/*     {collection.name} */}
              {/*   </Link> */}
              {/* ))} */}
            </div>
            {/* <Image className="sm:h-[34rem] mt-10 w-full object-contain" src={bookmark.featuredImage.node.sourceUrl} alt={bookmark.featuredImage.node.altText} width={bookmark.featuredImage.node.mediaDetails.width} height={bookmark.featuredImage.node.mediaDetails.height} /> */}
          </header>

          <div className="mx-auto mt-10 max-w-screen-md space-y-12 px-4 py-10 font-serif text-lg tracking-wide text-gray-700">
            {/* <div dangerouslySetInnerHTML={{ __html: bookmark.content }} /> */}

          </div>
        </article>
      </main>
    </>
  )
}

