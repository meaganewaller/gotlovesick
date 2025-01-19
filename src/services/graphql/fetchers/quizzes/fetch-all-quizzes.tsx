import type { Nullable, GraphQLNodes } from '@/types';
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers';

export type QuizzesResponse = {
  quizzes: Nullable<GraphQLNodes<any>>;
};

const allQuizzesQuery = `query AllQuizzes {
  quizzes: funExtras(
    where: {
      taxQuery: {
        relation: AND,
        taxArray: {
          field: SLUG,
          operator: AND,
          taxonomy: FUNEXTRATYPE,
          terms: "quizzes"
        }
      },
      status: PUBLISH
    }
  ) {
    nodes {
      key: id
      title
      slug
      uri
      quizFields {
        description
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
    }
  }
}`;

export const fetchAllQuizzes = async () => {
  const response = await fetchGraphQL<QuizzesResponse>({
    query: allQuizzesQuery,
    url: getGraphQLUrl(),
    variables: {},
  });

  if (!response.quizzes) {
    return Promise.reject(new Error('No quizzes found'));
  }

  return response.quizzes;
};
