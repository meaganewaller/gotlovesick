import type { Nullable, WPResource } from '@/types'
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers'

export type ResourceResponse = {
  resource: Nullable<WPResource>
}

const resourceQuery = `query Resource($slug: ID!) {
  resource(id: $slug, idType: SLUG) {
    title
    slug
    uri
    databaseId
    key: id
    content
    contentParts {
      beforeMore
      afterMore
    }
    seo {
      breadcrumbs {
        text
        url
      }
      metaDesc
      title
    }
  }
}`

export const fetchResource = async (slug: string) => {
  const response = await fetchGraphQL<ResourceResponse>({
    query: resourceQuery,
    url: getGraphQLUrl(),
    variables: { slug },
  });

  if (!response.resource) {
    return Promise.reject(
      new Error(`No resource found for the following slug ${slug}.`)
    );
  }

  return response.resource;
};
