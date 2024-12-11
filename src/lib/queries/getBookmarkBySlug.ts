import { fetchGraphQL } from '@/lib/functions'
import { Bookmark } from '@/lib/types'

export default async function getBookmarkBySlug(slug: string) {
  const query = `
    query getBookmarkBySlug($slug: ID!) {
      bookmark(id:$slug, idType:SLUG){
        databaseId
        date
        modified
        content(format:RENDERED)
        title(format:RENDERED)
        bookmarkFields {
          link
        }
        featuredImage {
          node{
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
        collection {
          nodes {
            id
            databaseId
            slug
            uri
            name
          }
        }
        comments(first: 30, where:{order:ASC}){
          nodes {
            content(format:RENDERED)
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

  const variables = { slug: slug }

  const response = await fetchGraphQL(query, variables)

  return response.data.bookmark as Bookmark
}
