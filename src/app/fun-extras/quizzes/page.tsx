import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchAllQuizzes } from '@/services/graphql';
import '@/styles/quizzes.css';
import Image from 'next/image';
// import { WPQuiz } from '@/types';

async function fetchQuizzes() {
  const quizzes = await fetchAllQuizzes();

  if (!quizzes) {
    return { error: 'No quizzes found' };
  }

  return { quizzes };
}

export default async function QuizzesPage() {
  const data = await fetchQuizzes();

  if (data.error) {
    return notFound();
  }

  if (data.quizzes) {
    return (
      <main id="quizzes-page">
        <div className="quiz-container">
          <div className="quiz-header">
            <div className="about-section">
              <h1>Quizzes</h1>

              {data.quizzes.nodes.map((quiz: any) => {
                return (
                  <div key={quiz.key}>
                  {
                    quiz.featuredImage &&
                      <Image src={quiz.featuredImage.node.sourceUrl} alt={quiz.featuredImage.node.altText || ''}  width={quiz.featuredImage.node.mediaDetails.width} height={quiz.featuredImage.node.mediaDetails.height} />
                  }
                    <Link href={quiz.uri}>{quiz.title}</Link>
                    <p>{quiz.quizFields.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return notFound();
}
