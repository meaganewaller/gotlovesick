import type { Nullable, Category } from '@/types';
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers';

type CategoryResponse = {
  category: Nullable<Category>;
};

const categoryQuery = `query Category($slug: ID!, $size: Int!, $offset: Int!) {
  category(id: $slug, idType: SLUG) {
    key: id
    description
    slug
    name
    seo {
      breadcrumbs {
        text
        url
      }
      metaDesc
      title
    }
    posts(where: { offsetPagination: { size: $size, offset: $offset }, orderby: { field: DATE, order: DESC }}) {
      nodes {
        key: id
        slug
        title
        date
        postDetails {
          description
        }
      }
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
  }
}`;

export const fetchCategory = async (
  slug: string,
  page: number,
  perPage: number
) => {
  const response = await fetchGraphQL<CategoryResponse>({
    query: categoryQuery,
    url: getGraphQLUrl(),
    variables: { slug, offset: (page - 1) * perPage, size: perPage },
  });

  if (response.category) {
    return { category: response.category };
  }

  return { error: true };
};
