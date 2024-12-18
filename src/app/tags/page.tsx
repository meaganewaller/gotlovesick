import config from '@/lib/config'
import { getAllTags } from '@/lib/queries/Tags'
import { Tag } from '@/lib/types'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

/**
 * Generate the metadata for each static route at build time.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata | null> {
  return {
    title: `All Tags - ${config.siteName}`,
    description: `All tags across ${config.siteName}`
  }
}

/**
 * The tag archive route.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
export default async function TagArchive({ params }: { params: { slug: string } }) {
  // Fetch posts from WordPress.
  const tags = await getAllTags()

  if (!tags) {
    notFound()
  }

  return (
    <>
      <main className="block flex-grow flex-shrink-0 leading-6 text-left text-ivory basis-auto">
        <div className="mt-2 mb-16 md:mb-24 lg:mb-32">
          <div className="relative px-6 mx-auto w-full lg:px-12">
            <h1 className='text-6xl font-venice text-deep-sky-blue text-center'>All Tags</h1>
            {tags.map((tag: Tag) => (
              <div key={tag.databaseId}>
                <Link href={`/tags/${tag.slug}`} dangerouslySetInnerHTML={{ __html: tag.name }} />{" "}
                <span className="text-primary-txt">({tag.count})</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

