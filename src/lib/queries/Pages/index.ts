import { fetchGraphQL } from "@/lib/functions"
import { Page } from "@/lib/types"

/**
 * Fetch all pages.
 */
export async function getAllPages() {
  const query = `
    query GetAllPages {
      pages(where: {status: PUBLISH}) {
        nodes {
          content(format: RENDERED)
          databaseId
          date
          modified
          excerpt(format: RENDERED)
          slug
          featuredImage {
            node {
              altText
              sourceUrl
              mediaDetails {
                height
                width
              }
            }
          }
          seo {
            metaDesc
            title
          }
        }
      }
    }
  `

  const response = await fetchGraphQL(query)
  return response.data.pages.nodes as Page[]
}

/**
 * Fetch a page by slug.
 */
export async function getPageBySlug(slug: string) {
  const query = `
    query GetPageBySlug($slug: ID = "URI") {
      page(idType: URI, id: $slug) {
        databaseId
        date
        modified
        content(format: RENDERED)
        title(format: RENDERED)
        featuredImage {
          node {
            altText
            sourceUrl
            mediaDetails {
                height
                width
            }
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
        seo {
          metaDesc
          title
        }
      }
    }
  `

  const variables = {
    slug: slug
  }

  const response = await fetchGraphQL(query, variables)

  return response.data.page as Page
}
