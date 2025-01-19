import { fetchPage } from '@/services/graphql';
import { notFound } from 'next/navigation';
import { WPPage } from '@/types';

async function fetchData(slug: string[]) {
  let page = undefined;

  if (slug.length === 1) {
    page = await fetchPage(slug[0]);
  }

  if (page) {
    return { page: page };
  }

  return { error: 'No data found' };
}

function RenderPage({ page }: { page: WPPage }) {
  return (
    <main id="content">
      <section className="" id="page-content">
        <h1 dangerouslySetInnerHTML={{ __html: page.title }} />
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </section>
    </main>
  );
}

export default async function Archive(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const { slug } = params;

  const data = await fetchData(slug);

  if (data.error) {
    return notFound();
  }

  if (data.page) {
    return <RenderPage page={data.page} />;
  }

  return notFound();
}
