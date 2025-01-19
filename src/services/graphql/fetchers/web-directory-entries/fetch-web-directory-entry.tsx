import type { Nullable, WPWebDirectoryCategory } from '@/types'
import { fetchGraphQL, getGraphQLUrl } from "@/utils/helpers";

export type WebDirectoryEntryResponse = {
  webDirectoryCategory: Nullable<WPWebDirectoryCategory>
}

const webDirectoryEntryQuery = `query WebDirectoryEntry($slug: ID!, $term: String) {
  webDirectoryCategory(id: $slug, idType: SLUG) {
    name
    seo {
      breadcrumbs {
        text
        url
      }
      metaDesc
      title
    }
    webDirectoryEntries(where: {taxQuery: {taxArray: {taxonomy: WEBDIRECTORYCATEGORY, terms: [$term], operator:IN, field:SLUG}}}) {
      nodes {
        key: id
        title
        slug
        uri
        databaseId
        featuredImage {
          node {
            altText
            mediaDetails {
              height
              width
            }
            sourceUrl
          }
        }
        webDirectoryEntryDetails {
          description
          screenshot {
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
  }
}`;

export const fetchWebDirectoryEntry = async (slug: string) => {
  const response = await fetchGraphQL<WebDirectoryEntryResponse>({
    query: webDirectoryEntryQuery,
    url: getGraphQLUrl(),
    variables: { slug: slug, term: slug }
  })

  if (!response || !response.webDirectoryCategory) {
    return Promise.reject(new Error(`No web directory entry found for ${slug}`)
    )
  }

  return response.webDirectoryCategory;
}
