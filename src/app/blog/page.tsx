import { fetchAllPosts } from "@/services/graphql";
import { Post } from "@/types";

interface Props {
  posts: Post[]
}

export default function BlogIndex({ posts }: Props) {
  return (
    <main id="blog-page">
      <div className='layout'>
        <header className="header">
          <section className="about">
            <h1>Blog Page 1</h1>
            <p>Discover the latest posts and updates.</p>
          </section>
        </header>

        {/* Render the Grid component */}
        {/* <Grid initialItems={posts} columnGutter={10} columnWidth={325} /> */}

        {/* Render the Pagination component */}
        {/* <Pagination currentPage={currentPage} totalPages={totalPages} /> */}
      </div>
    </main>
  )
}
// import { notFound } from 'next/navigation';
// import { fetchAllPosts } from '@/services/graphql';
// import '@/styles/blog.css';
// import { Grid, Pagination } from '@/components/blog';

// type BlogIndexPageProps = {
//   searchParams?: {
//     page?: string;
//   }
// };

// export default async function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
//   const perPage = 10;
//   const currentPage = parseInt(searchParams?.page || '1', 10);

//   const response = await fetchAllPosts(currentPage, perPage);

//   if (!response || !response.posts || response.posts.nodes.length === 0) {
//     return notFound();
//   }

//   const posts = response.posts.nodes;
//   const totalPosts = response.posts.pageInfo.offsetPagination.total;
//   const totalPages = Math.ceil(totalPosts / perPage);

//   return (
//     <main id="blog-page">
//       <div className='layout'>
//         <header className="header">
//           <section className="about">
//             <h1>Blog Page {currentPage}</h1>
//             <p>Discover the latest posts and updates.</p>
//           </section>
//         </header>

//         {/* Render the Grid component */}
//         <Grid initialItems={posts} columnGutter={10} columnWidth={325} />

//         {/* Render the Pagination component */}
//         <Pagination currentPage={currentPage} totalPages={totalPages} />
//       </div>
//     </main>
//   )
// }

// // export default async function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
// //   const params = await searchParams;

// //   const postsPerPage = 10;
// //   const currentPage = parseInt(params.page || '1', 10);

// //   const initialData = await fetchAllPosts(currentPage, postsPerPage);

// //   if (!initialData || initialData.data.posts.edges.length === 0) {
// //     return notFound();
// //   }

// //   const { pageInfo, edges } = initialData.data.posts;

// //   if (!pageInfo || !edges) {
// //     return notFound();
// //   }

// //   console.log('Page Info:', pageInfo);
// //   console.log('Edges:', edges);

// //   const totalPosts = pageInfo.offsetPagination.total;
// //   const totalPages = Math.ceil(totalPosts / postsPerPage);

// //   return (
// //     <main id="blog-page">
// //       <div className="layout">
// //         <header className="header">
// //           <section className="about">
// //             <h1>Blog</h1>
// //             <p>Some blog description will live here.</p>
// //           </section>
// //         </header>

// //         <Grid initialItems={edges} columnGutter={10} columnWidth={325} />
// //         <Pagination currentPage={currentPage} totalPages={totalPages} />
// //       </div>
// //     </main>
// //   );
// // }
