import getAllPosts from '@/lib/queries/getAllPosts'
import { getPageBySlug } from '@/lib/queries/Pages'
import { getAllBookmarks } from '@/lib/queries/Bookmarks'
import { getByReviewType } from '@/lib/queries/Reviews'
import { notFound } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import UpdateLog from '@/components/UpdateLog'
import Image from 'next/image'
import glitterkitty from '~/images/glitter-kitty.gif'
import rainbow from '~/images/rainbow.gif'
import stardivider from '~/images/stardivider.gif'
import hearts from "~/images/sparkle-heart.gif"
import getMenuBySlug from '@/lib/queries/getMenuBySlug'
import FeaturedBlogPost from '@/components/FeaturedBlogPost'
import LandingBlurb from '@/components/LandingBlurb'
import BookmarksTable from '@/components/BookmarksTable'
import MusicReviewsTable from '@/components/MusicReviewsTable'

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
  const albumReviews = await getByReviewType("Album")
  const songReviews = await getByReviewType("Song")
  const musicReviews = [...albumReviews, ...songReviews]

  const menu = await getMenuBySlug("sidebar")

  // No data? Bail...
  if (!posts || !posts.length || !homepage || !bookmarks || !bookmarks.length) {
    notFound()
  }

  return (
    <div layout="lg-column" self="size-x1">
      <div self="size-x1">
        <Sidebar pageSlug={"homepage"} menu={menu} />
        <Image src={rainbow} width={240} height={240} alt="" className="mx-auto" />
      </div>
      <div self="size-x3 sm-first" className="max-h-[75vh] overflow-y-scroll overflow-x-hidden">
        <main className="flex flex-col">
          <article className="flex">
            <h1 className="self-center text-5xl font-venice px-20 text-center" dangerouslySetInnerHTML={{ __html: homepage.title }} />
            <Image src={glitterkitty} alt="" width={250} className="align-middle" />
          </article>
          <FeaturedBlogPost post={posts[0]} previousPost={posts[1]} />
          <Image src={stardivider} width={stardivider.width} height={stardivider.height} className='mx-auto my-10' alt="" />
          <LandingBlurb />
          <Image src={stardivider} width={stardivider.width} height={stardivider.height} className='mx-auto my-10' alt="" />
          <BookmarksTable bookmarks={bookmarks} />
          {musicReviews && musicReviews.length > 0 ?
            <MusicReviewsTable musicReviews={musicReviews} />
            : <></>}
        </main>
      </div>
      <div layout="column top-stretch">
        <div>
          <Image src={hearts} width={hearts.width} height={hearts.height} className='mx-auto mb-5' alt="" />
          <UpdateLog />
        </div>
      </div>
    </div >
  )
}
