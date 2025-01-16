import type { Nullable, WPQuiz } from '@/types';
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers';

export type QuizResponse = {
  quiz: Nullable<WPQuiz>;
};

const quizQuery = `query Quiz($slug: ID!) {
  quiz: funExtra(id: $slug, idType: SLUG) {
    key: id
    seo {
      breadcrumbs {
        text
        url
      }
      metaDesc
      title
    }
    slug
    title
  }
}`;

export const fetchQuiz = async (slug: string) => {
  const response = await fetchGraphQL<QuizResponse>({
    query: quizQuery,
    url: getGraphQLUrl(),
    variables: { slug },
  });

  if (!response.quiz) {
    return Promise.reject(
      new Error(`No quiz found for the following slug: ${slug}.`)
    );
  }

  return response.quiz;
};
