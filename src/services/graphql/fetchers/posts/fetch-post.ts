import type { Nullable, WPPost } from '@/types';
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers';

export type PostResponse = {
  post: Nullable<any>;
};

const postQuery = `query Post($slug: ID!) {
  post(id: $slug, idType: URI) {
    key: id
    title
    slug
    content
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
        content
        key: id
        date
        status
        author {
          node {
            avatar {
              url
            }
            email
            name
            url
          }
        }
      }
    }
  }
}`;

/**
 * Retrieve a WordPress post by slug.
 *
 * @param {string} slug - The post slug.
 * @returns {Promise<WPPost>} The requested post.
 */
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
