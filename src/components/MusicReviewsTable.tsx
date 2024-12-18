import Link from "next/link"
import type { MusicReview } from "@/lib/types"
import Date from "@/components/date"

export default function MusicReviewsTable({ musicReviews }: { musicReviews: MusicReview[] }) {
  return (
    <div layout="row top-stretch" className="space-x-4">
      <div self="size-x3" className="mb-12 mr-2 leading-[140%]">
        <h2 className="text-6xl text-center font-venice">
          <Link className='text-deep-green font-normal' href="/music">Music Reviews</Link>
        </h2>
      </div>
    </div>
  )
}

