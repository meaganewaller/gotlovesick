import type { Nullable, WPShrine, GraphQLNodes } from '@/types';
import { fetchGraphQL, getGraphQLUrl } from "@/utils/helpers";

export type ShrineResponse = {
  shrines: Nullable<GraphQLNodes<WPShrine>>;
}

const allShrinesQuery = `query AllShrines {
  shrines(where: { parent: 0 }) {
    nodes {
      id
      title
      slug
      uri
      shrineDetails {
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
  }
}`;

export const fetchAllShrines = async () => {
  const response = await fetchGraphQL<ShrineResponse>({
    query: allShrinesQuery,
    url: getGraphQLUrl(),
    variables: {},
  });

  if (!response.shrines) {
    return Promise.reject(
      new Error(`No shrines found`)
    )
  }

  return response.shrines;
}
