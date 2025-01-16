import { fetchQuiz } from '@/services/graphql';
import { notFound } from 'next/navigation';

import { WPQuiz } from '@/types';
import '@/styles/quizzes.css';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BuzzFeedQuiz } from 'react-buzzfeed-quiz';

async function fetchData(slug: string) {
  let quiz = undefined;

  quiz = await fetchQuiz(slug);

  if (quiz) {
    return { quiz };
  }

  return { error: 'No quiz found' };
}

function RenderPage({ quiz }: { quiz: WPQuiz }) {
  return (
    <main id="quiz-page">
      <div className="quiz-layout">
        <section className="" id="page-content">
          {quiz.seo?.breadcrumbs && (
            <Breadcrumbs breadcrumbs={quiz.seo?.breadcrumbs} />
          )}

          <main id="quiz">
            <section>
              <h1 dangerouslySetInnerHTML={{ __html: quiz.title }} />
            </section>
          </main>
        </section>
      </div>
    </main>
  );
}
