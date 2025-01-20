import type { Nullable, WPPollList, GraphQLNodes } from '@/types';
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers';

type PollsResponse = {
  polls: Nullable<WPPollList>
}

const allPollsQuery = `query AllPolls {
  polls(where: { status: PUBLISH }) {
    nodes {
      key: id
      title
      uri
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
      pollDetails {
        description
      }
    }
  }
}`

export const fetchAllPolls = async () => {
  const response = await fetchGraphQL<PollsResponse>({
    query: allPollsQuery,
    url: getGraphQLUrl(),
    variables: {},
  })

  if (!response.polls) {
    return Promise.reject(new Error(`No polls found`))
  }

  return response.polls;
}
