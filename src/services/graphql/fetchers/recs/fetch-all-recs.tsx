import type { Rec } from '@/types';
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers';

export type RecsResponse = {
  recs: {
    nodes: Rec[];
    pageInfo: {
      offsetPagination: {
        total: number;
      };
    };
  };
};

const allRecsQuery = `query AllRecommendations($size: Int!, $offset: Int!) {
  recs: recommendations(where: {
    status: PUBLISH,
    offsetPagination: { size: $size, offset: $offset },
    orderby: { field: DATE, order: DESC },
  }) {
    nodes {
      date
      databaseId
      id
      slug
      title
      uri
    }
    pageInfo {
      offsetPagination {
        total
      }
    }
  }
}`;

export const fetchAllRecs = async (
  page: number,
  perPage: number
): Promise<RecsResponse> => {
  const response = await fetchGraphQL<RecsResponse>({
    query: allRecsQuery,
    url: getGraphQLUrl(),
    variables: {
      offset: (page - 1) * perPage,
      size: perPage,
    },
  });

  return response;
};
