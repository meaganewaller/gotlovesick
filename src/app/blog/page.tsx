import { Pagination } from "@/components/blog";
import { fetchAllPosts } from "@/services/graphql";
import { Post } from "@/types";
import { formatDateAsString } from "@/utils/helpers";
import '@/styles/blog.css';
import Link from "next/link";

type SearchParams = {
  page?: string | null;
}

type Props = {
  searchParams: SearchParams
}

const Page = async ({ searchParams }: Props) => {
  const perPage = 10;
  let page = searchParams.page ? parseInt(searchParams.page) : 1;
  let currentPage = page;
  let totalPages = 1;

  const response = await fetchAllPosts(page, perPage)

  if (response.posts?.pageInfo?.offsetPagination?.total) {
    totalPages = Math.ceil(response.posts.pageInfo.offsetPagination.total / perPage);
  }

  const posts = response.posts?.nodes;

  if (posts?.length === 0) {
    return (
      <div>
        <h1>No posts found</h1>
      </div>
    )
  }

  return (
    <main id="blog-page">
      <div className='layout'>
        <header className='header'>
          <section className='about-section'>
            <h1>Blog Posts (page {page})</h1>
          </section>
        </header>

        <section className="posts">
          {posts?.map((post: Post) => (
            <div key={post.key}>
              <h1>{post.title}</h1>
              <span>{formatDateAsString(post.date)}</span>
              <p>{post.postDetails?.description}</p>
              <Link href={`/blog/${post.slug}`}>Read more</Link>
            </div>
          ))}
        </section>

        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </main>
  )
}

export default Page;
