import type { GraphQLPageInfo, GraphQLBookmarkWhere, Nullable } from '@/types';
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers';

export type BookmarksCountResponse = {
  bookmarks: Nullable<Record<'pageInfo', Pick<GraphQLPageInfo, 'total'>>>;
};

const bookmarksCountQuery = `query BookmarksCount($authorName: String, $search: String, $title: String) {
  bookmarks(where: {authorName: $authorName, search: $search, title: $title}) {
    pageInfo {
      total
    }
  }
}`;

/**
 * Retrieve the total of WordPress bookmarks.
 *
 * @param {GraphQLBookmarkWhere} [input] - The input to filter the bookmarks.
 * @returns {Promise<number>} The total number of bookmarks.
 */
export const fetchBookmarksCount = async (
  input?: GraphQLBookmarkWhere
): Promise<number> => {
  const response = await fetchGraphQL<BookmarksCountResponse>({
    query: bookmarksCountQuery,
    url: getGraphQLUrl(),
    variables: { ...input },
  });

  if (!response.bookmarks)
    return Promise.reject(
      new Error('Unable to find the total number of bookmarks.')
    );

  return response.bookmarks.pageInfo.total;
};
