import React from 'react';
import { Metadata } from 'next';
import {
  fetchAllTutorials,
  fetchAllTutorialTypes,
  fetchAllSkillLevels,
} from '@/services/graphql';
import {
  TutorialFilters,
  Pagination,
  TutorialList,
} from '@/components/tutorials';
import '@/styles/pages/tutorials.css';

export const metadata: Metadata = {
  title: 'Tutorials',
  description: 'Graphic design, software dev, web dev tutorials, and more!',
};

type SearchParams = {
  page?: string | null;
  skillLevel?: string | null;
  tutorialType?: string | null;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

const Page = async ({ searchParams }: Props) => {
  const perPage = 9;
  const params = await searchParams;
  let page = params.page ? parseInt(params.page) : 1;
  let currentPage = page;
  let totalPages = 1;

  let skillLevel = params.skillLevel ? params.skillLevel : undefined;
  let tutorialType = params.tutorialType ? params.tutorialType : undefined;

  const tutorialTypeFilterData = await fetchAllTutorialTypes();
  const tutorialSkillLevelData = await fetchAllSkillLevels();

  const response = await fetchAllTutorials({
    page,
    perPage,
    tutorialType: tutorialType,
    skillLevel: skillLevel,
  });

  if (
    response.tutorials.pageInfo &&
    response.tutorials.pageInfo?.offsetPagination?.total
  ) {
    totalPages = Math.ceil(
      response.tutorials.pageInfo.offsetPagination.total / perPage
    );
  }

  return (
    <main id="tutorials-page">
      <div className="layout">
        <header className="tutorials-header">
          <h1>Tutorials (page {page})</h1>
        </header>

        <TutorialFilters
          skillLevels={tutorialSkillLevelData.skillLevels.nodes}
          tutorialTypes={tutorialTypeFilterData.tutorialTypes.nodes}
          currentFilters={{
            skillLevel: skillLevel || null,
            tutorialType: tutorialType || null,
          }}
        />

        <section className="tutorials">
          {response.tutorials.nodes && response.tutorials.nodes.length > 0 ? (
            <TutorialList items={response.tutorials.nodes} />
          ) : (
            <h1>No tutorials found</h1>
          )}
        </section>

        <section className="tutorial-pagination">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </section>
      </div>
    </main>
  );
};

export default Page;
