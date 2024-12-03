import {fetchGraphQL} from '@/lib/functions'
import {Post} from '@/lib/types'

/**
 * Fetch all projects.
 */
export default async function getAllProjects() {
  const query = `
    query getAllProjects {
      projects(where:{status:PUBLISH}) {
        edges {
          node {
            databaseId
            date
            modified
            title
            slug
            excerpt(format:RENDERED)
            featuredImage{
              node {
                altText
                sourceUrl
                mediaDetails{
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
    }
  `

  const response = await fetchGraphQL(query)
  return response.data.projects.edges.map((edge: any) => edge.node) as Post[]
}
