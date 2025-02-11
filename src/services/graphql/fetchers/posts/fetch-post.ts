import type { Post } from '@/types/blog';
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers';

export type PostResponse = {
  post: Post;
};

const postQuery = `query Post($slug: ID!) {
  post(id: $slug, idType: URI) {
    key: id
    databaseId
    title
    slug
    content(format: RENDERED)
    author {
      node {
        name
        uri
        website: url
        key: id
        avatar {
          url
          width
          height
        }
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
    commentCount
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
    categories {
      nodes {
        key: id
        name
        slug
        uri
      }
    }
    tags {
      nodes {
        key: id
        name
        link
        slug
      }
    }
    comments(first: 30, where: { order: ASC}) {
      nodes {
        id
        databaseId
        parentId
        parentDatabaseId
        status
        content(format: RENDERED)
        date
        author {
          name
          url
          node {
            avatar {
              url
              width
              height
            }
          }
        }
      }
    }
  }
}`;

export const fetchPost = async (slug: string) => {
  const response = await fetchGraphQL<PostResponse>({
    query: postQuery,
    url: getGraphQLUrl(),
    variables: { slug },
  });

  if (!response.post)
    return Promise.reject(
      new Error(`No post found for the following slug ${slug}.`)
    );

  return response.post;
};
