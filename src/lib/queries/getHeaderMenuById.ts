import { fetchGraphQL } from "@/lib/functions"
import { Menu } from "@/lib/types"

export default async function getHeaderMenuById(id: string) {
  const query = `
  query GetHeaderMenuById($id: ID = "URI"){
    menu(id: $id, idType: ID) {
      count
      id
      databaseId
      name
      slug
      menuItems {
        nodes {
          id
          databaseId
          title
          url
          cssClasses
          description
          label
          linkRelationship
          target
          parentId
        }
        edges {
            node {
                uri
                label
                databaseId
            }
        }
      }
    }
  }
  `

  const variables = {
    id: id
  }

  const response = await fetchGraphQL(query, variables)

  return response.data.menu as Menu
}
