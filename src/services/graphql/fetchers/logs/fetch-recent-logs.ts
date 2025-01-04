import type {
  GraphQLConnection,
  GraphQLEdgesInput,
  GraphQLPostWhere,
  Nullable,
  WPLog,
} from '@/types';

import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers';

export type RecentLogsResponse = {
  logs: Nullable<GraphQLConnection<WPLog>>;
};

const recentLogsQuery = `query RecentLogs($first: Int) {
  logs(
    first: $first
  ) {
    edges {
      cursor
      node {
        databaseId
        date
        slug
        modified
        title
        contentParts {
          afterMore
          beforeMore
        }
        seo {
          metaDesc
          title
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      total
    }
  }
}`;

export type FetchRecentLogsInput = GraphQLEdgesInput & {
  where?: GraphQLPostWhere;
};

/**
 * Retrieve a paginated list of recent WordPress logs.
 *
 * @param {FetchRecentLogsInput} input - The input to retrieve recent logs.
 * @returns {Promise<GraphQLConnection<RecentWPLog>>} The recent logs.
 */
export const fetchRecentLogs = async ({
  where,
  ...vars
}: FetchRecentLogsInput): Promise<GraphQLConnection<WPLog>> => {
  const response = await fetchGraphQL<RecentLogsResponse>({
    query: recentLogsQuery,
    url: getGraphQLUrl(),
    variables: { ...vars, ...where },
  });

  if (!response.logs)
    return Promise.reject(new Error('No recent posts found.'));

  return response.logs;
};
