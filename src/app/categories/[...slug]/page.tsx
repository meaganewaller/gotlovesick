import { Post } from '@/types'
import { fetchPostsByCategory } from '@/services/graphql'
import { notFound } from 'next/navigation'
import { formatDateAsString } from '@/utils/helpers'
import '@/styles/blog.css'
import Link from 'next/link'
import { Pagination } from '@/components/categories'

type SearchParams = {
  page?: string | null;
}

type Params = {
  slug: string[];
}

type Props = {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}

const Page = async ({ params, searchParams }: Props) => {
  const perPage = 9;
  let paramsData = await params;
  let searchParamsData = await searchParams;
  let page = searchParamsData.page ? parseInt(searchParamsData.page) : 1;
  let currentPage = page;
  let totalPages = 1;

  let slug = paramsData.slug;
  let length = slug.length;

  if (length < 1) {
    return notFound();
  }

  const categorySlug = slug

  if (length === 1) {
    const data = await fetchPostsByCategory(categorySlug[0], page, perPage);

    if (data.posts?.pageInfo?.offsetPagination?.total) {
      totalPages = Math.ceil(data.posts.pageInfo.offsetPagination.total / perPage);
    }

    const posts = data.posts?.nodes;

    if (posts?.length === 0) {
      return (
        <div>
          <h1>No posts found</h1>
        </div>
      )
    } else {

      return (
        <main id="blog-page">
          <div className='layout'>
            <header className='header'>
              <section className='about-section'>
                <h1>{slug} (page {page})</h1>
              </section>
            </header>

            <section className="posts">
              {posts?.map((post: Post) => (
                <div key={post.slug} className='pixel-border card'>
                  <h1>{post.title}</h1>
                  <span>{formatDateAsString(post.date)}</span>
                  <p>{post.postDetails?.description}</p>
                  <Link href={`/blog/${post.slug}`}>Read more</Link>
                </div>
              ))}
            </section>

            <Pagination currentPage={currentPage} totalPages={totalPages} slug={slug[0]} />
          </div>
        </main>
      )
    }
  }
}

export default Page;
