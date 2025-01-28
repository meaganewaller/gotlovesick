import { Pagination } from "@/components/blog";
import { fetchAllPosts } from "@/services/graphql";
import { Post } from "@/types";
import { HiOutlineChat, HiOutlineCalendar } from "react-icons/hi";
import { formatDateAsString } from "@/utils/helpers";
import '@/styles/blog.css';
import Link from "next/link";
import Image from "next/image";

type SearchParams = {
  page?: string | null;
}

type Props = {
  searchParams: Promise<SearchParams>
}

const Page = async ({ searchParams }: Props) => {
  const perPage = 9;
  let params = await searchParams;
  let page = params.page ? parseInt(params.page) : 1;
  let currentPage = page;
  let totalPages = 1;

  const response = await fetchAllPosts(page, perPage)

  if (response.posts?.pageInfo?.offsetPagination?.total) {
    totalPages = Math.ceil(response.posts.pageInfo.offsetPagination.total / perPage);
  }

  const posts = response.posts?.nodes;

  if (posts && posts?.length === 0) {
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
          {posts.map((post: Post) => (
            <div key={post.key} className='card'>
              {post.postDetails?.headerImage && (
                <figure className="card__image-wrapper">
                  <Image src={post.postDetails.headerImage.node.sourceUrl} alt={post.postDetails.headerImage.node.altText || ''} width={post.postDetails.headerImage.node.mediaDetails.width} height={post.postDetails.headerImage.node.mediaDetails.height} className="card__image" />
                </figure>
              )}
              <div className="card__intro">
                <Link href={`/blog/${post.slug}`} className="card__heading">{post.title}</Link>
                {post.postDetails?.description && <div dangerouslySetInnerHTML={{ __html: post.postDetails.description }} className="card__description"/>}
              </div>

              <div className="card__footer">
                <div className="card__comments">
                  <p className="card__text"><HiOutlineChat className="meta__image" size={18} />4</p>
                </div>

                <div className="card__calendar">
                  <p className="card__text"><HiOutlineCalendar className="meta__image" size={18} />{formatDateAsString(post.date)}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </main>
  )
}

export default Page;
