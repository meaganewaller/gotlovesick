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
