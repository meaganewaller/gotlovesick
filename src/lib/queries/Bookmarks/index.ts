import { fetchGraphQL } from '@/lib/functions'
import { Bookmark } from '@/lib/types'

export async function getAllBookmarks() {
  const query = `
    query GetAllBookmarks {
      bookmarks(where:{status:PUBLISH}) {
        nodes {
          databaseId
          date
          modified
          title
          slug
          excerpt
          seo {
            metaDesc
            title
          }
          collections {
            nodes {
              collectionFields {
                color
              }
              databaseId
              count
              description
              name
              slug
            }
          }
          commentCount
          content
          featuredImage{
            node{
              altText
              sourceUrl
              mediaDetails{
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

  return response.data.bookmarks.nodes.map(
    (node: any) => node
  ) as Bookmark[]
}

export async function getBookmarkBySlug(slug: string) {
  const query = `
    query GetBookmarkBySlug($slug: ID!) {
      bookmark(id: $slug, idType: SLUG) {
        id
        date
        modified
        slug
        seo {
          metaDesc
          metaKeywords
          title
        }
        databaseId
        content(format: RAW)
        excerpt(format: RAW)
        featuredImage {
          node {
            altText
            mediaDetails {
              height
              width
            }
            sourceUrl(size: LARGE)
          }
        }
        title(format: RAW)
        collections {
          nodes {
            databaseId
            count
            description
            name
            slug
          }
        }
      }
    }
  `

  const variables = {
    slug: slug
  }

  const response = await fetchGraphQL(query, variables)

  return response.data.bookmark as Bookmark
}

export async function getBookmarksByCollection(slug: string) {

}
