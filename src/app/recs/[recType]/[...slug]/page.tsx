import { fetchRecommendation } from "@/services/graphql"
import '@/styles/pages/recs.css'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { BookRecommendation } from "@/components/recommendations"

type Params = {
  recType: string
  slug: string[]
}

type Props = {
  params: Promise<Params>
}

const Page = async ({ params }: Props) => {
  let { recType, slug } = await params

  const length = slug.length

  if (length < 1) {
    return (
      <h1>Nothing found my friend</h1>
    )
  }

  let recSlug;

  if (length === 1) {
    recSlug = slug[0]
  } else {
    recSlug = slug.join("/")
  }

  const rec = await fetchRecommendation(recType, recSlug)

  if (rec) {
    return (
      <main id="rec-page">
        <div className="layout">
          {rec?.seo?.breadcrumbs && (<Breadcrumbs breadcrumbs={rec.seo.breadcrumbs} />)}
          <BookRecommendation rec={rec} />
        </div>
      </main>
    )
  }
}

export default Page
