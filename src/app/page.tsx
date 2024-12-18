import BookmarksTable from '@/components/BookmarksTable'
import FeaturedBlogPost from '@/components/FeaturedBlogPost'
import ProjectsTable from "@/components/ProjectsTable"
import Image from 'next/image'
import LandingBlurb from '@/components/LandingBlurb'
import MusicReviewsTable from '@/components/MusicReviewsTable'
import Sidebar from '@/components/Sidebar'
import getMenuBySlug from '@/lib/queries/getMenuBySlug'
import glitterkitty from '@/assets/images/glitter-kitty.gif'
import rainbow from '@/assets/images/rainbow.gif'
import stardivider from '@/assets/images/stardivider.gif'
import { getAllBookmarks } from '@/lib/queries/Bookmarks'
import { getAllPosts } from '@/lib/queries/Posts'
import { getByReviewType } from '@/lib/queries/Reviews'
import { getPageBySlug } from '@/lib/queries/Pages'
import { getAllProjects } from '@/lib/queries/Projects'
import { notFound } from 'next/navigation'

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
  const projects = await getAllProjects()

  const menu = await getMenuBySlug("sidebar")

  // No data? Bail...
  if (!posts || !posts.length || !homepage) {
    notFound()
  }

  return (
    <>
      <div layout="lg-column" self="size-x1">
        <div self="size-x1">
          <Sidebar pageSlug={"homepage"} menu={menu} />
          <Image src={rainbow} width={240} height={240} alt="" className="mx-auto" />
        </div>
        <div self="size-x3 sm-first">
          <article className="flex">
            <h1 className="self-center text-5xl font-venice px-20 text-center" dangerouslySetInnerHTML={{ __html: homepage.title }} />
            <Image src={glitterkitty} alt="" width={250} className="align-middle" />
          </article>

          <main className="flex flex-col">
            <FeaturedBlogPost post={posts[0]} previousPost={posts[1]} />
          </main>
        </div>
      </div >
      <Image src={stardivider} width={stardivider.width} height={stardivider.height} className='mx-auto my-10' alt="" />
      <LandingBlurb />
      <Image src={stardivider} width={stardivider.width} height={stardivider.height} className='mx-auto my-10' alt="" />
      {bookmarks && bookmarks.length > 0 ? <BookmarksTable bookmarks={bookmarks} /> : <></>}
      <Image src={stardivider} width={stardivider.width} height={stardivider.height} className='mx-auto my-10' alt="" />
      {musicReviews && musicReviews.length > 0 ? <MusicReviewsTable musicReviews={musicReviews} /> : <></>}
      <Image src={stardivider} width={stardivider.width} height={stardivider.height} className='mx-auto my-10' alt="" />
      {projects && projects.length > 0 ? <ProjectsTable projects={projects} /> : <></>}
      <Image src={stardivider} width={stardivider.width} height={stardivider.height} className='mx-auto my-10' alt="" />
    </>

  )
}
