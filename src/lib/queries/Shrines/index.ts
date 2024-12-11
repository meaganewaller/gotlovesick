import { fetchGraphQL } from "@/lib/functions";
import { Shrine } from '@/lib/types'

export async function getAllShrines() {
  const query = `
    query getAllShrines {
      shrines(where: { status: PUBLISH }) {
        nodes {
          title(format: RENDERED)
          databaseId
          slug
          commentCount
          date
          modified
          content(format: RENDERED)
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
        }
      }
    }
  `

  const response = await fetchGraphQL(query)

  return response.data.shrines.nodes.map(
    (node: any) => node
  ) as Shrine[]
}

export async function getShrineBySlug(slug: string) {
  const query = `
    query GetShrineBySlug($slug: ID!) {
      shrine(id: $slug, idType: SLUG) {
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
        comments(first: 30, where: {order: ASC}) {
          nodes {
            content(format: RENDERED)
            databaseId
            date
            status
            author {
              node {
                avatar {
                  url
                }
                email
                name
                url
              }
            }
          }
        }
      }
    }
  `

  const variables = {
    slug: slug
  }

  const response = await fetchGraphQL(query, variables)

  return response.data.shrine as Shrine
}
