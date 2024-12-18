import { getByReviewType, getReviewBySlug } from "@/lib/queries/Reviews";
import { notFound } from 'next/navigation'
import Date from '@/components/date'
import Image from 'next/image'
import Link from 'next/link'
import { MusicReview } from "@/lib/types"

async function fetchMusicReviews() {
  const albumReviews = await getByReviewType("Album")
  const songReviews = await getByReviewType("Song")

  const reviews = [...albumReviews, ...songReviews]

  if (!reviews) {
    return []
  }

  return reviews
}

export async function generateStaticParams() {
  const reviews = await fetchMusicReviews()

  if (!reviews) {
    return []
  }

  return reviews.map((review: MusicReview) => ({
    slug: review.slug,
  }))
}

export default async function MusicReviews() {
  const reviews = await fetchMusicReviews()

  if (!reviews) {
    return notFound()
  }

  return (
    <div layout="lg-column" self="size-x1">
      <div self="size-x1">
        <h1>Music Reviews</h1>
        {reviews.map((review) => (
          <article key={review.databaseId}>
            <h2>{review.title}</h2>
            <Image
              alt=""
              className="m-0 rounded-full"
              height={64}
              loading="lazy"
              src={review.featuredImage.node.sourceUrl}
              width={64}
            />

          </article>
        ))}
      </div>
    </div>
  )

}

