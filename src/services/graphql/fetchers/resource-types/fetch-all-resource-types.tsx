import type { Nullable, WPResourceType, GraphQLNodes } from '@/types';
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers';

export type ResourceTypesResponse = {
  resourceTypes: Nullable<GraphQLNodes<WPResourceType>>;
};

const allResourceTypesQuery = `query AllResourceTypes {
  resourceTypes(where: { hideEmpty: true }, first: 20) {
    nodes {
      key: id
      slug
      uri
      name
      count
      description
    }
  }
}`;

export const fetchAllResourceTypes = async () => {
  const response = await fetchGraphQL<ResourceTypesResponse>({
    query: allResourceTypesQuery,
    url: getGraphQLUrl(),
    variables: {},
  });

  if (!response.resourceTypes) {
    return Promise.reject(new Error('No resource types found.'));
  }

  return response.resourceTypes;
}
