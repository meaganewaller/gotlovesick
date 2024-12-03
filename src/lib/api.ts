import { isEmpty } from 'lodash'
const API_URL = `${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`;

export async function fetchAPI(query = "", { variables }: Record<string, any> = {}, authToken = "") {
  const headers: HeadersInit = { "Content-Type": "application/json" };

  // if has authToken it will add the token to the post header, and use it to get post previews
  if (!isEmpty(authToken)) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  // WPGraphQL Plugin must be enabled
  const res = await fetch(API_URL, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data
}
