import type { Nullable, WPPlaylist } from '@/types';
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers';

type PlaylistResponse = {
  playlist: Nullable<WPPlaylist>;
};

const playlistQuery = `query Playlist($slug: ID!) {
  playlist(id: $slug, idType: URI) {
    id
    databaseId
    date
    playlistDetails {
      description
      embed
      featured
      playlistCover {
        node {
          altText
          mediaDetails {
            height
            width
          }
          sourceUrl
        }
      }
      songs {
        artist
        description
        link
        songTitle
        trackSide
      }
    }
    slug
    title
    moods {
      nodes {
        name
        slug
        id
      }
    }
    genres {
      nodes {
        name
        slug
        id
      }
    }
    playlistActivities {
      nodes {
        name
        slug
        id
      }
    }
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
