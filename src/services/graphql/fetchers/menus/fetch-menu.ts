import type { Nullable, WPMenu, MenuLocationEnum } from '@/types';
import { fetchGraphQL, getGraphQLUrl } from '@/utils/helpers';

export type MenuResponse = {
  menu: Nullable<WPMenu>;
};

const menuQuery = `query Menu($location: MenuLocationEnum) {
  menu: menuItems(where: {location: $location}, first: 100)  {
    nodes {
      key: id
      title: label
      order
      path
      parentId
      url
    }
  }
}`;

/**
 * Retrieve a WordPress menu by location.
 *
 * @param {MenuLocationEnum} location - The menu location.
 * @returns {Promise<WPMenu>} The requested menu
 */
export const fetchMenu = async (
  location: MenuLocationEnum
): Promise<WPMenu> => {
  const response = await fetchGraphQL<MenuResponse>({
    query: menuQuery,
    url: getGraphQLUrl(),
    variables: { location },
  });

  if (!response.menu)
    return Promise.reject(
      new Error(`No menu found for the following location ${location}.`)
    );

  return response.menu;
};
