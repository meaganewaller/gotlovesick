import type { Nullable, GraphQLNodes, WPFunExtraType } from '@/types'
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers'

type FunExtrasResponse = {
  funExtraTypes: Nullable<GraphQLNodes<WPFunExtraType>>
}

const allFunExtrasQuery = `query AllFunExtrasQuery {
  funExtraTypes(where: { hideEmpty: true }) {
    nodes {
      key: id
      name
      count
      description
      funExtras {
        nodes {
          key: id
          title
          link
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                height
                width
              }
            }
          }
        }
      }
    }
  }
}`

export const fetchAllFunExtras = async () => {
  const response = await fetchGraphQL<FunExtrasResponse>({
    query: allFunExtrasQuery,
    url: getGraphQLUrl(),
    variables: {},
  });

  if (!response.funExtraTypes) {
    return Promise.reject(new Error('No fun extras found'));
  }

  return response.funExtraTypes
}
