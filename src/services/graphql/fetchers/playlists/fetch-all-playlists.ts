import type { Nullable, WPPlaylist, GraphQLNodes } from "@/types"
import { fetchGraphQL, getGraphQLUrl } from "@/utils/helpers";

type PlaylistResponse = {
  playlists: Nullable<GraphQLNodes<WPPlaylist>>;
}

const allPlaylistsQuery = `query AllPlaylists($first: Int) {
  playlists(first: $first) {
    nodes {
      id
      title
      uri
      slug
    }
  }
}`;

export const fetchAllPlaylists = async ({ first }: { first: number }) => {
  const response = await fetchGraphQL<PlaylistResponse>({
    query: allPlaylistsQuery,
    url: getGraphQLUrl(),
    variables: { first: first },
  });

  if (!response.playlists) {
    return Promise.reject(
      new Error(`No playlists found`)
    )
  }

  return response.playlists;
}
