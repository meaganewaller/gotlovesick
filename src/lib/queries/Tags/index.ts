import { fetchGraphQL } from "@/lib/functions"
import { Tag, TagPage } from "@/lib/types"

export async function getAllTags() {
  const query = `
    query GetAllTags {
      tags(where: {hideEmpty: true}) {
        nodes {
          databaseId
          name
          slug
          count
        }
      }
    }
  `

  const response = await fetchGraphQL(query)

  return response.data.tags.nodes as Tag[]
}

export async function getTagBySlug(slug: string) {
  const query = `
    query GetTagBySlug($slug: ID!) {
      tag(id: $slug, idType: SLUG) {
        databaseId
        name
        slug
        count
        collectionFields {
          icon {
            node {
              altText
              mediaDetails {
                height
                width
              }
              sourceUrl
            }
          }
        }
        posts {
          nodes {
            commentCount
            databaseId
            date
            slug
            modified
            excerpt
            title
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
            categories {
              nodes {
                databaseId
                slug
                name
              }
            }
          }
        }
      }
    }
  `

  const variables = { slug: slug }

  const response = await fetchGraphQL(query, variables)

  return response.data.tag as TagPage
}
