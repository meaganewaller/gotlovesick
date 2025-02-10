import { Pagination } from "@/components/recommendations";
import { fetchAllRecs } from "@/services/graphql";
import { Rec } from "@/types"
import { formatDateAsString } from "@/utils/helpers"
import Link from "next/link"
import Image from "next/image";

type SearchParams = {
  page?: string | null;
}

type Props = {
  searchParams: Promise<SearchParams>
}

const Page = async ({ searchParams }: Props) => {
  const perPage = 9;
  let params = await searchParams;
  let page = params.page ? parseInt(params.page) : 1;
  let currentPage = page;
  let totalPages = 1;

  const response = await fetchAllRecs(page, perPage)

  if (response.recs?.pageInfo?.offsetPagination?.total) {
    totalPages = Math.ceil(response.recs.pageInfo.offsetPagination.total / perPage);
  }

  const recs = response.recs?.nodes;

  if (recs && recs?.length === 0) {
    return (
      <div>
        <h1>No recs found</h1>
      </div>
    )
  }

  return (
    <main id="recs-page">
      <div className="layout">
        {recs.map((rec) => (
          <div key={rec.id}>
            <Link href={`rec.uri`}><h1>{rec.title}</h1></Link>
            <time>{formatDateAsString(rec.date)}</time>
          </div>
        ))}

        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </main>
  )
}

export default Page
