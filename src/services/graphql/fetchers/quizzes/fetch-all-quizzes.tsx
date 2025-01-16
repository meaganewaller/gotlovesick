import type { Nullable, WPQuiz, GraphQLNodes, WPFunExtrasType } from '@/types';
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers';

export type QuizzesResponse = {
  quizzes: Nullable<GraphQLNodes<WPQuiz>>;
};

const allQuizzesQuery = `query AllQuizzes {
  quizzes: funExtras(
    where: {taxQuery: {relation: AND, taxArray: {field: SLUG, operator: AND, taxonomy: TYPE, terms: "quizzes"}}}
  ) {
    nodes {
      key: id
      title
      slug
      uri
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
