import Image from 'next/image';
import rainbows from '~/images/dividers/rainbows.gif';
import { fetchRecommendationsByType } from '@/services/graphql';
import { notFound } from 'next/navigation';
import { WPPage } from '@/types';
import '@/styles/pages/recs.css';
import Link from 'next/link';

import { Breadcrumbs } from '@/components/Breadcrumbs';

type SearchParams = {
  page?: string | null;
};

type Params = {
  recType: string;
};

type Props = {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
};

const Page = async ({ params, searchParams }: Props) => {
  const perPage = 9;
  let paramsData = await params;
  let searchParamsData = await searchParams;
  let page = searchParamsData.page ? parseInt(searchParamsData.page) : 1;
  let currentPage = page;
  let totalPages = 1;

  let typeSlug = paramsData.recType;

  const data = await fetchRecommendationsByType(typeSlug, page, perPage);

  if (data.recommendations?.pageInfo?.offsetPagination?.total) {
    totalPages = Math.ceil(
      data.recommendations.pageInfo.offsetPagination.total / perPage
    );
  }

  const recommendations = data.recommendations?.nodes;

  if (recommendations?.length === 0) {
    return (
      <div>
        <h1>No recommendations found</h1>
      </div>
    );
  } else {
    return (
      <main id="recs-page">
        <div className="layout">
          <header className="header">
            <section className="about-section">
              <h1>
                recs - {typeSlug} (page {page})
              </h1>
            </section>
          </header>

          <section className="recs">
            {recommendations?.map((rec: any) => (
              <div key={rec.id} className="card">
                <div className="card__intro">
                  <Link
                    href={`/recs/${typeSlug}/${rec.slug}`}
                    className="card__heading"
                  >
                    {rec.title}
                  </Link>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    );
  }
};

export default Page;
