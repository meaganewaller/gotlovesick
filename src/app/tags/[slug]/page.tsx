// import config from '@/lib/config'
// import { getTagBySlug } from '@/lib/queries/Tags'
import Link from 'next/link';

/**
 * Generate the metadata for each static route at build time.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
// export async function generateMetadata({
//   params
// }: {
//   params: { slug: string }
// }): Promise<Metadata | null> {
//   const { slug } = params
//
//   return {
//     title: `${slug} Archives - ${config.siteName}`,
//     description: `The tag archive for ${slug}`
//   }
// }

/**
 * The tag archive route.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */
export default async function TagArchive() {
  // Fetch posts from WordPress.
  // const tagPage = await getTagBySlug(params.slug)
  //
  // if (!tagPage) {
  //   notFound()
  // }

  return (
    <>
      <main className="block flex-grow flex-shrink-0 leading-6 text-left text-ivory basis-auto">
        <div className="mt-2 mb-16 md:mb-24 lg:mb-32">
          <div className="relative px-6 mx-auto w-full lg:px-12">
            {/* TODO: Breadcrumbs: Extract this out and make dynamic */}
            <div className="mb-8 text-xs leading-5 text-left break-words z-[2]">
              <span className="text-xs leading-5 text-left text-ivory break-words bg-vibrant-green p-2 rounded-lg">
                <span className="text-xs leading-5 text-left text-ivory break-words">
                  <Link
                    href="/"
                    className="text-xs leading-5 text-left text-ivory break-words bg-transparent cursor-pointer"
                  >
                    Home
                  </Link>
                </span>
                <span className="breadcrumb-separator" />
                <span className="text-xs leading-5 text-left text-ivory break-words">
                  <Link
                    href="/tags"
                    className="text-xs leading-5 text-left text-ivory break-words bg-transparent cursor-pointer"
                  >
                    All Tags
                  </Link>
                </span>

                <span className="breadcrumb-separator" />
                {/* <span className="text-xs text-left break-words leading-5 text-vanilla">{tagPage.name}</span> */}
              </span>
            </div>
            <div className="pb-12 mb-12 border-b border-solid border-ivory">
              <div className="mb-5 leading-6 text-left text-primary-txt">
                <div className="overflow-hidden w-24 leading-6 text-left rounded-2xl">
                  {/* <Image className='object-cover w-full max-w-full h-full max-h-full leading-6 text-left text-white align-middle border-none' src={tagPage.collectionFields.icon.node.sourceUrl} alt="" width={tagPage.collectionFields.icon.node.mediaDetails.width} height={tagPage.collectionFields.icon.node.mediaDetails.height} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
