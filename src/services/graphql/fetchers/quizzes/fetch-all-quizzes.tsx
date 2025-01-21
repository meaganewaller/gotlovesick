import type { Nullable, GraphQLNodes, WPQuizList } from '@/types';
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers';

export type QuizzesResponse = {
  quizzes: Nullable<GraphQLNodes<WPQuizList>>;
};

const allQuizzesQuery = `query AllQuizzes {
  quizzes(
    where: {
      status: PUBLISH
    }
  ) {
    nodes {
      key: id
      title
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
