import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers'
import type { Nullable, WPPoll } from '@/types'

type PollResponse = {
  poll: Nullable<WPPoll>;
}

const pollQuery = `query FetchPoll($slug: ID!) {
  poll(id: $slug, idType: SLUG) {
    id
    databaseId
    uri
    slug
    date
    seo {
      breadcrumbs {
        text
        url
      }
      metaDesc
      title
    }
    title
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
      limited
      expiration
      question
      pollOptions {
        votes
        id
        body
      }
    }
  }
}`

export const fetchPoll = async (slug: string) => {
  const response = await fetchGraphQL<PollResponse>({
    query: pollQuery,
    url: getGraphQLUrl(),
    variables: { slug },
  });

  if (!response.poll) {
    return Promise.reject(
      new Error(`No poll found for the following slug ${slug}.`)
    );
  }

  return response.poll;
};
