import type { Nullable, WPResourcePreview, GraphQLNodes } from '@/types';
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers';

export type ResourceResponse = {
  resources: Nullable<GraphQLNodes<WPResourcePreview>>;
};

const allResourcesQuery = `query AllResources {
  resources {
    nodes {
      key: id
      title
      slug
      uri
    }
  }
}`;

export const fetchAllResources = async () => {
  const response = await fetchGraphQL<ResourceResponse>({
    query: allResourcesQuery,
    url: getGraphQLUrl(),
    variables: {},
  });

  if (!response.resources) {
    return Promise.reject(new Error('No resources found.'));
  }

  return response.resources;
}
