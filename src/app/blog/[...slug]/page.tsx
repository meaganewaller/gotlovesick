import { notFound } from 'next/navigation'
import '@/styles/blog.css'
import { BlogPost } from '@/components/blog/BlogPost';

export default async function Archive(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params;
  const { slug } = params;

  if (slug.length !== 1) {
    return notFound();
  }

  return (
    <main id="blog-post-page">
      <BlogPost slug={slug[0]} />
    </main>
  )
}

// async function fetchData(slug: string) {
//   let post = undefined;

//   post = await fetchPost(slug);

//   if (post) {
//     return { post };
//   }

//   return { error: 'No post found' };
// }

// function RenderPage({ post }: { post: any }) {
//   return (
//     <main id="blog-page">
//       <div className="blog-layout">
//         <section className="" id="page-content">
//           {post.seo?.breadcrumbs && (
//             <Breadcrumbs breadcrumbs={post.seo?.breadcrumbs} />
//           )}

//           <main id="post">
//             <section>
//               <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
//               <BlogPost slug={post} />
//             </section>
//           </main>
//         </section>
//       </div>
//     </main>
//   );
// }

// export default async function Archive(props: {
//   params: Promise<{ slug: string[] }>;
// }) {
//   const params = await props.params;
//   const { slug } = params;

//   const length = slug.length;

//   if (length < 1) {
//     return notFound();
//   }

//   if (length === 1) {
//     const data = await fetchData(slug[0]);

//     if (data.error) {
//       return notFound();
//     }

//     if (data.post) {
//       return <RenderPage post={data.post} />;
//     }

//     return notFound();
//   }

//   if (length > 1) {
//     const withoutFirst = slug.slice(1);
//     const data = await fetchData(withoutFirst.join('/'));

//     if (data.error) {
//       return notFound();
//     }

//     if (data.post) {
//       return <RenderPage post={data.post} />;
//     }

//     return notFound;
//   }

//   return notFound();
// }
