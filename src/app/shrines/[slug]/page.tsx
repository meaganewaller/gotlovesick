import { getShrineBySlug, getAllShrines } from "@/lib/queries/Shrines"
import { Metadata } from 'next'
import Link from 'next/link'
import bow from '~/images/bow.gif'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const shrines = await getAllShrines()

  if (!shrines) {
    return []
  }

  // Return the slugs for each shrine.
  return shrines.map((shrine: { slug: string }) => ({
    slug: shrine.slug
  }))
}

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata | null> {
  const shrine = await getShrineBySlug(params.slug)

  if (!shrine) {
    return {}
  }

  return {
    title: shrine.seo.title,
    description: shrine.seo.metaDesc
  }
}

export default async function Shrine({ params }: { params: { slug: string } }) {
  const shrine = await getShrineBySlug(params.slug)

  if (!shrine) {
    notFound()
  }

  return (
    <div layout="lg-column" self="size-x1">
      <div self="size-x3 sm-first">
        <header className="mx-auto">
          <h1 className="text-5xl mt-10 mb-16 text-center" dangerouslySetInnerHTML={{ __html: shrine.title }} />
          <Image
            className="mx-auto max-h-[25rem] w-auto"
            src={shrine.featuredImage.node.sourceUrl}
            alt={shrine.featuredImage.node.altText}
            width={shrine.featuredImage.node.mediaDetails.width}
            height={shrine.featuredImage.node.mediaDetails.height}
          />
        </header>

      </div>
    </div>
  )
}


