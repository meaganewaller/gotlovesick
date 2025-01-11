import { GraphQLNodes, Nullable, WPWebDirectoryCategory, GraphQLEdgesInput } from "@/types";
import { fetchGraphQL, getGraphQLUrl } from "@/utils/helpers";

export type WebDirectoryCategoriesResponse = {
  webDirectoryCategories: Nullable<GraphQLNodes<WPWebDirectoryCategory>>
}

const webDirectoryCategoriesQuery = `query WebDirectoryCategories($first: Int) {
  webDirectoryCategories: allWebDirectoryCategory(where: {hideEmpty: true}, first: $first) {
    nodes {
      key: id
      title: name
      slug
      description
      count
      webDirectoryEntries {
        nodes {
          key: id
          title
          uri
        }
      }
    }
  }
}`

export type FetchWebDirectoryCategoriesInput = Pick<GraphQLEdgesInput, 'first'>;

/**
 * Retrieve the web directory categories list that have children.
 *
 * @param {FetchWebDirectoryCategoriesInput} input - The input to retrieve web directory categories.
 * @returns {Promise<WPWebDirectoryCategory[]>} An array of web directory categories.
 */
export const fetchWebDirectoryCategories = async ({
  ...vars
}: FetchWebDirectoryCategoriesInput): Promise<WPWebDirectoryCategory[]> => {
  const response = await fetchGraphQL<WebDirectoryCategoriesResponse>({
    query: webDirectoryCategoriesQuery,
    url: getGraphQLUrl(),
    variables: vars,
  });

  return response?.webDirectoryCategories?.nodes ?? [];
}
