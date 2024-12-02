import getAllPosts from '@/lib/queries/getAllPosts'
import getPageBySlug from '@/lib/queries/getPageBySlug'
import { getAllBookmarks } from '@/lib/queries/Bookmarks'
import { Post, Bookmark } from '@/lib/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import UpdateLog from '@/components/UpdateLog'
import Image from 'next/image'
import glitterkitty from '@/public/images/glitter-kitty.gif'
import rainbow from '@/public/images/rainbow.gif'

/**
 * The homepage route.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
export default async function Home() {
  // Fetch homepage from WordPress.
  const homepage = await getPageBySlug('homepage')

  // Fetch content from WordPress.
  const posts = await getAllPosts()
  const bookmarks = await getAllBookmarks()

  // No data? Bail...
  if (!posts || !posts.length || !homepage || !bookmarks || !bookmarks.length) {
    notFound()
  }

  return (
    <div layout="lg-column" self="size-x1">
      <div self="size-x1">
        <Sidebar />
        <Image src={rainbow} width={240} height={240} alt="" className="mx-auto" />
      </div>
      <div self="size-x3 sm-first" className="bg-fuchsia-100 border-fuchsia-600 border-solid border-2 max-h-[65vh] overflow-scroll">
        <main className="flex flex-col">
          <article className="flex justify-center">
            <h1 className="self-center text-4xl font-pixel font-normal text-fuchsia-400 px-20 text-center" dangerouslySetInnerHTML={{ __html: homepage.title }} />
            <Image src={glitterkitty} alt="" width={250} className="align-middle" />
          </article>
          <div>
            <h2 className='font-pixel text-4xl font-normal'>Recent Blog Posts</h2>
            {posts.map((post: Post) => (
              <article key={post.databaseId}>
                <Link href={`/blog/${post.slug}`}>
                  <h2
                    className="text-3xl my-5 hover:italic"
                    dangerouslySetInnerHTML={{ __html: post.title }} />
                </Link>
              </article>
            ))}

            <h2 className='font-pixel text-4xl font-normal'>Recent Bookmarks</h2>
            {bookmarks.map((bookmark: Bookmark) => (
              <article key={bookmark.databaseId}>
                <Link href={`/bookmarks/${bookmark.slug}`}>
                  <h2
                    className="text-3xl my-5 hover:italic"
                    dangerouslySetInnerHTML={{ __html: bookmark.title }} />
                </Link>
              </article>
            ))}
          </div>
        </main>

      </div>
      <div self="size-x1">
        <UpdateLog />
      </div>
    </div>

  )
}
