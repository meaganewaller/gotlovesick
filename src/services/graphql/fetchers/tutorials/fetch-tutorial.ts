import { Tutorial } from '@/types';
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers';

export type TutorialResponse = {
  tutorial: Tutorial;
};

const tutorialQuery = `query Tutorial($slug: ID!) {
  tutorial(id: $slug, idType: URI) {
    content(format: RENDERED)
    databaseId
    excerpt(format: RENDERED)
    id
    slug
    title
    seo {
      title
      metaDesc
      breadcrumbs {
        text
        url
      }
    }
    tutorialFields {
      description
    }
    skillLevels {
      nodes {
        name
        id
        databaseId
      }
    }
    tutorialTypes {
      nodes {
        name
        id
        databaseId
      }
    }
    date
    featuredImage {
      node {
        altText
        caption
        mediaDetails {
          height
          width
        }
        sourceUrl
      }
    }
  }
}`;

export const fetchTutorial = async (slug: string) => {
  const response = await fetchGraphQL<TutorialResponse>({
    query: tutorialQuery,
    url: getGraphQLUrl(),
    variables: { slug },
  });

  if (!response.tutorial)
    return Promise.reject(
      new Error(`No tutorial found for the following slug ${slug}.`)
    );

  return response.tutorial;
};
