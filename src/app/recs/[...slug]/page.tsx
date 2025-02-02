import { fetchPage } from "@/services/graphql";
import Image from 'next/image'
import rainbows from '~/images/dividers/rainbows.gif';
import { notFound } from "next/navigation";
import { WPPage } from "@/types";
import "@/styles/pages/recs.css";

import { Breadcrumbs } from "@/components/Breadcrumbs";

async function fetchData(slug: string) {
  let page = undefined;

  page = await fetchPage(slug);

  if (page) {
    return { page: page };
  }

  return { error: "No data found" };
}

function RenderPage({ page }: { page: WPPage }) {
  return (
    <main id="recs-page" className={`${page.slug}`}>
      <div className="layout">
        <section className="main-content">
          {page.seo?.breadcrumbs && <Breadcrumbs breadcrumbs={page.seo?.breadcrumbs} />}
          <header className="header">
            <div className="about-section">
              <h1 dangerouslySetInnerHTML={{ __html: page.title }} />
            </div>
            <div className="divider">
              <Image src={rainbows} alt="" className='divider' />
            </div>
          </header>

          <article className="content">
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          </article>
        </section>
      </div>
    </main>
  );
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

    if (data.page) {
      return <RenderPage page={data.page} />;
    }

    return notFound();
  }

  if (length > 1) {
    const withoutFirst = slug.slice(1);
    const data = await fetchData(withoutFirst.join('/'));

    if (data.error) {
      return notFound();
    }

    if (data.page) {
      return <RenderPage page={data.page} />;
    }

    return notFound;
  }

  return notFound();
}


