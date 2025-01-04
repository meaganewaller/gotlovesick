import type { Nullable, WPBookmark } from '@/types';
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers';

export type BookmarkResponse = {
  bookmark: Nullable<WPBookmark>;
};

const bookmarkQuery = `query Bookmark($slug: ID!) {
  bookmark(id: $slug, idType: SLUG) {
    author {
      node {
        name
      }
    }
    commentCount
    contentParts {
      afterMore
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
    seo {
      metaDesc
      title
    }
    slug
    title
  }
}`;

/**
 * Retrieve a WordPress bookmark by slug.
 *
 * @param {string} slug - The bookmark slug.
 * @returns {Promise<WPBookmark>} The requested bookmark.
 */
export const fetchBookmark = async (slug: string): Promise<WPBookmark> => {
  const response = await fetchGraphQL<BookmarkResponse>({
    query: bookmarkQuery,
    url: getGraphQLUrl(),
    variables: { slug },
  });

  if (!response.bookmark)
    return Promise.reject(
      new Error(`No bookmark found for the following slug ${slug}.`)
    );

  return response.bookmark;
};
