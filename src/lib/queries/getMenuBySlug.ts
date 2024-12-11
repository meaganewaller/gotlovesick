import { fetchGraphQL } from '@/lib/functions'
import { Menu } from '@/lib/types'

/**
 * Fetch a menu by slug.
 */
export default async function getMenuBySlug(slug: string) {
  const query = `
    query GetMenuBySlug($slug: ID!) {
      menu(id: $slug, idType: SLUG) {
        menuItems {
          nodes {
            uri
            label
            databaseId
            id
          }
        }
      }
    }
  `

  const variables = {
    slug: slug
  }

  const response = await fetchGraphQL(query, variables)

  return response.data.menu as Menu
}
