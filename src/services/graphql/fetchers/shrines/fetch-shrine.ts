import type { Nullable, WPShrine } from '@/types';
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers';

export type ShrineResponse = {
  shrine: Nullable<WPShrine>;
};

const shrineQuery = `query Shrine($slug: ID!) {
  shrine(id: $slug, idType: URI) {
    id
    contentParts {
      afterMore
      beforeMore
    }
    content
    databaseId
    date
    featuredImage {
      node {
        altText
        sourceUrl
        mediaDetails {
          height
          width
        }
      }
    }
    id
    modified
    seo {
      breadcrumbs {
        text
        url
      }
      metaDesc
      title
    }
    slug
    title
    shrineDetails {
      featuredSections {
        content
        title
      }
      sidebar {
        nodes {
          ... on Shrine {
            id
            databaseId
            title
            slug
            uri
          }
        }
      }
      shortDescription
      headerImage {
        node {
          altText
          mediaDetails {
            height
            width
          }
          sourceUrl
        }
      }
    }
  }
}`;

export const fetchShrine = async (slug: string) => {
  const response = await fetchGraphQL<ShrineResponse>({
    query: shrineQuery,
    url: getGraphQLUrl(),
    variables: { slug },
  });

  if (!response.shrine) {
    return Promise.reject(
      new Error(`No shrine found for the following slug ${slug}.`)
    );
  }

  return response.shrine;
};
