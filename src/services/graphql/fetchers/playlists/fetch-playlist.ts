import type { Nullable, WPPlaylist } from "@/types"
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers';

type PlaylistResponse = {
  playlist: Nullable<WPPlaylist>;
};

const playlistQuery = `query Playlist($slug: ID!) {
  playlist(id: $slug, idType: URI) {
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
  }
}`;

export const fetchPlaylist = async (slug: string) => {
  const response = await fetchGraphQL<PlaylistResponse>({
    query: playlistQuery,
    url: getGraphQLUrl(),
    variables: { slug },
  });

  if (!response.playlist) {
    return Promise.reject(
      new Error(`No playlist found for the following slug ${slug}.`)
    );
  }

  return response.playlist;
};

