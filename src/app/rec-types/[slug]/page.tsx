import '@/styles/pages/recs.css';
import { fetchRecommendationsByType } from '@/services/graphql';
import Link from 'next/link';

type SearchParams = {
  page?: string | null;
};

type Params = {
  slug: string;
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

  let slug = paramsData.slug;

  const data = await fetchRecommendationsByType(slug, page, perPage);

  if (data.recommendations?.pageInfo?.offsetPagination?.total) {
    totalPages = Math.ceil(
      data.recommendations.pageInfo.offsetPagination.total / perPage
    );
  }

  const recs = data.recommendations?.nodes;

  return (
    <main id="recs-page">
      <div className="layout">
        <header className="header">
          <section className="about-section">
            <h1>
              {slug} (page {page})
            </h1>
          </section>
        </header>

        <section className="recs">
          {recs?.map((rec) => (
            <div key={rec.id} className="card">
              <div className="card__intro">
                <Link href={`/recs/${rec.slug}`} className="card__heading">
                  {rec.title}
                </Link>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Page;
