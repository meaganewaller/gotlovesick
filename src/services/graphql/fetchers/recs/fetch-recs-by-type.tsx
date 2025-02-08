import type { Nullable, Rec } from '@/types'
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers'

type RecommendationsResponse = {
  recommendations: Nullable<{
    nodes: Rec[];
    pageInfo: { offsetPagination: { total: number }};
  }>
}

const recommendationsQuery = `query FetchAllRecommendations($typeSlug: String, $size: Int!, $offset: Int!) {
  recommendations(where: {
    status: PUBLISH,
    offsetPagination: { size: $size, offset: $offset },
    orderby: { field: DATE, order: DESC },
    taxQuery: {
      taxArray: [{
        terms: [$typeSlug],
        taxonomy: RECTYPE,
        operator: IN,
        field:SLUG
      }]
    }
  }) {
    nodes {
      databaseId
      date
      id
      slug
      title
      uri
      seo {
        title
        metaDesc
        breadcrumbs {
          text
          url
        }
      }
    }
    pageInfo {
      offsetPagination {
        total
      }
    }
  }
}`

export const fetchRecommendationsByType = async (typeSlug: string, page: number, perPage: number): Promise<RecommendationsResponse> => {
  const response = await fetchGraphQL<RecommendationsResponse>({
    query: recommendationsQuery,
    url: getGraphQLUrl(),
    variables: {
      typeSlug,
      offset: (page - 1) * perPage,
      size: perPage
    }
  })

  return response
}
