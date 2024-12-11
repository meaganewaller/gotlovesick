import { getByReviewType, getReviewBySlug } from "@/lib/queries/Reviews";
import { notFound } from 'next/navigation'
import Date from '@/components/date'
import CommentForm from '@/components/CommentForm'
import Image from 'next/image'
import Link from 'next/link'

export async function generateStaticParams() {
  const albumReviews = await getByReviewType("Album")
  const songReviews = await getByReviewType("Song")

  const reviews = [...albumReviews, ...songReviews]

  if (!reviews) {
    return []
  }

  return reviews.map((review: { slug: string }) => ({
    slug: review.slug
  }))
}

export default async function MusicReview({ params }: { params: { slug: string } }) {
  const review = await getReviewBySlug(params.slug)

  if (!review) {
    notFound()
  }

  return (
    <div layout="lg-column" self="size-x1">
      <div self="size-x1">
        <h3>Rating</h3>
        {review.reviewDetails.rating}/10

        <h3>Release Date</h3>
        <Date dateString={review.reviewDetails.releaseDate} />
      </div>
      <div self="size-x3 sm-first">
        <header>
          <p className="text-gray-500">Published <Date dateString={review.date} /></p>
          <h1 className="mt-2 text-4xl font-bold text-gray-900 sm:text-5xl">{review.title}</h1>
        </header>
        <div id="music-review-container" dangerouslySetInnerHTML={{ __html: review.content }} />
        <footer className="flex items-center justify-between gap-4 pb-4">
        </footer>
        <hr className="border-electric-purple my-10" />
        <section className="mt-5">
          <h3 className='text-2xl'>Comments</h3>
          {review.comments.nodes.map((comment) => (
            <article key={comment.databaseId}>
              <header className="flex items-center gap-2">
                <img
                  alt={comment.author.node.name}
                  className="m-0 rounded-full"
                  height={64}
                  loading="lazy"
                  src={comment.author.node.avatar.url}
                  width={64}
                />
                <div className="flex flex-col gap-2">
                  <h4
                    className="m-0 p-0 leading-none"
                    dangerouslySetInnerHTML={{ __html: comment.author.node.name }}
                  />
                  <time className="italic">{comment.date}</time>
                </div>
              </header>

              <div dangerouslySetInnerHTML={{ __html: comment.content }} />
            </article>
          ))}
        </section>
        <hr className="border-pink-500 my-10" />
        <CommentForm postID={review.databaseId} />
      </div>
    </div>
  )
}

