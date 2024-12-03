import { fetchGraphQL } from '@/lib/functions'
import { Bookmark } from '@/lib/types'

export async function getAllBookmarks() {
  const query = `
query GetAllBookmarks {
  bookmarks(where:{status:PUBLISH}) {
    nodes {
      title(format:RENDERED)
      databaseId
      slug
      commentCount
      date
      modified
      content(format:RENDERED)
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
