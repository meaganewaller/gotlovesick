import type { Nullable, WPResourceType } from '@/types'
import { fetchGraphQL, getGraphQLUrl } from "@/utils/helpers";

export type ResourceTypeResponse = {
  resourceType: Nullable<WPResourceType>
}

const resourceTypeQuery = `query ResourceType($slug: ID!, $term: String) {
  resourceType(id: $slug, idType: SLUG) {
    key: id
    uri
    databaseId
    slug
    name
    count
    seo {
      breadcrumbs {
        text
        url
      }
      metaDesc
      title
    }
    description
    resources(where: {taxQuery: {taxArray: {taxonomy: RESOURCETYPE, terms: [$term], operator:IN, field:SLUG}}}) {
      nodes {
        key: id
        title
        slug
        uri
        databaseId
      }
    }
  }
}`

export const fetchResourceType = async (slug: string) => {
  const response = await fetchGraphQL<ResourceTypeResponse>({
    query: resourceTypeQuery,
    url: getGraphQLUrl(),
    variables: { slug: slug, term: slug }
  })

  console.log("response", response)

  if (!response || !response.resourceType) {
    return Promise.reject(new Error(`No resource type found for ${slug}`)
    )
  }

  return response.resourceType;
}
