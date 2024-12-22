import type {
  GraphQLConnection,
  GraphQLEdgesInput,
  GraphQLPostOrderBy,
  GraphQLBookmarkWhere,
  Nullable,
  WPBookmarkPreview,
} from '@/types'
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers'

export type BookmarksListResponse = {
  bookmarks: Nullable<GraphQLConnection<WPBookmarkPreview>>;
};

const bookmarksListQuery = `query BookmarksList($after: String, $before: String, $first: Int, $last: Int, $authorName: String, $orderby: [BookmarkObjectsConnectionOrderbyInput], $search: String, $title: String) {
  bookmarks(
    after: $after
    before: $before
    first: $first
    last: $last
    where: {authorName: $authorName, orderby: $orderby, search: $search, title: $title}
  ) {
    edges {
      cursor
      node {
        commentCount
        contentParts {
          beforeMore
        }
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
        info {
          wordsCount
        }
        modified
        slug
        title
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      total
    }
  }
}`;

export type FetchBookmarksListInput = GraphQLEdgesInput & {
  orderBy?: GraphQLPostOrderBy;
  where?: GraphQLBookmarkWhere;
};

/**
 * Retrieve a paginated list of WordPress bookmarks.
 *
 * @param {FetchBookmarksListInput} input - The input to retrieve bookmarks.
 * @returns {Promise<GraphQLConnection<WPBookmarkPreview>>} The paginated bookmarks.
 */
export const fetchBookmarksList = async ({
  orderBy,
  where,
  ...vars
}: FetchBookmarksListInput): Promise<GraphQLConnection<WPBookmarkPreview>> => {
  const response = await fetchGraphQL<BookmarksListResponse>({
    query: bookmarksListQuery,
    url: getGraphQLUrl(),
    variables: {
      ...vars,
      ...where,
      orderBy: orderBy ? [orderBy] : undefined,
    },
  });

  if (!response.bookmarks) return Promise.reject(new Error('No bookmarks found.'));

  return response.bookmarks;
};
