import type { Nullable } from '@/types';
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers';

export type QuizResponse = {
  quiz: Nullable<any>;
};

const quizQuery = `query Quiz($slug: ID!) {
  quiz(id: $slug, idType: URI) {
    key: id
    title
    slug
    seo {
      title
      metaDesc
      breadcrumbs {
        text
        url
      }
    }
    quizFields {
      autoScroll
      showCopyShareButton
      description
      generalBackgroundColor
      generalFontColor
      questions {
        answerArrangement
        answers {
          answer
          backgroundColor
          backgroundImageSrc {
            node {
              sourceUrl
            }
          }
          fontColor
          imageAttribution
          resultId
          revealResponse {
            description
            image {
              node {
                altText
                mediaDetails {
                  height
                  width
                }
                sourceUrl
              }
            }
            imageAttribution
            title
          }
        }
        backgroundColor
        backgroundImageSrc {
          node {
            sourceUrl
          }
        }
        fontColor
        imageAttribution
        question
        questionRelativeToImage
      }
      results {
        description
        imageAttribution
        resultId
        resultImageSrc {
          node {
            altText
            sourceUrl
            mediaDetails {
              height
              width
            }
          }
        }
        title
      }
      showCopyShareButton
    }
    slug
    title
    uri
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
