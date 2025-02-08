import type { BookRec } from '@/types'
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers';

export type BookRecResponse = {
  rec: BookRec
}

const bookRecQuery = `query BookRecommendationQuery($slug: ID!) {
  rec: recommendation(id: $slug, idType: URI) {
    databaseId
    date
    title
    slug
    content(format: RENDERED)
    genres {
      nodes {
        databaseId
        name
        parentDatabaseId
      }
    }
    seo {
      title
      metaDesc
      breadcrumbs {
        text
        url
      }
    }
    bookRecDetails {
      author
      ageRange
      bookCover {
        node {
          altText
          sourceUrl
          mediaDetails {
            width
            height
          }
        }
      }
      bookTitle
      contentWarnings
      rating
      year
    }
  }
}`

export const fetchRecommendation = async (recType: string, slug: string) => {
  let response
  if (recType === "books") {
    response = await fetchGraphQL<BookRecResponse>({
      query: bookRecQuery,
      url: getGraphQLUrl(),
      variables: { slug }
    })
  }

  if (!response) {
    return Promise.reject(new Error('No recommendation found'));
  }

  return response.rec;
}
