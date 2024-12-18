import { fetchGraphQL } from '@/lib/functions'
import { Review } from '@/lib/types'

export async function getByReviewType(slug: string) {
  const query = `
    query GetByReviewType($slug:ID!){
    	reviewType(id:$slug,idType:SLUG){
        databaseId
        reviews {
          nodes {
            id
            databaseId
            date
            slug
            uri
            modified
            title
            excerpt
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

            commentCount
            contentTypeName
            reviewType {
              nodes {
                slug
              }
            }
    				reviewDetails {
              rating
              releaseDate
              reviewContent
            }
          }
        }
      }
    }
  `

  const variables = { slug: slug }

  const response = await fetchGraphQL(query, variables)

  return response.data.reviewType.reviews.nodes as Review[]
}

export async function getAllReviews() {
  const query = `
query GetAllReviews {
  reviews(where:{status:PUBLISH}) {
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

  return response.data.reviews.nodes.map(
    (node: any) => node
  ) as Review[]
}

export async function getReviewBySlug(slug: string) {
  const query = `
    query GetReviewBySlug($slug: ID!) {
  review(id:$slug,idType:SLUG){
    id
date
title(format:RENDERED)
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

    databaseId
    modified
    commentCount
    commentStatus
    reviewDetails {
      rating
      releaseDate
      reviewContent
    }
    comments {
      nodes {
        id
        content
      }
    }
    reviewType {
      nodes {
        slug
        name
      }
    }
  }
}
  `

  const variables = { slug: slug }

  const response = await fetchGraphQL(query, variables)

  return response.data.review as Review
}

