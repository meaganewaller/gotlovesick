import type { GraphQLNodes, Nullable, Post } from '@/types'
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers'

type PostsResponse = {
  posts: Nullable<{
    nodes: Post[];
    pageInfo: { offsetPagination: { total: number }};
  }>
}

const fetchAllPostsQuery = `query FetchAllPosts($size: Int!, $offset: Int!) {
  posts(where: { offsetPagination: { size: $size, offset: $offset }, orderby: { field: DATE, order: DESC }}) {
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
      tags {
        edges {
          node {
            name
            slug
          }
        }
      }
      categories {
        edges {
          node {
            name
            slug
          }
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

export async function fetchAllPosts(page: number, perPage: number): Promise<PostsResponse> {
  const response = await fetchGraphQL<PostsResponse>({
    query: fetchAllPostsQuery,
    url: getGraphQLUrl(),
    variables: { offset: (page - 1) * perPage, size: perPage },
  });

  return response;
};
