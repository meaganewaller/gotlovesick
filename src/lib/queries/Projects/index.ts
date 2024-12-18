import {fetchGraphQL} from '@/lib/functions'
import {Post} from '@/lib/types'

/**
 * Fetch all projects.
 */
export async function getAllProjects() {
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

/**
 * Fetch a single project post by slug.
 */
export async function getProjectBySlug(slug: string) {
  const query = `
    query GetProject($slug: ID!) {
      project(id: $slug, idType: SLUG) {
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

  return response.data.project as Post
}
