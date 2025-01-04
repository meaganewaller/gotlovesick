import type {
  GraphQLConnection,
  GraphQLEdgesInput,
  GraphQLBookmarkWhere,
  Nullable,
  RecentWPBookmark,
} from '@/types';
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers';

export type RecentBookmarksResponse = {
  bookmarks: Nullable<GraphQLConnection<RecentWPBookmark>>;
};

const recentBookmarksQuery = `query RecentBookmarks($after: String, $before: String, $first: Int, $last: Int, $authorName: String, $search: String, $title: String) {
  bookmarks(
    after: $after
    before: $before
    first: $first
    last: $last
    where: {authorName: $authorName, search: $search, title: $title, orderby: {field: DATE, order: DESC}}
  ) {
    edges {
      cursor
      node {
        databaseId
        date
        featuredImage {
          node {
            altText
            mediaDetails {
              height
              width
            }
            sourceUrl
            title
          }
        }
        slug
        title
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      total
    }
  }
}`;

export type FetchRecentBookmarksInput = GraphQLEdgesInput & {
  where?: GraphQLBookmarkWhere;
};

/**
 * Retrieve a paginated list of recent WordPress bookmarks.
 *
 * @param {FetchRecentBookmarksInput} input - The input to retrieve recent bookmarks.
 * @returns {Promise<GraphQLConnection<RecentWPBookmark>>} The recent bookmarks.
 */
export const fetchRecentBookmarks = async ({
  where,
  ...vars
}: FetchRecentBookmarksInput): Promise<GraphQLConnection<RecentWPBookmark>> => {
  const response = await fetchGraphQL<RecentBookmarksResponse>({
    query: recentBookmarksQuery,
    url: getGraphQLUrl(),
    variables: { ...vars, ...where },
  });

  if (!response.bookmarks)
    return Promise.reject(new Error('No recent bookmarks found.'));

  return response.bookmarks;
};
