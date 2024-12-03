import {fetchGraphQL} from '@/lib/functions'
import {Bookmark} from '@/lib/types'

export default async function getAllBookmarks() {
  const query = `
    query getAllBookmarks {
      bookmarks(where: {status: PUBLISH}) {
        edges {
          node {
            databaseId
            date
            modified
            title
            slug
            excerpt(format: RENDERED)
            seo {
              metaDesc
              title
            }
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
            collections {
              nodes {
                name
                slug
                parent {
                  node {
                    slug
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  const response = await fetchGraphQL(query)

  return response.data.bookmarks.nodes as Bookmark[]
}
