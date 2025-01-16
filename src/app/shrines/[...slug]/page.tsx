import { fetchShrine } from '@/services/graphql';
import { notFound } from 'next/navigation';
import { WPShrine } from '@/types';
import "@/styles/shrine.css";
import { ShrineNav } from '@/components/shrines';
import { Breadcrumbs } from '@/components/Breadcrumbs';

async function fetchData(slug: string) {
  let shrine = undefined;

  shrine = await fetchShrine(slug);

  if (shrine) {
    return { shrine: shrine };
  }

  return { error: 'No data found' };
}

function RenderPage({ shrine }: { shrine: WPShrine }) {
  return (
    <main id="shrine-page" className={`${shrine.slug}`}>
      <ShrineNav shrine={shrine} />
      <div className="shrine-layout">
        <section className="" id="page-content">
          {shrine.seo?.breadcrumbs && <Breadcrumbs breadcrumbs={shrine.seo?.breadcrumbs} />}

          <main id="shrine">
            <section>
              <h1 dangerouslySetInnerHTML={{ __html: shrine.title }} />
            </section>

            {shrine.shrineDetails?.featuredSections?.map((section) => (
              <section key={section.title} className="featured-section">
                <h2>{section.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </section>
            ))}
          </main>
        </section>
      </div>
    </main>
  );
}

function getPathFromUrl(url: string) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.pathname;
  } catch (e) {
    console.error('Invalid URL:', url);
    return url;
  }
}

export default async function Archive(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const { slug } = params;

  const length = slug.length;

  if (length < 1) {
    return notFound();
  }

  if (length === 1) {
    const data = await fetchData(slug[0]);

    if (data.error) {
      return notFound();
    }

    if (data.shrine) {
      return <RenderPage shrine={data.shrine} />;
    }

    return notFound();
  }

  if (length > 1) {
    const withoutFirst = slug.slice(1);
    const data = await fetchData(withoutFirst.join('/'));

    if (data.error) {
      return notFound();
    }

    if (data.shrine) {
      return <RenderPage shrine={data.shrine} />;
    }

    return notFound;
  }

  return notFound();
}
