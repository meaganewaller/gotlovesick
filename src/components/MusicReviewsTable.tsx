import Link from "next/link"
import type { MusicReview } from "@/lib/types"

export default function MusicReviewsTable({ musicReviews }: { musicReviews: MusicReview[] }) {
  return (
    <div layout="row top-stretch" className="space-x-4">
      <div self="size-x3" className="mb-12 mr-2 leading-[140%]">
        <h2 className="text-4xl">
          <Link className='text-deep-green font-bold' href="/music">Music Reviews</Link>
        </h2>
        {musicReviews.map((musicReview: MusicReview) => (
          <div
            key={musicReview.databaseId}
            layout="row center-stretch"
            className="space-x-4 border-b border-dotted border-deep-green text-base">
            <div self="size-x3">
              <Link
                className='font-bold'
                href={`/music/${musicReview.slug}`}
                dangerouslySetInnerHTML={{ __html: musicReview.title }}
              />
              {musicReview.excerpt?.length > 0 && (
                <p className='italic pt-1 w-[70%]'
                  dangerouslySetInnerHTML={{ __html: musicReview.excerpt }}
                />
              )}
            </div>
            <div self="size-x1">
              <span className='text-right uppercase my-0 mx-4 h-[3rem]'>
                {musicReview.date}
              </span>
            </div>
          </div>
        ))}
        <div className='text-right'>
          <Link className='mt-[23px] tracking-wide text-deep-green' href={`/music`}>&larr; Music Reviews Index</Link>
        </div>
      </div>
      <div self="size-x1"></div>
    </div>
  )
}

