import { headers } from 'next/headers';

/**
 * Not Found component.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/not-found
 */
export default async function NotFound() {
  const headersList = await headers();
  const referer = headersList.get('referer');

  return (
    <main className="not-found">
      <h1 className="text-center">404 - Not Found</h1>
      <p className="text-center text-red-500">{referer}</p>
    </main>
  );
}
