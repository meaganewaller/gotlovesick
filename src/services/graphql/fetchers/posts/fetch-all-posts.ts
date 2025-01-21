import type { GraphQLNodes, Nullable, WPPostLtd } from '@/types'
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers'

type PostsResponse = {
  posts: Nullable<GraphQLNodes<WPPostLtd>>;
}

const fetchAllPostsQuery = `query FetchAllPosts($first: Int) {
  posts(first: $first) {
    nodes {
      key: id
      slug
      uri
      title
      postDetails {
        headerImage {
          node {
            altText
            sourceUrl
            mediaDetails {
              width
              height
            }
          }
        }
        description
      }
    }
  }
}`

export const fetchAllPosts = async (count: number) => {
  const response = await fetchGraphQL<PostsResponse>({
    query: fetchAllPostsQuery,
    url: getGraphQLUrl(),
    variables: { first: count },
  })

  if (!response.posts)
    return Promise.reject(new Error('Unable to find the posts.'));

  return response.posts
}
