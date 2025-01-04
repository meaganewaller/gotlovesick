import type { GraphQLPageInfo, Nullable } from '@/types';
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers';

export type LastBookmarkCursorResponse = {
  bookmarks: Nullable<Record<'pageInfo', Pick<GraphQLPageInfo, 'endCursor'>>>;
};

const lastBookmarkCursorQuery = `query LastBookmarkCursor($first: Int) {
  bookmarks(first: $first) {
    pageInfo {
      endCursor
    }
  }
}`;

/**
 * Retrieve the cursor of the last bookmark for a given number of bookmarks.
 *
 * @param {number} count - The number of bookmarks to fetch.
 * @returns {Promise<string>} The cursor of the last bookmark.
 */
export const fetchLastBookmarkCursor = async (
  count: number
): Promise<string> => {
  const response = await fetchGraphQL<LastBookmarkCursorResponse>({
    url: getGraphQLUrl(),
    query: lastBookmarkCursorQuery,
    variables: { first: count },
  });

  if (!response.bookmarks?.pageInfo.endCursor)
    return Promise.reject(
      new Error('Unable to find the cursor of the last bookmark.')
    );

  return response.bookmarks.pageInfo.endCursor;
};
