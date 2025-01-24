import type { Nullable, Post } from '@/types'
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers'

type PostsResponse = {
  posts: Nullable<{
    nodes: Post[];
    pageInfo: { offsetPagination: { total: number }};
  }>
}

const postsQuery = `query FetchAllPosts($categorySlug: String, $size: Int!, $offset: Int!) {
  posts(where: { offsetPagination: { size: $size, offset: $offset }, orderby: { field: DATE, order: DESC }, categoryName: $categorySlug }) {
    nodes {
      key: id
      author {
        node {
          name
          slug
          avatar {
            url
          }
        }
      }
      title
      slug
      date
      postDetails {
        headerImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        description
      }
    }
    pageInfo {
      offsetPagination {
        total
      }
    }
  }
}`

export const fetchPostsByCategory = async (categorySlug: string, page: number, perPage: number): Promise<PostsResponse> => {
  const response = await fetchGraphQL<PostsResponse>({
    query: postsQuery,
    url: getGraphQLUrl(),
    variables: { categorySlug, offset: (page - 1) * perPage, size: perPage }
  })

  return response;
}
