import type { GraphQLNodes, Nullable, SlugNode } from '@/types';
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers';

export type BookmarksSlugsResponse = {
  bookmarks: Nullable<GraphQLNodes<SlugNode>>;
};

const bookmarksSlugsQuery = `query BookmarksSlug($first: Int) {
  bookmarks(first: $first) {
    nodes {
      slug
    }
  }
}`;

/**
 * Retrieve the WordPress bookmarks slugs.
 *
 * @param {number} count - The number of bookmarks slugs to retrieve
 * @returns {Promise<string[]>} The bookmarks slugs.
 */
export const fetchAllBookmarksSlugs = async (
  count: number
): Promise<string[]> => {
  const response = await fetchGraphQL<BookmarksSlugsResponse>({
    query: bookmarksSlugsQuery,
    url: getGraphQLUrl(),
    variables: { first: count },
  });

  if (!response.bookmarks)
    return Promise.reject(new Error('Unable to find the bookmarks slugs.'));

  return response.bookmarks.nodes.map((node) => node.slug);
};
