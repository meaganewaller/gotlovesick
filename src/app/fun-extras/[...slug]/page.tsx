import { fetchQuiz } from '@/services/graphql';
import { notFound } from 'next/navigation';
import { WPQuiz } from '@/types';
import '@/styles/quizzes.css';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Quiz } from '@/components/Quiz';

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
              <Quiz quiz={quiz} />
            </section>
          </main>
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

    if (data.quiz) {
      return <RenderPage quiz={data.quiz} />;
    }

    return notFound();
  }

  if (length > 1) {
    const withoutFirst = slug.slice(1);
    const data = await fetchData(withoutFirst.join('/'));

    if (data.error) {
      return notFound();
    }

    if (data.quiz) {
      return <RenderPage quiz={data.quiz} />;
    }

    return notFound;
  }

  return notFound();
}
